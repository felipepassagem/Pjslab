import uuid
from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from djmoney.models.fields import MoneyField
from django.db.models import Deferrable, UniqueConstraint

# Create your models here.
class Dentist(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  dentistName = models.CharField(max_length=100, blank=True, null=True )
  dentistPhone = PhoneNumberField(null=True, blank=True)
  dentistEmail = models.EmailField(null=True, blank=True)
  dentistDescription = models.TextField(null=True, blank=True)
  dentistAddress = models.CharField(max_length=150, blank=True, null=True)
  dentistCity = models.CharField(max_length=50, null=True, blank=True)
  #id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  UniqueConstraint(fields=['user', 'dentistName', 'dentistEmail'], name='unique-dentist')
  

  def __str__(self):
    return self.dentistName

class Job(models.Model):
  user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
  dentist = models.ForeignKey(Dentist,null=True, on_delete=models.SET_NULL)
  patient = models.CharField(max_length=150, null=True, blank=True)
  jobType = models.CharField(max_length=50, null=True, blank=True)
  description = models.TextField(blank=True, null=True)
  price = MoneyField(max_digits=14, decimal_places=2, default_currency='BRL')
  entryDate = models.DateField(auto_now_add=True)
  due = models.DateField(auto_now=False, blank=True, null=True)
  finishedAt = models.DateField(auto_now=False, blank=True, null=True)
  isFinished = models.BooleanField(default=False)
  isPayed = models.BooleanField(default=False)
  #id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  

  def __str__(self):
    return str(self.dentist)

class Product(models.Model):
  user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
  product = models.CharField(max_length=50, null=True, blank=True)
  buyDate = models.DateField(auto_now=False, blank=True, null=True)
  quantity = models.PositiveIntegerField(default=1, null=True, blank=True)
  price = MoneyField(max_digits=14, decimal_places=2, default_currency='BRL')

  def __str__(self):
    return str(self.product)
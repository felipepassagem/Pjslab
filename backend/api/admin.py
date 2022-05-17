from django.contrib import admin
from .models import Dentist, Job, Product
# Register your models here.

@admin.register(Dentist)
class dentistModel(admin.ModelAdmin):
  list_display = ('dentistName',)
  list_filter = ('dentistName',)

  def __str__(self):
    return self.dentistName

@admin.register(Job)
class jobModel(admin.ModelAdmin):
  list_display = ('user', 'id', 'jobType',)
  list_filter = ('dentist', 'jobType',)

@admin.register(Product)
class jobModel(admin.ModelAdmin):
  list_display = ('user', 'id', 'product',"buyDate")
  list_filter = ('product', 'buyDate',)

# Create your views here.
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import Dentist, Job, Product
from .serializers import DentistSerializer, JobSerializer, ProductSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import authentication, permissions, generics
from django.contrib.auth import authenticate
from django.db.models.functions import Lower



class DentistViewSet(viewsets.ModelViewSet):
  def get_queryset(self):
    user = self.request.user
    queryset = Dentist.objects.all().filter(user=user).order_by(Lower('dentistName'))
    return queryset
  if IsAuthenticated:
        # Autofill FK Client.
    serializer_class = DentistSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
  def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class JobViewSet(viewsets.ModelViewSet):
  def get_queryset(self):
      user = self.request.user
      queryset = Job.objects.all().filter(user=user).order_by('-entryDate')
      return queryset
  if IsAuthenticated:
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
  def perform_create(self, serializer):
      dentist = get_object_or_404(Dentist, dentistName=self.request.data.get('dentist'), user=self.request.user)
      serializer.save(user=self.request.user, dentist=dentist)

  def perform_update(self, serializer):
      dentist = get_object_or_404(Dentist, dentistName=self.request.data.get('dentist'), user=self.request.user)
      serializer.save(user=self.request.user, dentist=dentist)

class UserViewSet(viewsets.ModelViewSet):
  if IsAuthenticated:
    authentication_classes = (TokenAuthentication,)
    serializer_class = UserSerializer
  def get_queryset(self):
    user = self.request.user
    ano = self.request.user.is_anonymous
    queryset = User.objects.all().filter(id=user.id)
    if ano == True:
      queryset = User.objects.all()
    return queryset
  #def put(self, serializer):
   # user = self.request.user
   # new_data = User.objects.update(username=self.request.data.get('username'), email=self.request.data.get('email'), password=self.request.data.get('password'))
   # serializer.save(user=new_data)

class ProductViewSet(viewsets.ModelViewSet):
  def get_queryset(self):
    user = self.request.user
    queryset = Product.objects.all().filter(user=user).order_by('-buyDate')
    return queryset
  if IsAuthenticated:
        # Autofill FK Client.
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
  def perform_create(self, serializer):
        serializer.save(user=self.request.user)




      


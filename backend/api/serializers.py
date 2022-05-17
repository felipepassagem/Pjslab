from rest_framework import serializers
from .models import Dentist, Job, Product
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from django.shortcuts import get_object_or_404

class DentistSerializer(serializers.ModelSerializer):
  class Meta:
    model = Dentist
    fields = [ 'dentistName','dentistPhone','dentistEmail','dentistDescription','dentistAddress','dentistCity', 'id']


class JobSerializer(serializers.ModelSerializer):
  dentist = serializers.SlugRelatedField(slug_field='dentistName', read_only=True)
  class Meta:
    model = Job
    fields = ['dentist', 'patient', 'jobType', 'description', 'price', 'entryDate', 'due', 'finishedAt', 'isFinished', 'isPayed', 'id']

class ProductSerializer(serializers.ModelSerializer):
  #product = serializers.SlugRelatedField(slug_field='product', read_only=True)
  class Meta:
    model = Product
    fields = ['product', 'buyDate', 'quantity', 'price', 'id']


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'password', 'email']
    extra_kwargs = {'password':{
      #'write_only': True,
      'required': True
    }
    }
  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    Token.objects.create(user=user)
    return user


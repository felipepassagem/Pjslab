from django import views
from django.urls import path, include
#from .views import 
from rest_framework.routers import DefaultRouter


from .views import DentistViewSet, JobViewSet, ProductViewSet, UserViewSet


router = DefaultRouter()
router.register('dentists', DentistViewSet, basename='dentists')
router.register('jobs', JobViewSet, basename='jobs')
router.register('products', ProductViewSet, basename='products')
router.register('users', UserViewSet, basename='users')


urlpatterns = [
  
  path('api/', include(router.urls)),

]
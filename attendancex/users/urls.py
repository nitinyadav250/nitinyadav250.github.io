
from django.contrib import admin
from django.urls import path
from users.views import UserRegistration, UserLogin

urlpatterns = [
    path("login/", UserLogin.as_view(), name='login'),
    path("register/", UserRegistration.as_view(), name='register')
]

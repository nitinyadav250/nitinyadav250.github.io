
from django.contrib import admin
from django.urls import path, include
from users.urls import urlpatterns as users_urls
from classes.urls import urlpatterns as classes_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include(users_urls)),
    path("api/classes/", include(classes_urls)),

]

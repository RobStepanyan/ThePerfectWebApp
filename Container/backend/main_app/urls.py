from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from .views import RepoViewSet

urlpatterns = [
    path('repos/<str:username>', RepoViewSet.as_view({'get': 'retrieve'}))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
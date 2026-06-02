from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WeddingViewSet

router = DefaultRouter()
router.register(r'weddings', WeddingViewSet, basename='wedding')
urlpatterns = [
    path('', include(router.urls)),
]
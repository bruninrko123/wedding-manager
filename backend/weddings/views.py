

# Create your views here.
from rest_framework import viewsets
from .models import Wedding
from .serializers import WeddingSerializer

class WeddingViewSet(viewsets.ModelViewSet):
    queryset = Wedding.objects.all()
    serializer_class = WeddingSerializer
from rest_framework import serializers
from .models import Wedding

class WeddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wedding
        fields = [
            "id",
            "name",
            "date",
            "location",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
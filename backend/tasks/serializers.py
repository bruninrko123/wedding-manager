# this translates my database models into a format that can be easily sent over the network as JSON

from rest_framework import serializers
from .models import Category, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ["id", "created_at"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "wedding"
        ]
        read_only_fields = ["id"]
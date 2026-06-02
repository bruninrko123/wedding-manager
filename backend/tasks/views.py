# Create your views here.

from rest_framework.response import Response


from rest_framework import viewsets
from .models import Category, Task
from .serializers import CategorySerializer, TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


def get_wedding_tasks(request, wedding_id):
    tasks = Task.objects.filter(wedding_id=wedding_id)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)




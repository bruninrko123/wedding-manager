

# Create your models here.

from django.db import models
from django.contrib.auth.models import User

class Wedding(models.Model):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(User, related_name='weddings')
    date = models.DateField()
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
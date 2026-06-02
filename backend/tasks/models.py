# Create your models here.
import uuid

from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):

    id = models.UUIDField(primary_key=True,
                           default=uuid.uuid4, 
                           editable=False)
    # link to a wedding
    wedding = models.ForeignKey(
        "weddings.Wedding", on_delete=models.CASCADE, related_name="tasks"
    )

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_tasks",
    )
    status = models.CharField(max_length=50, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True, related_name="tasks")  

    # @property
    # def weddingId(self):
    #     return self.wedding.id
    
    # @property
    # def assignedTo(self):
    #     return self.assigned_to.id if self.assigned_to else None
    
    # @property
    # def createdAt(self):
    #     return self.created_at.isoformat()
    
    # @property
    # def updatedAt(self):
    #     return self.updated_at.isoformat()
    
  
    
    

    def __str__(self):
        return self.title



class Category(models.Model):
    id = models.UUIDField(primary_key=True,
                            default=uuid.uuid4, 
                            editable=False)
    name = models.CharField(max_length=50)
    wedding = models.ForeignKey("weddings.Wedding", on_delete=models.CASCADE, related_name="categories")

    def __str__(self):
        return self.name
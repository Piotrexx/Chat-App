from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class ChatRoom(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    private = models.BooleanField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
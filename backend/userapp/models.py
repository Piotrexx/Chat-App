from collections.abc import Iterable
from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

# Create your models here.


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    friends = ArrayField(models.IntegerField(null=True, blank=True), null=True, blank=True)



class FriendRequest(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver')
    status = models.CharField(max_length=10, choices=(('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')))


class ChatRoom(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    private = models.BooleanField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    friends_added = ArrayField(models.IntegerField(null=True, blank=True), null=True, blank=True)
    
    def __str__(self):
        return self.title
    


class Message(models.Model):
    content = models.CharField(max_length=300)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    date_created = models.DateTimeField(auto_now_add=True)
    chatroom = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, default=None)


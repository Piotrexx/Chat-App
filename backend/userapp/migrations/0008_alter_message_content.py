# Generated by Django 4.1.7 on 2023-07-10 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0007_rename_chatroom_message_chatroom'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='content',
            field=models.CharField(max_length=300),
        ),
    ]

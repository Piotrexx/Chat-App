# Generated by Django 4.1.7 on 2023-07-09 11:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0004_rename_author_chatroom_author'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatroom',
            old_name='Author',
            new_name='author',
        ),
    ]
# Generated by Django 4.1.7 on 2023-08-07 17:59

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0006_chatroom_friends_added'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatroom',
            name='friends_added',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, null=True), blank=True, null=True, size=None),
        ),
    ]

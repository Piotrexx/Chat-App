# Generated by Django 4.1.7 on 2023-07-30 10:39

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0003_alter_userprofile_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='friends',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='friends',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), default=None, size=None),
        ),
    ]

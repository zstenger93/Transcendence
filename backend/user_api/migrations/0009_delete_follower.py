# Generated by Django 5.0 on 2023-12-31 05:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0008_follower'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Follower',
        ),
    ]

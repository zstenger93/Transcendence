# Generated by Django 5.0 on 2023-12-29 08:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0005_friendrequest_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appuser',
            old_name='user_id',
            new_name='id',
        ),
    ]

# Generated by Django 5.0 on 2023-12-21 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_rename_picture_user_profile_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='title',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]

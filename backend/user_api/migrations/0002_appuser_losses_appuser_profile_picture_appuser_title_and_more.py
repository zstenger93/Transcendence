# Generated by Django 5.0 on 2023-12-27 04:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='losses',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='appuser',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pictures/'),
        ),
        migrations.AddField(
            model_name='appuser',
            name='title',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='appuser',
            name='total_matches',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='appuser',
            name='wins',
            field=models.PositiveIntegerField(default=0),
        ),
    ]

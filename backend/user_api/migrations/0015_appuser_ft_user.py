# Generated by Django 5.0 on 2024-02-14 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0014_appuser_aboutme_appuser_intra_level_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='ft_user',
            field=models.BooleanField(default=False),
        ),
    ]

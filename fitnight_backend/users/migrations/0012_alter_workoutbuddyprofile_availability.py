# Generated by Django 5.1.4 on 2025-01-22 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_alter_workoutbuddyprofile_workout_preferences'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workoutbuddyprofile',
            name='availability',
            field=models.JSONField(),
        ),
    ]

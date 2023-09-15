# Generated by Django 4.2 on 2023-04-24 18:38

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("classes", "0005_attendance_code"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="code",
            name="end_time",
        ),
        migrations.RemoveField(
            model_name="code",
            name="start_time",
        ),
        migrations.AlterField(
            model_name="code",
            name="date",
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]

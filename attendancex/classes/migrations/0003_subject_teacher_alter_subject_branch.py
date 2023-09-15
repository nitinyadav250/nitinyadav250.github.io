# Generated by Django 4.2 on 2023-04-24 12:28

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("classes", "0002_alter_subject_semester"),
    ]

    operations = [
        migrations.AddField(
            model_name="subject",
            name="teacher",
            field=models.CharField(default="", max_length=255),
        ),
        migrations.AlterField(
            model_name="subject",
            name="branch",
            field=models.CharField(
                choices=[
                    ("CSE", "CSE"),
                    ("ECE", "ECE"),
                    ("EEE", "EEE"),
                    ("ME", "ME"),
                    ("CE", "CE"),
                    ("IT", "IT"),
                    ("ECS", "ECS"),
                ],
                default="ECS",
                max_length=50,
            ),
        ),
    ]

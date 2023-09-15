from django.db import models
from users.models import User

# Create your models here.
Choices = (
    ('CSE', 'CSE'),
    ('ECE', 'ECE'),
    ('EEE', 'EEE'),
    ('ME', 'ME'),
    ('CE', 'CE'),
    ('IT', 'IT'),
    ('ECS', 'ECS'),
)

class Semester(models.Model):
    name = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name

class Subject(models.Model):
    name = models.CharField(max_length=50)
    semester = models.CharField(max_length=5)
    branch = models.CharField(max_length=50, choices=Choices, default='ECS')
    students = models.ManyToManyField(User, related_name='subjects')
    teacher = models.CharField(max_length=255, default='')

    def __str__(self):
        return self.name


class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.BooleanField(default=False)
    code = models.CharField(max_length=255, default='')
    start_time = models.TimeField()
    end_time = models.TimeField()


class Code(models.Model):
    code = models.CharField(max_length=255)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    start_time = models.TimeField(default='00:00:00')
    end_time = models.TimeField(default='00:00:00')


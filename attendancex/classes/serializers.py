from rest_framework import serializers
from .models import Semester, Subject, Attendance, Code
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'semester',  'roll_no', 'class_field', 'college_name']

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ['id', 'name', 'start_date', 'end_date']

class SubjectSerializer(serializers.ModelSerializer):
    students = UserSerializer(many=True)

    class Meta:
        model = Subject
        fields = ['id', 'name', 'semester', 'students', 'teacher']

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['id', 'user', 'subject', 'date', 'status', 'start_time', 'end_time', 'code']


class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields = ['id', 'code', 'subject', 'date']
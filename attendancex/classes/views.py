from rest_framework import generics
from .models import Semester, Subject, Attendance, Code
from .serializers import SemesterSerializer, SubjectSerializer, CodeSerializer, AttendanceSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
import time
from users.models import User
from datetime import datetime
from django.utils import timezone


class SemesterList(generics.ListCreateAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer

class SemesterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer

class SubjectList(generics.ListCreateAPIView):
    # queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    def get_queryset(self):
        
        semester = self.kwargs['semester']
        branch = self.kwargs['branch']

        if semester and branch:
            return Subject.objects.filter(branch=branch, semester=semester)
        
        return Subject.objects.all()



@api_view(['GET', 'PUT', 'DELETE'])
def subject_detail(request, name):
    try:
        subject = Subject.objects.get(name=name)
    except Subject.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SubjectSerializer(subject)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SubjectSerializer(subject, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        subject.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET', 'POST'])
def attendance(request):

    if request.method == 'POST':

        data = json.loads(request.body)

        code = data['code']
        subject_name = data['subject']
        roll_no = data['rollNo']

        # Get the current date and time in the timezone specified in your Django project settings
        now = timezone.localtime(timezone.now())
        # Get the date in the timezone
        date = now.date()
        start_time = now.time()

        subject = Subject.objects.get(name = subject_name)
        user = User.objects.get(roll_no = roll_no)
        

        test_code = Code.objects.filter(code = code, subject = subject, date = date, start_time__lte = start_time, end_time__gte = start_time)

        if test_code:
            print("Code is valid")
            attendance = Attendance.objects.create(user = user, subject = subject, date = date, status = True, start_time = start_time, end_time = now.time(), code = code)
            attendance.save()
            return Response({'status': 'success'})
        else:
            return Response({'status': 'failed'})




@api_view(['GET', 'POST'])
def show_code_form(request):

    if request.method == 'GET':

        # Get the current date and time in the timezone specified in your Django project settings
        now = timezone.localtime(timezone.now())

        # Get the date in the timezone
        date = now.date()

        start_time = now.time()

        print(start_time)

        print(date)

        test_code = Code.objects.filter(date = date, start_time__lte = start_time, end_time__gte = start_time)

        print(test_code)

        if test_code:
            return Response({'status': True})
        
        else:
            return Response({'status': False})


@api_view(['GET', 'POST'])
def percentage(request):

    if request.method == 'POST':

        data = json.loads(request.body)
        roll_no = data['rollNo']
        user = User.objects.get(roll_no=roll_no)

        attendance = Attendance.objects.filter(user=user)
        total_attendance = Code.objects.all().count()

        per = (len(attendance) / total_attendance) * 100

        print(per)
        return Response({'percentage': per})
    
    return Response({'status': 'failed'})


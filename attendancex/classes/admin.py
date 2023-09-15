from django.contrib import admin
from .models import Semester, Subject, Attendance, Code

# Register your models here.
admin.site.register(Semester)
admin.site.register(Subject)
admin.site.register(Attendance)
admin.site.register(Code)
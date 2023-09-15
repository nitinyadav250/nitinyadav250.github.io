from django.urls import path
from . import views

urlpatterns = [
    path('semesters/', views.SemesterList.as_view(), name='semester_list'),
    path('semesters/<int:pk>/', views.SemesterDetail.as_view(), name='semester_detail'),
    path('subjects/<str:branch>/<str:semester>/', views.SubjectList.as_view(), name='subject_list'),
    path('subjects/<str:name>/', views.subject_detail, name='subject_detail'),
    path('attendance/', views.attendance, name='attendance'),
    path('code-form/', views.show_code_form, name='code_form'),
    path('percentage/', views.percentage, name='percentage'),
]

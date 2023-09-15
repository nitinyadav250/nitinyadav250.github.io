from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['college_name', 'roll_no', 'class_field', 'semester', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            college_name=validated_data['college_name'],
            roll_no=validated_data['roll_no'],
            class_field=validated_data['class_field'],
            semester=validated_data['semester'],
            password=validated_data['password'],
        )
        return user

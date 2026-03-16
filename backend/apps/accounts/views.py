from rest_framework                import status
from rest_framework.decorators     import api_view, permission_classes
from rest_framework.permissions    import IsAuthenticated, AllowAny
from rest_framework.response       import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth           import authenticate
from .models                       import User
from .serializers                  import (
    RegisterSerializer,
    UserSerializer,
    LoginSerializer,
    OTPVerifySerializer,
)
from apps.veterans.models          import VeteranProfile
import pyotp, random, string


def generate_otp():
    return ''.join(random.choices(string.digits, k=6))


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user     = serializer.save()
        otp_code = generate_otp()
        user.otp_secret = otp_code
        user.save()

        # Auto-create veteran profile
        if user.role == 'veteran':
            VeteranProfile.objects.get_or_create(user=user)

        print(f'OTP for {user.email}: {otp_code}')
        return Response(
            {'message': 'Registration successful. OTP sent to email.'},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    serializer = OTPVerifySerializer(data=request.data)
    if serializer.is_valid():
        email    = serializer.validated_data['email']
        otp_code = serializer.validated_data['otp']
        try:
            user = User.objects.get(email=email)
            if user.otp_secret == otp_code:
                user.is_verified  = True
                user.otp_secret   = ''
                user.save()
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access':  str(refresh.access_token),
                    'refresh': str(refresh),
                    'user':    UserSerializer(user).data,
                })
            return Response(
                {'error': 'Invalid OTP'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def resend_otp(request):
    email = request.data.get('email')
    try:
        user         = User.objects.get(email=email)
        otp_code     = generate_otp()
        user.otp_secret = otp_code
        user.save()
        print(f'Resent OTP for {user.email}: {otp_code}')
        return Response({'message': 'OTP resent successfully.'})
    except User.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email    = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user     = authenticate(request, username=email, password=password)
        if user:
            if not user.is_verified:
                return Response(
                    {'error': 'Account not verified. Please verify OTP.'},
                    status=status.HTTP_403_FORBIDDEN
                )
            refresh = RefreshToken.for_user(user)
            return Response({
                'access':  str(refresh.access_token),
                'refresh': str(refresh),
                'user':    UserSerializer(user).data,
            })
        return Response(
            {'error': 'Invalid email or password'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get('refresh')
        token         = RefreshToken(refresh_token)
        token.blacklist()
    except Exception:
        pass
    return Response({'message': 'Logged out successfully.'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(UserSerializer(request.user).data)
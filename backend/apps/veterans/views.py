from rest_framework                import status
from rest_framework.decorators     import api_view, permission_classes
from rest_framework.permissions    import IsAuthenticated
from rest_framework.response       import Response
from .models                       import VeteranProfile
from .serializers                  import (
    VeteranProfileSerializer,
    VeteranProfileUpdateSerializer,
)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    try:
        profile = VeteranProfile.objects.get(user=request.user)
        return Response(VeteranProfileSerializer(profile).data)
    except VeteranProfile.DoesNotExist:
        return Response(
            {'error': 'Profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    try:
        profile    = VeteranProfile.objects.get(user=request.user)
        serializer = VeteranProfileUpdateSerializer(
            profile,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(VeteranProfileSerializer(profile).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except VeteranProfile.DoesNotExist:
        return Response(
            {'error': 'Profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_profile(request):
    if VeteranProfile.objects.filter(user=request.user).exists():
        return Response(
            {'error': 'Profile already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
    serializer = VeteranProfileUpdateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
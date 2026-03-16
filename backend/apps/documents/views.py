from rest_framework             import status
from rest_framework.decorators  import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response    import Response
from .models                    import Document
from .serializers               import DocumentSerializer, DocumentUploadSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_documents(request):
    docs = Document.objects.filter(veteran=request.user)
    return Response(DocumentSerializer(docs, many=True).data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_document(request):
    serializer = DocumentUploadSerializer(data=request.data)
    if serializer.is_valid():
        file = serializer.validated_data['file']
        doc  = serializer.save(
            veteran   = request.user,
            file_name = file.name,
        )
        return Response(
            DocumentSerializer(doc).data,
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_document(request, pk):
    try:
        doc = Document.objects.get(pk=pk, veteran=request.user)
        doc.file.delete()
        doc.delete()
        return Response({'message': 'Document deleted.'})
    except Document.DoesNotExist:
        return Response(
            {'error': 'Document not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_document(request, hash):
    doc = Document.objects.filter(ipfs_hash=hash).first() or \
          Document.objects.filter(blockchain_tx_hash=hash).first()
    if doc:
        return Response({
            'is_valid': True,
            'details':  f'Document verified. Uploaded by {doc.veteran.full_name}.'
        })
    return Response({'is_valid': False, 'details': 'No matching document found.'})
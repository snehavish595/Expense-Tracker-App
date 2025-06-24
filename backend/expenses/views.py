from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ExpenseSerializer
from .models import Expense


@api_view(['POST'])
def create_expense(request):
    if request.method == 'POST':
        serializer = ExpenseSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def show_expense(request):
    expenses = Expense.objects.all()
    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
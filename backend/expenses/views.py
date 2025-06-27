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

@api_view(['PUT'])
def update_expense(request, id):
    try:
        expense = Expense.objects.get(id=id)
        serializer = ExpenseSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)     
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Expense.DoesNotExist:
        return Response({'error': 'Expense not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_expense(request,id):
    try:
        expense = Expense.objects.get(id=id)
        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Expense.DoesNotExist:
        return Response({'error': 'Expense not found'}, status=status.HTTP_404_NOT_FOUND)
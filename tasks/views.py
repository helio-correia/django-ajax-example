from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.shortcuts import render

from .forms import TaskForm
from .models import Task


def index(request):
    if request.method == 'POST' and request.is_ajax():
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse(model_to_dict(form.instance))
    else:
        form = TaskForm()
    return render(request, 'tasks/index.html', {'tasks': Task.objects.all(), 'form': form})


def change_state(request, id):
    task = Task.objects.get(pk=id)
    task.completed = not task.completed
    task.save()

    return JsonResponse({'taskCompleted': task.completed})


def delete(request, id):
    task = Task.objects.get(pk=id)
    task.delete()
    return JsonResponse({'response': 'ok'})

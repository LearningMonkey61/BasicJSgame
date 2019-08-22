from django.shortcuts import render,redirect
from .models import Result
from django.views.generic import ListView
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
# Create your views here.

class ResultPageView(ListView):
	model=Result
	template_name='result.html'

@csrf_exempt
def add_new_score(request):
	if(request.method=='POST'):
		new_score=Result(score=request.POST['score'],name=request.POST['user'])
		new_score.save()
		print("A player's score is added")
	print("Reached the placed I should be at")
	return redirect('/result')

def result_page(request):
	result=Result.objects.order_by('-score','name')
	# for ob in result:
	# 	print(ob)
	context={'result':result}
	return render(request,'result.html',context)

def start_game(request):
	result = Result.objects.order_by('-score', 'name')
	context = {'result': result}
	return render(request,'index.html',context)

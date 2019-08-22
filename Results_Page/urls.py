from django.urls import path
from . import views
urlpatterns = [
    #path('', views.ResultPageView.as_view(),name='result'),
    path('add',views.add_new_score,name='add'),
    path('result', views.result_page,name='result'),
    path('play',views.start_game,name='start'),
]

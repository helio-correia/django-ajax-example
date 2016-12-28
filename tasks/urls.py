from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^change-state/(?P<id>\w+)/$', views.change_state, name='change_state'),
    url(r'^delete/(?P<id>\w+)/$', views.delete, name='delete'),
]

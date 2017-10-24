# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render_to_response,render

import os
from portfoliov2.settings import BASE_DIR

def index(request):
    return render_to_response('home/index.html')

def samples(request):
    files=[]
    for root, dir, folder in os.walk(os.path.join(BASE_DIR,'home\static\Home\Samples')):
        for file in folder:
            files.append([file, os.path.join(root,file)])
    return render(request, 'home/Samples.html', {'files':files})

def resume(request):
    return render(request, 'home/resume.html')

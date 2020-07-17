from django.shortcuts import render
from django.views import View
from donation.models import Donation, Institution
from django.contrib.auth.models import User
from django.urls import reverse
from django.shortcuts import redirect
from django.contrib.auth import authenticate
# Create your views here.

class LandingPage(View):
    def get(self,request):
        donations = Donation.objects.all()
        worki = 0
        organizacje = []
        fundacje = Institution.objects.filter(type_choice='fundacja')
        op = Institution.objects.filter(type_choice='organizacja pozarządowa')
        zl =  Institution.objects.filter(type_choice='zbiórka lokalna') 
        for i in donations:
            worki += i.quantity
            organizacje.append(i.institution)
        return render(request, 'index.html',{'worki':worki, 'organizacje':len(set(organizacje)),'fundacje': fundacje,'op':op,'zl':zl})

class AddDonation(View):
    def get(self, request):
        return render(request, 'form.html')

class Login(View):
    def get(self,request):
        return render(request, 'login.html')

    def post(self,request):
        email = request.POST.get('email','')
        password = request.POST.get('password','')
        user =   authenticate(username=email,password=password)
        return redirect('/')



class Register(View):
    def get(self,request):
        return render(request, 'register.html')

    def post(self,request):
        name = request.POST.get('name','')
        surname = request.POST.get('surname','')
        email = request.POST.get('email','')
        password = request.POST.get('password','')
        password2 = request.POST.get('password2','')
        user1 = User.objects.create(first_name=name,last_name=surname,email=email,username=email)
        if password == password2:
            user1.set_password(password)
            return redirect('/login#user_login')        

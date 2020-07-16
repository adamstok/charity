from django.shortcuts import render
from django.views import View
from donation.models import Donation, Institution
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

class Register(View):
    def get(self,request):
        return render(request, 'register.html')


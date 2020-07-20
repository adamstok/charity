from django.shortcuts import render
from django.views import View
from donation.models import Donation, Institution, Category
from django.contrib.auth.models import User
from django.urls import reverse
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime
# Create your views here.

def get_int(l):
    li = []
    for i in l:
        li.append(int(i))
    return li


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



class AddDonation(LoginRequiredMixin, View):
    def get(self, request):
        kategorie = Category.objects.all() 
        organizacje = Institution.objects.all()
        return render(request, 'form.html',{'kategorie':kategorie,'organizacje':organizacje})
    
    def post(self,request):
        dane = request.POST.get('donation','')
        datas = json.loads(dane)

        kategorie = get_int(datas["categories"])
        worki = int(datas["bags"])
        instytu = get_int(datas["institution"])
        adres = datas["address"]
        miasto = datas["city"]
        kodpocztowy = int(datas["postcode"])
        numertel = int(datas["phone"])
        timestring = datas["time"]
        datastring = datas["date"]+' '+timestring
        data = datetime.strptime(datastring, '%Y-%m-%d %H:%M')
        info = datas["info"]
        user = request.user
        categories = Category.objects.filter(pk__in=kategorie)
        instytucja = Institution.objects.get(pk__in=instytu)
        donat = Donation.objects.create(quantity=worki,institution=instytucja,
                address=adres,phone_number=numertel,city=miasto,zip_code=kodpocztowy,pick_up_date=data.date(),
                pick_up_time=data.time(),pick_up_comment=info, user=user)
        donat.categories.set(categories)
        donat.save()
        #return HttpResponse(json.dumps(response), content_itype='application/json')
        return render(request,'form-confirmation.html',{'dane':dane})
        #return redirect('/register#register_account')

class Login(View):
    def get(self,request):
        return render(request, 'login.html')

    def post(self,request):
        email = request.POST.get('email','')
        password = request.POST.get('password','')
        user =   authenticate(username=email,password=password)
        if user is not None:
            login(request, user)
            return redirect('/')
        else:
            return redirect('/register#register_account')

class Logout(View):
    def get(self,request):
        logout(request)
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
        user1 = User.objects.create(first_name=name,last_name=surname, email=email,username=email)
        if password == password2:
            user1.set_password(password)
            user1.save()
            return redirect('/login#user_login')       

class Profile(LoginRequiredMixin, View):
    def get(self,request):
        user = request.user
        donations = Donation.objects.filter(user=user)
        return render(request,'user.html',{'donations':donations})


class Donated(LoginRequiredMixin, View):
    def get(self,request):
        return render(request,'form-confirmation.html')



from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Profile, Skill, Project, Education
from .forms import ContactForm
from django.core.mail import send_mail
from django.conf import settings


def get_profile():
    return Profile.objects.first()


def home(request):
    profile = get_profile()
    featured_projects = Project.objects.filter(featured=True)[:3]
    return render(request, 'portfolio/home.html', {
        'profile': profile,
        'featured_projects': featured_projects,
    })


def about(request):
    profile = get_profile()
    return render(request, 'portfolio/about.html', {'profile': profile})


def skills(request):
    profile = get_profile()
    skills_by_category = {}
    for skill in Skill.objects.all():
        cat = skill.get_category_display()
        skills_by_category.setdefault(cat, []).append(skill)
    return render(request, 'portfolio/skills.html', {
        'profile': profile,
        'skills_by_category': skills_by_category,
    })


def projects(request):
    profile = get_profile()
    all_projects = Project.objects.all()
    return render(request, 'portfolio/projects.html', {
        'profile': profile,
        'projects': all_projects,
    })


def education(request):
    profile = get_profile()
    education_list = Education.objects.all()
    return render(request, 'portfolio/education.html', {
        'profile': profile,
        'education_list': education_list,
    })


def contact(request):
    profile = get_profile()
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            # Send email notification
            send_mail(
                subject=f"Portfolio Contact: {form.cleaned_data['subject']}",
                message=f"From: {form.cleaned_data['name']} <{form.cleaned_data['email']}>\n\n{form.cleaned_data['message']}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
            messages.success(request, 'Your message has been sent successfully!')
            return redirect('contact')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = ContactForm()
    return render(request, 'portfolio/contact.html', {'profile': profile, 'form': form})

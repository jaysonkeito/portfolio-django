from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=200)
    about = models.TextField()
    career_goals = models.TextField()
    email = models.EmailField()
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    photo = models.ImageField(upload_to='profile/', blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Profile'


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('tools', 'Tools & DevOps'),
        ('other', 'Other'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    proficiency = models.IntegerField(default=80, help_text='Percentage 0-100')
    order = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.name} ({self.get_category_display()})'

    class Meta:
        ordering = ['order', 'name']


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=300, help_text='Comma-separated list of tools/technologies')
    github_link = models.URLField(blank=True)
    live_link = models.URLField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    order = models.IntegerField(default=0)
    featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def get_technologies_list(self):
        return [t.strip() for t in self.technologies.split(',')]

    class Meta:
        ordering = ['order', 'title']


class Education(models.Model):
    school = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200, blank=True)
    year_start = models.IntegerField()
    year_end = models.IntegerField(null=True, blank=True, help_text='Leave blank if currently enrolled')
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.degree} — {self.school}'

    def get_year_range(self):
        end = self.year_end if self.year_end else 'Present'
        return f'{self.year_start} – {end}'

    class Meta:
        ordering = ['order', '-year_start']


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f'From {self.name} — {self.subject}'

    class Meta:
        ordering = ['-sent_at']

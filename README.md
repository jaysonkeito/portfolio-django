# Personal Portfolio Website — Django

A personal portfolio website built with Django, Bootstrap 5, and MySQL.

**Live Demo:** `https://firstname_lastname.pythonanywhere.com`  
**Course:** ITS 305 — Section A

---

## Tech Stack

- Python 3.10+
- Django 4.2
- MySQL
- Bootstrap 5
- HTML / CSS / JavaScript
- PythonAnywhere (hosting)

---

## Project Structure

```
portfolio_project/
├── myportfolio/          # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── portfolio/            # Main app
│   ├── migrations/
│   ├── static/portfolio/
│   │   ├── css/style.css
│   │   └── js/main.js
│   ├── templates/portfolio/
│   │   ├── base.html
│   │   ├── home.html
│   │   ├── about.html
│   │   ├── skills.html
│   │   ├── projects.html
│   │   ├── education.html
│   │   └── contact.html
│   ├── admin.py
│   ├── forms.py
│   ├── models.py
│   ├── urls.py
│   └── views.py
├── media/
├── static_root/
├── manage.py
├── requirements.txt
└── README.md
```

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/portfolio-django.git
cd portfolio-django
```

### 2. Create and activate virtual environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

> **Note:** `mysqlclient` requires MySQL to be installed locally.  
> On Windows, you may use `pip install mysqlclient` after installing MySQL.

### 4. Set up MySQL database

Open MySQL and run:

```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Configure database in settings.py

Open `myportfolio/settings.py` and update:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'portfolio_db',
        'USER': 'root',           # your MySQL username
        'PASSWORD': 'your_pass',  # your MySQL password
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### 6. Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Create superuser (for Admin panel)

```bash
python manage.py createsuperuser
```

### 8. Collect static files

```bash
python manage.py collectstatic
```

### 9. Run development server

```bash
python manage.py runserver
```

Visit: `http://127.0.0.1:8000`  
Admin: `http://127.0.0.1:8000/admin`

### 10. Add your content via Admin

Go to `http://127.0.0.1:8000/admin` and add:
- **Profile** — your name, photo, bio, email, social links
- **Skills** — with categories and proficiency levels
- **Projects** — at least 3 projects (mark some as Featured)
- **Education** — your school, degree, years

---

## Deploying to PythonAnywhere

### 1. Create a PythonAnywhere account

- Go to [pythonanywhere.com](https://www.pythonanywhere.com)
- Username format: `firstname_lastname` (e.g., `jackie_chan`)

### 2. Upload your project

In the PythonAnywhere **Bash console**:

```bash
git clone https://github.com/yourusername/portfolio-django.git
cd portfolio-django
pip install --user -r requirements.txt
```

### 3. Create MySQL database on PythonAnywhere

- Go to **Databases** tab
- Create a new MySQL database (e.g., `firstname_lastname$portfolio_db`)
- Update `settings.py` with the PythonAnywhere DB credentials

### 4. Run migrations on PythonAnywhere

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic
```

### 5. Configure Web App

- Go to **Web** tab → Add new web app → Manual configuration → Python 3.10
- **Source code:** `/home/firstname_lastname/portfolio-django`
- **WSGI file:** Edit to point to your Django project
- **Static files:** URL `/static/` → Directory `/home/firstname_lastname/portfolio-django/static_root`
- **Media files:** URL `/media/` → Directory `/home/firstname_lastname/portfolio-django/media`

### 6. Update WSGI file

```python
import sys, os
path = '/home/firstname_lastname/portfolio-django'
if path not in sys.path:
    sys.path.insert(0, path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'myportfolio.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

### 7. Update ALLOWED_HOSTS in settings.py

```python
ALLOWED_HOSTS = ['firstname_lastname.pythonanywhere.com']
```

### 8. Reload Web App

Click **Reload** in the Web tab. Your site is live!

---

## GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit — Django portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio-django.git
git push -u origin main
```

Add instructor as collaborator: `natzjun2@gmail.com`

---

## License

This project is for academic purposes — ITS 305, Section A.

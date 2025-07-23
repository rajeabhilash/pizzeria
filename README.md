# Pizzeria: A Delightful React & Django DRF Menu App 🍕

Welcome to the Pizzeria project\! This is a simple full-stack web application designed to showcase a dynamic pizza menu. The backend is powered by Django REST Framework, serving up delicious pizza data, while the frontend is built with React, providing a smooth and interactive user experience.

This project is a perfect starting point for understanding fundamental full-stack development, API integration, and modern web application structure.

## ✨ Features

  * **Dynamic Pizza Menu:** Fetches and displays a list of pizzas directly from the Django backend.
  * **Visual Menu:** Each pizza comes with its own photo, ingredients, and price.
  * **"Sold Out" Status:** Clearly indicates if a particular pizza is currently unavailable.
  * **Operational Hours:** A static section for displaying pizzeria opening hours.
  * **Order Now Button:** A call-to-action button (frontend-only for now) to simulate future ordering capabilities.
  * **Responsive Design:** (Implicitly aimed for in the React frontend) ensures a good experience on various devices.

## 🚀 Technologies Used

**Frontend (React.js)**

  * **React:** A JavaScript library for building user interfaces.
  * **HTML & CSS:** Standard web markup and styling.
  * **JavaScript (ES6+):** Modern JavaScript for logic and interactivity.

**Backend (Django REST Framework)**

  * **Python:** The programming language.
  * **Django:** A high-level Python Web framework.
  * **Django REST Framework (DRF):** A powerful toolkit for building Web APIs in Django.
  * **SQLite (Development):** Default database for easy setup.
  * **Pillow:** Python Imaging Library for handling image uploads.

**Development Tools & Others**

  * **Docker:** For containerization (though simple `runserver` is used for initial setup).
  * **Git:** Version control.
  * **npm / yarn:** Package managers for Node.js.

## 📸 UI Screenshots

*Add your beautiful UI screenshots here\! You can replace these placeholders with actual image links once you have them.*

| Menu List View | Detail View (Future) | Order Now Section |
| :------------: | :------------------: | :---------------: |
|  |  |  |

-----

## ⚙️ Installation

Follow these steps to get the Pizzeria project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

  * **Python 3.8+**
  * **Node.js & npm (or yarn)**
  * **Git**

### 1\. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone <your-repository-url> # Replace with your actual repo URL
cd Pizzeria # Or whatever your main project folder is called (e.g., 'core')
```

### 2\. Backend Setup (Django DRF)

Navigate into the `core` (or your Django project) directory:

```bash
cd core
```

**a. Create a Virtual Environment (Recommended)**

```bash
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

**b. Install Backend Dependencies**

```bash
pip install -r requirements.txt # If you have one, otherwise:
pip install Django djangorestframework Pillow django-cors-headers
```

**c. Database Migrations**

Apply the database migrations to create your Pizza table:

```bash
python manage.py makemigrations pizzeria
python manage.py migrate
```

**d. Create Superuser (for Admin Access)**

Create a superuser to access the Django admin panel and add pizza data:

```bash
python manage.py createsuperuser
```

Follow the prompts to set up your username, email, and password.

**e. Configure `settings.py` (Verify)**

Ensure your `core/settings.py` is correctly configured for DRF, CORS, and media files:

```python
# core/settings.py

# ... other INSTALLED_APPS ...
INSTALLED_APPS = [
    # ...
    'corsheaders',  # Must be here
    'rest_framework',
    'pizzeria',
]

# ... other MIDDLEWARE ...
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware', # Must be here
    # ...
]

# ...
# DRF Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
}

# Media Files (for pizza photos)
import os
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# CORS Headers (Crucial for React frontend)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000", # Your React dev server
    "http://127.0.0.1:3000",
]
CORS_ALLOW_ALL_ORIGINS = True # Set to False in Production!
CORS_ALLOW_METHODS = [ 'DELETE', 'GET', 'OPTIONS', 'POST', 'PUT', ]
CORS_ALLOW_HEADERS = [ 'accept', 'accept-encoding', 'authorization', 'content-type', 'dnt', 'origin', 'user-agent', 'x-csrftoken', 'x-requested-with', ]

```

### 3\. Frontend Setup (React)

Navigate to your React application directory (e.g., `frontend-app` if it's separate from `core`):

```bash
cd ../frontend-app # Adjust this path based on your project structure
```

**a. Install Frontend Dependencies**

```bash
npm install # or yarn install
```

-----

## ▶️ How to Run

Follow these steps to run both the backend and frontend.

### 1\. Run the Backend (Django DRF)

From your `core` (Django project) directory:

```bash
python manage.py runserver
```

The backend API will be accessible at `http://127.0.0.1:8000/api/`.

**Important:** For images to load in development, ensure you have this in your `core/urls.py`:

```python
# core/urls.py
from django.conf import settings
from django.conf.urls.static import static

# ... your urlpatterns ...

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### 2\. Run the Frontend (React)

From your React application directory (e.g., `frontend-app`):

```bash
npm start # or yarn start or npm run dev (if using Vite)
```

The React development server will typically start on `http://localhost:3000`.

Open your browser and navigate to `http://localhost:3000` to see the Pizzeria menu\!

-----

## 🧠 How It Works

### Backend (Django REST Framework)

  * **`pizzeria/models.py`**: Defines the `Pizza` model with fields like `name`, `ingredients`, `price`, `photoName`, and `soldOut`.
  * **`pizzeria/serializers.py`**: A `ModelSerializer` is used to convert `Pizza` model instances into JSON format suitable for the API. It correctly handles the `photoName` as a full URL.
  * **`pizzeria/views.py`**: Utilizes DRF's `generics.ListCreateAPIView` and `generics.RetrieveUpdateDestroyAPIView` to provide standard CRUD (Create, Read, Update, Delete) operations for pizzas with minimal code.
  * **`pizzeria/urls.py`**: Defines API routes (`/api/pizzas/` for list/create, `/api/pizzas/<id>/` for detail/update/delete).
  * **`core/settings.py`**: Configures DRF, handles CORS for cross-origin requests from the React app, and sets up media file serving for development.

### Frontend (React)

  * The main React component (`App.js` or `Menu.js`) uses the `useState` hook to manage the `pizzaData` array, `isLoading` status, and `error` state.
  * The `useEffect` hook is employed to perform the data fetching from the Django DRF backend (`http://127.0.0.1:8000/api/pizzas/`) when the component mounts.
  * It uses the native `fetch` API for making HTTP requests.
  * Conditional rendering ensures that "Loading..." messages, error messages, or the actual pizza list are displayed based on the API call's status.
  * The fetched `pizzaData` (an array of pizza objects) is then mapped over to render individual pizza components, displaying their details and images.

### Data Flow

1.  User opens the React frontend in their browser (`http://localhost:3000`).
2.  The React component mounts and triggers a `useEffect` hook.
3.  The `useEffect` hook makes a `GET` request to the Django DRF backend (`http://127.0.0.1:8000/api/pizzas/`).
4.  The Django DRF backend processes the request, queries the `Pizza` model, serializes the data into JSON (including full image URLs), and sends it back.
5.  The React frontend receives the JSON data.
6.  The React component updates its `pizzaData` state with the fetched information.
7.  React re-renders the UI to display the dynamic pizza menu.

-----

## 💡 Future Enhancements

  * **Shopping Cart & Ordering System:** Implement full cart functionality and a robust order placement process.
  * **User Authentication:** Allow users to register, log in, and manage their orders.
  * **Admin Panel for Content:** A dedicated section for pizzeria staff to manage menu items, orders, etc.
  * **Search & Filtering:** Add options to search for pizzas by name or filter by ingredients/availability.
  * **Payment Gateway Integration:** Integrate with services like Stripe or PayPal for real payments.
  * **Deployment:** Deploy the full-stack application to cloud platforms (e.g., AWS, GCP, Heroku, Vercel) using Docker.
  * **Reviews & Ratings:** Allow users to leave reviews for pizzas.

-----

## 🤝 Contributing

Contributions are welcome\! If you have suggestions for improvements or new features, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add new feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

-----

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

-----

Enjoy building your Pizzeria\! 🍕

# BloodPlus

BloodPlus is a blood donation and request platform with a Django REST backend and a Next.js frontend.

## Tech stack

- Backend: Django, Django REST Framework, Simple JWT, CORS
- Frontend: Next.js, React, Tailwind CSS, Axios, Zustand

## Setup

### Backend

1. Create and activate a Python virtual environment.
2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Run migrations:
   ```bash
   python backend/manage.py migrate
   ```
4. Start the backend server:
   ```bash
   python backend/manage.py runserver
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend:
   ```bash
   npm run dev
   ```

## Notes

- Backend database: `backend/db.sqlite3`
- Upazila data is stored in `backend/bangladesh_upazilas.json`
- Frontend routes include registration, sign-in, blood requests, and profile pages.

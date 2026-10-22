# Tech Avinya Backend API (Node.js + Express + Supabase)

Standalone backend service for Tech Avinya event enrollments, sponsor inquiries ("Connect With Us"), and Admin Panel data management with Supabase.

---

## ⚡ Deployment Options

### Option 1: Deploying to Render (Recommended for Express Apps)
1. Push your code to your GitHub repository.
2. Log in to [Render](https://render.com) and click **New +** -> **Web Service**.
3. Select your repository.
4. Set the following settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. In the **Environment Variables** tab, add:
   - `PORT`: `8080` (or leave default, Render sets `PORT` automatically)
   - `SUPABASE_URL`: Your Supabase Project URL (`https://xyz.supabase.co`)
   - `SUPABASE_KEY`: Your Supabase Service Role Key or Anon Key
   - `ADMIN_EMAIL`: `admin@nitn.ac.in`
   - `ADMIN_PASSWORD`: Your secret admin password
6. Click **Create Web Service**.
7. Once deployed, copy your Render URL (e.g., `https://tech-avinya-backend.onrender.com`) and set it in your frontend environment as `VITE_API_BASE_URL`.

---

### Option 2: Deploying to Vercel (Serverless)
1. Install Vercel CLI (or connect GitHub repository on [vercel.com](https://vercel.com)):
   ```bash
   cd backend
   npx vercel
   ```
2. When prompted:
   - Set the root directory to `backend`.
   - In Project Settings -> Environment Variables, add:
     - `SUPABASE_URL`: Your Supabase Project URL
     - `SUPABASE_KEY`: Your Supabase Key
     - `ADMIN_EMAIL`: `admin@nitn.ac.in`
     - `ADMIN_PASSWORD`: Your secret admin password
3. Click **Deploy**. Vercel will use `vercel.json` and `@vercel/node` to run `index.js` as a serverless function.

---

## 🗄️ Supabase Database Setup
1. Go to [Supabase Dashboard](https://supabase.com/dashboard) and create/open your project.
2. In the left navigation, open **SQL Editor**.
3. Copy the contents of [`supabase-schema.sql`](./supabase-schema.sql) and click **Run**.
4. Go to **Storage**, confirm the `payment-proofs` bucket is created and marked as public.
5. In **Project Settings** -> **API**, copy your `Project URL` and `anon public` (or `service_role secret`) key into your backend `.env`.

---

## 💻 Local Development
1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:8080`.

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & Supabase connection test |
| `POST` | `/api/enroll` | Event enrollment with 10-digit phone & roll validation + screenshot upload |
| `POST` | `/api/register` | Alias for enrollment form compatibility |
| `POST` | `/api/sponsors` | Sponsor inquiry / Connect With Us form (10-digit phone validation) |
| `POST` | `/api/admin/login` | Secure admin login |
| `GET` | `/api/admin/registrations` | Fetch all event enrollments |
| `PUT` | `/api/admin/registration/status/:id` | Update registration status (Accepted, Rejected, Pending) |
| `GET` | `/api/admin/sponsors` | Fetch all sponsor inquiries |
| `PUT` | `/api/admin/sponsors/status/:id` | Update sponsor status (New, Contacted, Confirmed, Declined) |

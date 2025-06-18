# 🏠 StayFinder – Airbnb-Inspired Full Stack Web App

StayFinder is a full-stack web application inspired by Airbnb, allowing users to list and book properties for short-term or long-term stays. This project provides hands-on experience across frontend, backend, and database integration.

---

## 🔧 Tech Stack

### 🚀 Frontend
- React.js (with React Router)
- Tailwind CSS (for responsive UI)
- Axios (for API calls)

### 🛠️ Backend
- Node.js with Express
- JWT for authentication
- Bcrypt for password hashing
- CORS and dotenv for environment config

### 🗃️ Database
- MongoDB with Mongoose (or PostgreSQL with Sequelize, depending on final choice)
- Collections/Tables: `Users`, `Listings`, `Bookings`

---

## 🎯 Features

### User Features:
- Browse listings by location and price
- View listing details with images, description, and availability calendar
- Register and log in securely
- Book stays with date selection
- (Optional) Save favorite listings

### Host Features:
- Host dashboard to manage own listings (Add/Edit/Delete)
- View bookings for own properties

### Admin Features (Optional):
- View all listings, users, and bookings (for moderation)

---

## 🧠 Two Unique Features to Improve Airbnb

1. **Smart Price Suggestion Engine:**  
   Hosts get automatic price suggestions based on nearby listings, demand, and seasonal trends using AI/ML logic.

2. **Verified Local Experience Tags:**  
   Properties can be tagged with experiences like “Family Friendly,” “Pet Friendly,” “Remote Worker Ready” based on reviews and AI-driven analysis.

---

## 🔒 Security & 🧱 Scalability

- 🔐 Passwords are hashed using `bcrypt`.
- 🔐 JWT-based token auth system with access control middleware.
- 🔒 API protected from unauthorized access.
- 🌐 Uses RESTful APIs for clean architecture.
- ⬆️ Designed using MVC pattern to support scaling.
- 🗂️ Pagination and filtering on listings.
- ☁️ Ready for deployment on Render/Vercel/Heroku.

---

## 🌐 Bonus Features (Optional)
- Search with filters (location, price, dates)
- Google Maps/Mapbox integration to show property locations
- Mock payment integration using Stripe test environment

---

## 📁 Folder Structure

```

stayfinder/
├── client/                 # React frontend
│   ├── public/
│   └── src/
├── server/                 # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── .env
├── package.json
├── README.md

````

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/stayfinder.git
cd stayfinder
````

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env   # Add your Mongo URI, JWT_SECRET
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
npm start
```

---

## ✅ Seed Data

* Demo users and listings included for testing.
* Use `POSTMAN` or pre-seeded scripts for easy testing.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**A Poorna Seshaseyan**
📧 [poornaseshaseyanaraja@gmail.com](mailto:poornaseshaseyanaraja@gmail.com)
🌐 [GitHub](https://github.com/Saipoo)

```

Let me know if you'd like to customize this for a **PostgreSQL** backend, **Stripe integration**, or **deployment instructions for Render/Vercel**.
```
# stayfinder

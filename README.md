
# 🌾 AgroHub

**AgroHub** is a responsive full-stack agro-based e-commerce platform designed to bridge the gap between farmers, consumers, and suppliers. It enables farmers to sell their products, buy pesticides and fertilizers, lend heavy machinery, and manage inventory. Consumers can purchase fresh agricultural products directly from farmers. Suppliers can provide agrochemicals and equipment. Admins manage orders, deliveries, and platform users.

---

## 🌐 Live Website

👉 [Visit AgroHub Live](https://chetanagrohub.netlify.app/)

---

## 🚀 Features

### 👨‍🌾 Farmer Module
- List and sell agricultural products
- Buy fertilizers and pesticides
- Lend heavy machinery
- Manage orders and inventory

### 🛒 Consumer Module
- Browse and buy farm products
- Secure checkout and payment
- Track orders and delivery

### 🏭 Supplier Module
- List agrochemical and equipment products
- View and fulfill farmer purchases

### 🛠️ Admin Panel
- Manage users (farmers, consumers, suppliers)
- Control order flow and delivery status
- Monitor transactions and reports

---

## 📦 Tech Stack

**Frontend:**
- React.js
- Axios
- Styled-components
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (for file uploads)

**Deployment:**
- Frontend: Netlify
- Backend: Vercel
- Database: MongoDB Atlas

---

## 🔐 Authentication & Roles

- JWT-based secure login
- Role-based access control (Farmer, Consumer, Supplier, Admin)


---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/agrohub.git
cd agrohub
```

### 2. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Setup Environment Variables

Create `.env` in the backend directory with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your-paypal-client-id
CLOUDINARY_CLOUD_NAME=your cloud name
CLOUDINARY_API_KEY=your api key
CLOUDINARY_API_SECRET=your api secret
```

### 4. Run the App

```bash
# Run backend
cd backend
node server.js / nodemon server.mjs

# Run frontend
cd frontend
npm start
```

---

## 🧪 Future Enhancements

- AI-based crop disease detection
- Chat system between stakeholders
- Farmer profile rating and review system
- Real-time order tracking with maps
- Mobile app version (React Native)

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 👨‍💻 Author

Made by **Chetan H M**

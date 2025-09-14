# Project Manager Backend (Node.js + MongoDB)

A backend application for managing projects, tenants, users, and roles.  
Built with **Node.js**, **Express.js**, and **MongoDB (Mongoose ORM)**.  

---

## 📌 Features
- User authentication with JWT  
- Role-based access control (RBAC)  
- Multi-tenant support  
- Project management APIs (CRUD)  
- Password hashing with bcrypt  
- Secure token encryption  
- REST API with JSON responses  

---

## 🛠️ Tech Stack
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT + bcrypt  
- **Other:** Crypto, Middleware-based error handling  

---

## 📂 Project Structure

project-manager-node-mongodb/  
│-- config/ # Configurations (DB, JWT, etc.)  
│-- controllers/ # Route controllers  
│-- models/ # Mongoose models (User, Role, Project, Tenant)  
│-- routes/ # Express routes  
│-- services/ # Business logic & utilities  
│-- app.js # Main application entry point  
│-- package.json # Dependencies & scripts  

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/Project-manager-node-mongodb.git
cd Project-manager-node-mongodb
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/project-manager
JWT_SECRET=your_secret_key
JWT_EXPIRATION=1d
```

### 4. Run the application
```bash
npm start
```
App will run on: **http://localhost:5000**

---

## 🔒 Authentication
All protected routes require a **JWT token** in headers:  

```
Authorization: Bearer <token>
```

---

## 🧪 Running in Development
```bash
npm run local
```
This uses **nodemon** for hot reloading.  

---

## 📌 Example Request (Register User)
```http
POST api/tenant/:tenantId/user
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "manager",
  "tenantId": "tenant_123"
}
```

### ✅ Example Response
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "64e7cbbf1a2e8f001234abcd",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "manager",
    "tenantId": "tenant_123"
  }
}
```

---

## 📝 License
This project is licensed under the MIT License.  

---

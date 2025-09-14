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

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/jalalsiraj/Project-manager-node-mongodb.git
cd Project-manager-node-mongodb


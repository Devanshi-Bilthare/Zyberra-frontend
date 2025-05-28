# Zyberra Frontend

**Zyberra** is a modern, responsive eCommerce web application for digital gadgets. The name "Zyberra" comes from combining *Cyber* and *Terra*, symbolizing a futuristic digital marketplace.

This frontend is built using **Vite** + **React**, styled with **Tailwind CSS**, and uses **Redux Toolkit** for state management. The site is fully responsive, includes dark/light mode, and integrates with **ImageKit** for efficient image handling.

---

## 🔧 Tech Stack

- Vite (Frontend Bundler)
- React.js (Functional Components + Hooks)
- Tailwind CSS + Styled Components (Dark/Light Mode)
- Redux Toolkit (State Management)
- React Router DOM (Routing)
- Axios (API Handling)
- ImageKit + Express File Uploader (Image Hosting)
- JWT Auth (Handled via backend)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-frontend-repo-url>
cd zyberra-frontend
2. Install Dependencies


npm install
# or
yarn

4. Run the Development Server

npm run dev
# or
yarn dev
Visit: http://localhost:5173

💡 Key Features
🛍️ User Side
Sticky navbar with:

Logo

Voice-enabled search bar

Dark/Light mode toggle

Wishlist, Cart, and Profile

Login/Register/Forgot Password

Email-based password reset

Category list filter (only categories with products)

Banner for homepage and per-category

Product list with wishlist and cart buttons

Wishlist and cart redirection protected

Product detail page with image zoom and multiple images

Cart:

Quantity increase/decrease

Remove item

Checkout with test payment flow (dummy gateway)

Responsive across devices (desktop/mobile)

🔐 Authentication
Protected routes for cart, wishlist, profile

Admin-only routes protected via JWT and adminProtect

🧑‍💼 Admin Dashboard
Dashboard metrics: Total Users, Products, Orders, Sales

Product Management:

Add/Edit/Delete products

Add/Edit/Delete categories

View and manage orders

User list view

🧪 Admin Credentials (Demo):

Email: devanshibilthare54@.com

Password: 123
# Snapdeal Clone - Full Stack E-commerce Platform

## Project Summary
This project is a full-stack e-commerce web application replicating the core functionalities of Snapdeal. Users can browse products, add items to the cart, and complete purchases seamlessly.

```bash
git clone https://github.com/Daneyal-65/server_snapdeal
```
```bash
cd server_snapdeal
npm install
```
```bash
npm run dev
```
## Tech Stack
- **Frontend:** ReactJS, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT
- **State Management:** Redux Toolkit
- **Hosting:** Netlify (Frontend), Render (Backend)


## Features
- User Authentication (JWT-based login/signup)
- Product Listings with Filtering and Sorting
- Cart and Order Management
- Secure Payment Processing with Stripe
- User Dashboard for Order History and Profile Management


## API Endpoints
### Products
```
GET    /products/
GET    /products/:category
POST   /products/add
PATCH  /products/edit/:id
DELETE /products/delete/:id
```

### Cart
```
GET    /carts/
POST   /carts/addToCART
PATCH  /carts/update/
PATCH  /carts/delete/
DELETE /carts/deleteCart
```

### Orders
```
GET    /orders/
POST   /orders/done
```

## Deployment & Testing
- **Frontend Deployment:** Netlify
- **Backend Deployment:** Render/Heroku
- **Testing:** Jest for unit tests, Postman for API testing
- **CI/CD:** Automated deployments using GitHub Actions




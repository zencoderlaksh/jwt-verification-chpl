# JWT-Based Event Management System

## Overview

The JWT-Based Event Management System is a web application with a **backend** powered by **Node.js** and **Express.js** and a **frontend** built using a basic setup of **HTML, CSS, and JavaScript**. The project focuses on authentication and authorization using **JSON Web Tokens (JWT)**, ensuring secure access for users and admins.

---

## Features

### Backend

- User and Admin authentication using **JWT**.
- Password hashing with **bcrypt** for secure storage.
- Role-based access control (Users and Admins).
- API routes to:
  - Sign up and log in.
  - Manage events (Admins only).
  - RSVP to events (Registered users).
- Data validation and modeling using **Mongoose**.

### Frontend

- Basic UI setup for login and signup.
- Future-ready structure for integrating API endpoints.

---

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Web framework for building APIs.
- **JWT**: Token-based authentication.
- **bcrypt**: Secure password hashing.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **Postman**: For testing API routes.
- **JOI Validation**: For backend model validation.

### Frontend

- **HTML**: Markup for the web pages.
- **CSS**: Basic styling for the interface.
- **JavaScript**: Client-side interactivity.

---

## Installation & Setup

### Clone the Repository

```bash
git clone <repository-url>
cd jwt-event-management
```

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with the following:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Open `index.html` in your browser for basic UI.

---

## Backend Folder Structure

```
backend/
|-- models/         # Mongoose schemas (e.g., User, Event)
|-- routes/         # API routes for users and admins
|-- middleware/     # Authentication and authorization middleware
|-- controllers/    # Logic for handling API requests
|-- .env            # Environment variables
|-- server.js       # Main server file
```

---

## API Endpoints

### User Routes

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | `/api/users/register` | Register a new user      |
| POST   | `/api/users/login`    | Login and generate a JWT |

### Admin Routes

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| POST   | `/api/admins/register` | Create a new admin |
| LOGIN  | `/api/admins/login`    | log an admin       |

---

## Testing API with Postman

1. Use the **signup** and **login** routes to get a JWT.
2. Include the JWT in the Authorization header as:
   ```
   Authorization: Bearer <your-jwt-token>
   ```
3. Test the user and admin routes by providing appropriate tokens.

---

## Future Enhancements

- Integrate a fully functional frontend with API endpoints.
- Add features like password reset, email verification, and pagination for events.
- Implement advanced UI/UX with React.js or other frameworks.
- Add unit and integration tests.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Acknowledgments

- Thanks to the creators of **bcrypt**, **JWT**, and **Mongoose** for their powerful libraries.
- The open-source community for inspiration and resources.

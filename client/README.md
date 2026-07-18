# EventX 🎉

A modern event management platform that enables users to discover, create, and register for events with a clean, responsive interface and secure authentication.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)
![Azure](https://img.shields.io/badge/Hosted%20on-Azure-0078D4?logo=microsoftazure)

---

## Features

### Authentication

* Secure JWT authentication
* HTTP-only cookie based sessions
* User signup and login
* Protected routes
* Optional authentication for public pages

### Event Management

* Create new events
* Edit existing events
* Archive events
* Browse upcoming events
* Search events by title
* Filter by category
* Pagination support

### Registration System

* One-click event registration
* Cancel registrations
* Duplicate registration prevention
* Registration limit enforcement
* Atomic registration using MongoDB transactions
* Real-time seat availability

### Security

* Password hashing with bcrypt
* JWT authentication
* Input validation using Zod
* Route-specific rate limiting
* Secure HTTP-only cookies
* CORS configuration

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Axios
* React Router

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* Zod
* bcrypt
* express-rate-limit

### Deployment

* Frontend: Vercel
* Backend: Azure App Service
* Database: MongoDB Atlas

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/<your-username>/eventx.git
cd eventx
```

### Backend

```bash
cd server

npm install

npm run dev
```

Create a `.env` file by seeing the env.example file:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret

NODE_ENV="development"

```

### Frontend

```bash
cd client

npm install

npm run dev
```

Create a `.env` file:

```env
VITE_SERVER_URI=http://localhost:5173
```

---

## Project Structure

```
EventX
│
├── client/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   └── ...
│
└── README.md
```

---
## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Create a new account |
| POST | `/auth/login` | Login user |
| GET | `/auth/logout` | Logout user |
| GET | `/auth/me` | Get authenticated user |

---

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/event/allEvents` | Get all upcoming events |
| GET | `/event/:id` | Get event details |
| GET | `/event/:id/registrations` | Get participants for an event |
| POST | `/event/addEvent` | Create an event |
| POST | `/event/register` | Register for an event |
| DELETE | `/event/deleteRegistration` | Cancel own registration |
| DELETE | `/event/:id/removeRegistration/:userId` | Remove a participant (creator/admin) |
| PATCH | `/event/:id/edit` | Edit an event |
| PATCH | `/event/:id/archive` | Archive an event |

---

### Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile/upcoming` | Upcoming registered events |
| GET | `/profile/past` | Past attended events |
| GET | `/profile/myEvents` | Events created by the user |
| PUT | `/profile/update` | Update profile information |

---

### Contact

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/contact` | Submit a contact/support request |
| GET | `/contact/allQueries` | View all submitted queries (Admin) |---

## Design Decisions

- MongoDB transactions prevent overbooking during concurrent registrations.
- Registration counts are stored in the Event document for constant-time availability checks.
- JWTs are stored in HTTP-only cookies for improved security.
- Separate authentication and authorization middleware keeps route protection modular.
- Optional authentication enables personalized responses while allowing guests to browse events.
- Zod validates every incoming request before it reaches the business logic.
- Route-specific rate limiting protects authentication and resource-intensive endpoints.---
 
---

## Future Improvements

* Email notifications
* QR-code based check-in
* Event analytics dashboard
* Image uploads with cloud storage
* Admin moderation panel
* Calendar integration
* Bookmark/Favorite events

---

## Author

**Charan Malampati**

GitHub: https://github.com/adlee05

---

## Support

If you found this project helpful, consider giving it a star!


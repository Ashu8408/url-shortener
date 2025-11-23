# URL Shortener

A simple URL shortener service built with **Node.js**, **Express**, and **MongoDB**, with support for link creation, analytics, and deletion.

---

## 🔧 Features

- Create short links for long URLs  
- Generate a **custom short code** (optional)  
- Redirect to the original URL when visiting `/:shortId`  
- Track **visit history** (timestamp of each click)  
- Get analytics for a shortened URL: total clicks + history  
- Delete a short URL  
- Health check endpoint (`/healthz`)  
- Simple and modular code structure (controllers, routes, models)

---

## 🧱 Tech Stack

- **Backend**: Node.js, Express  
- **Database**: MongoDB (via Mongoose)  
- **ID Generation**: `shortid` npm package  
- **Hosting**: Can be deployed to platforms like Vercel / Railway / Render

---

## 📂 Project Structure

├── backend/
│ ├── index.js # Entry point (Express app)
│ ├── connect2.js # MongoDB connection logic
│ ├── controllers/
│ │ └── url.js # Business logic for URL operations
│ ├── routes/
│ │ └── url.js # Express routes for the URL API
│ └── models/
│ └── url.js # Mongoose schema for URL
└── README.md # Project README (this file)


---

## 🛠️ Setup & Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/Ashu8408/url-shortener.git

2. Install dependencies

    ```bash
        cd url-shortener / backend
        npm install


3. Setup MongoDB

    - Either run a local MongoDB instance

    - Or use a MongoDB Atlas / managed MongoDB service

    - Set the connection URL in .env or configure in your code


🚀 API Endpoints

| Method   | Endpoint                  | Description                                                        |
| -------- | ------------------------- | ------------------------------------------------------------------ |
| `POST`   | `/url`                    | Create a new short link. Body: `{ url: string, shortID?: string }` |
| `GET`    | `/url/all`                | List all links (for admin or dashboard)                            |
| `GET`    | `/url/analytics/:shortId` | Get analytics for a short code (clicks + history)                  |
| `DELETE` | `/url/:shortId`           | Delete a short link                                                |
| `GET`    | `/:shortId`               | Redirect to the original URL                                       |
| `GET`    | `/healthz`                | Health-check endpoint (returns `200 OK`)                           |



- Create a link
    curl -X POST http://localhost:8001/url \
    -H "Content-Type: application/json" \
    -d '{"url":"https://example.com"}'


- Get analytics
    curl http://localhost:8001/url/analytics/SHORTCODE


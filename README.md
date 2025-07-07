# 📸 The Interactive Gallery — Project Documentation

## 🧩 Overview

This is a full-stack application that allows users to search for images from **Unsplash**, view image details, and interact through **comments** and **likes**.

- **Frontend**: Next.js + Redux Toolkit + Tailwind CSS  
- **Backend**: Express.js + MongoDB  
- **API Communication**: RTK Query (Redux Toolkit Query)

---

## ⚙️ Technologies Used

### 🖼 Frontend

- [x] Next.js 15  
- [x] Redux Toolkit + RTK Query  
- [x] Tailwind CSS 4  
- [x] Lucide Icons  
- [x] TypeScript  

### 🛠 Backend

- [x] Express.js 5  
- [x] MongoDB (Mongoose)  
- [x] TypeScript  
- [x] Morgan (Logger)  
- [x] CORS  

---

## 🧪 Environment Variables

### 📦 Server `.env`

```env
MONGODB_URI=your_mongodb_connection_string
```

### 🌐 Client `.env.local`

```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

---

## 🔄 RTK Query APIs

### 📁 `redux/apis/backendApi.ts`

This file defines API endpoints that interact with your backend:

#### ✅ Endpoints

| Name                   | Type      | Description                            | Path                                  |
|------------------------|-----------|----------------------------------------|---------------------------------------|
| `postComment`          | Mutation  | Posts a comment                        | `POST /api/comments`                  |
| `likeImage`            | Mutation  | Likes an image                         | `POST /api/likes`                     |
| `deleteLike`           | Mutation  | Removes a like                         | `DELETE /api/likes/:id/:user`        |
| `getCommentsByImageId` | Query     | Gets comments for an image             | `GET /api/comments/:imageId`         |
| `getLikesByImageId`    | Query     | Gets like count for an image           | `GET /api/likes/count/:imageId`      |
| `checkUserLikeStatus`  | Query     | Checks if user liked a specific image  | `GET /api/likes/check/:id/:user`     |

---

### 📁 `redux/apis/unsplashApi.ts`

Used to query Unsplash’s public API for image searches.

#### ✅ Endpoints

| Name           | Type   | Description                  |
|----------------|--------|------------------------------|
| `getImages`    | Query  | Search for images            |
| `getImageById` | Query  | Get image by Unsplash ID     |

---

## 🚀 Running the Project

### 📦 Backend (Express)

```bash
cd server
npm install
```

Create `.env`:

```env
MONGODB_URI=your_mongo_uri
```

Start the server:

```bash
npm run dev  # or npm run serve
```

---

### 🌐 Frontend (Next.js)

```bash
cd client
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_access_key
```

Start the app:

```bash
npm run dev
```

---


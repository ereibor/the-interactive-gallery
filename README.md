📸 The Interactive Gallery — Project Documentation

🧩 Overview
This is a full-stack application that allows users to search for images from Unsplash, view image details, and interact with them through comments and likes. It includes:

Frontend: Next.js + Redux Toolkit + Tailwind CSS

Backend: Express.js + MongoDB

API Communication: RTK Query (Redux Toolkit Query)



⚙️ Technologies Used

🖼 Frontend
Next.js 15

Redux Toolkit + RTK Query

Tailwind CSS 4

Lucide Icons

TypeScript




🛠 Backend
Express.js 5

MongoDB (Mongoose)

TypeScript

Morgan (Logger)

CORS

dotenv


🧪 Environment Variables
📦 Server .env

MONGODB_URI=your_mongodb_connection_string
PORT=4000

🌐 Client .env.local

NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key




🔄 RTK Query APIs
📁 redux/apis/backendApi.ts
This file defines API endpoints that interact with your backend:

✅ Endpoints:
Name	               Type	              Description	                         Path
postComment	          Mutation	          Posts a comment	                     POST /api/comments
likeImage	          Mutation	          Likes an image	                     POST /api/likes
deleteLike	          Mutation	          Removes a like	                     DELETE /api/likes/:id/:user
getCommentsByImageId  Query	              Gets comments for an image	         GET /api/comments/:imageId
getLikesByImageId	  Query	              Gets like count for an image           GET /api/likes/count/:imageId
checkUserLikeStatus	  Query	              Checks if user liked a specific image  GET /api/likes/check/:id/:user




📁 redux/apis/unsplashApi.ts
Used to query Unsplash’s public API for image searches.

✅ Endpoints:
Name	               Type	              Description
getImages	           Query	          Search for images
getImageById	       Query	          Get image by its Unsplash ID




🚀 Running the Project



📦 Backend (Express)
Install dependencies:

cd server
npm install
Create .env

MONGODB_URI=your_mongo_uri

Run the server: npm run dev # or npm run serve



🌐 Frontend (Next.js)
Install dependencies:

cd client
npm install
Create .env.local:
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_access_key
Run the app: npm run dev
# 🎧 Spotify-Sync

Spotify-Sync is a full-stack music streaming platform where **artists** can upload and publish their music, create playlists for their audience, and interact with listeners. **Normal users** can stream songs, play playlists built by their favourite artists, and follow creators they enjoy.

A flagship feature of Spotify-Sync is **real-time cross-platform playback synchronization** — if a user is logged in on multiple devices, playing music on one device automatically continues on the others.

## Features

-   👨‍🎤 Artist accounts for publishing and managing songs
-   🎶 Playlist creation for artist audiences
-   🎧 Streaming for users with seamless playback UI
-   🔁 Real-time synchronized playback across devices
-   🔐 JWT authentication + Google OAuth login
-   ☁️ AWS S3 storage for audio files
-   📱 Responsive UI built with React

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

**Authentication:** JWT & Google OAuth

**File Storage**: AWS S3 Bucket

## Prerequisites

-   Node.js (LTS recommended)
-   MongoDB (local or cloud)
-   AWS S3 Bucket
-   Google OAuth credentials

## Environment Variables

To run this project, you will need to add the following environment variables to your .env files

**1. Auth Service:**

`MONGO_URI=<Your mongodb uri>`

`JWT_SECRET=<Generate your jwt secret>`

`GOOGLE_CLIENT_ID=<Your google client id>`

`GOOGLE_CLIENT_SECRET=<Your google client secret>`

`RABBITMQ_URI=<Your RabbitMQ uri>`

**2. Music Service:**

`MONGO_URI=<Your mongodb uri>`

`JWT_SECRET=<Generate your jwt secret>`

`AWS_REGION=<AWS S3 Bucket region code>`

`AWS_BUCKET=<AWS S3 Bucket name>`

`AWS_ACCESS_KEY_ID=<AWS account access_key_id>`

`AWS_SECRET_KEY=<AWS account secret_key>`

**3. Notification Service:**

`MONGO_URI=<Your mongodb uri>`

`JWT_SECRET=<Generate your jwt secret>`

`GOOGLE_CLIENT_ID=<Your google client id>`

`GOOGLE_CLIENT_SECRET=<Your google client secret>`

`REFRESH_TOKEN=<Your refresh token provided by google>`

`EMAIL_USER=example@example.com`

`RABBITMQ_URI=<Your RabbitMQ uri>`

## Run Locally

1. Clone the project

```bash
  git clone https://github.com/ScriptiveMen/Spotify-Sync
```

2. Go to the project directory

```bash
  cd Spotify-Sync
```

3. Install dependencies for each service

```bash
  npm install
```

4. Create .env files in every service folder with the required variables.

5. Start the services

```bash
  npm run dev
```

💡 All services must be running simultaneously for full functionality.

## Screenshots
<img width="1710" height="958" alt="Screenshot 2025-11-26 at 2 04 29 PM" src="https://github.com/user-attachments/assets/e1a8c8ec-df1b-4e96-a10a-ad592659da30" />

<img width="1705" height="958" alt="Screenshot 2025-11-26 at 12 17 41 PM" src="https://github.com/user-attachments/assets/b8878479-ed50-4b98-8448-2af55c79ad39" />

<img width="1710" height="1112" alt="Screenshot 2025-11-26 at 10 28 57 AM" src="https://github.com/user-attachments/assets/f15098a9-1a11-444a-86dd-b3f3db9f1318" />


<img width="1710" height="958" alt="Screenshot 2025-11-26 at 2 04 21 PM" src="https://github.com/user-attachments/assets/d5cb869c-8ac4-41d8-9779-4ee830fdce26" />



## ✨ Final Note

Spotify-Sync demonstrates scalable backend architecture, robust authentication, real-time synchronization, and media streaming — an advanced and production-ready learning project.

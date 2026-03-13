# 🎵 MiniProject-Song
A full-stack application for managing songs, featuring an Angular frontend and a Spring Boot REST API backend.

---

## 🚀 Features

- View all songs  
- Add new songs  
- Update song details  
- Delete songs  
- Search songs by name, artist, or genre  
- Sort songs by different fields  

---

## 🛠 Technologies Used

### Frontend
- Angular
- TypeScript
- RxJS Observables
- HTML
- CSS

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs

### Database
- MySQL

### Build Tools
- Maven
- Node.js / npm

---


---

## ⚙️ Frontend Implementation

The frontend is developed using **Angular** and communicates with the backend REST API.

It uses **RxJS Observables** to:

- Handle asynchronous HTTP requests  
- Manage API response streams  
- Update UI dynamically  

Key Angular features used:

- Angular Components  
- Angular Services  
- RxJS Observables for API calls  
- Angular Routing  
- HTTPClient module  

---

## ⚙️ Backend Implementation

The backend is built using **Spring Boot** and exposes REST APIs for managing song data.

Architecture includes:

- Controller Layer  
- Service Layer  
- Repository Layer  
- Spring Data JPA  
- MySQL Database Integration  

---

## 📋 Prerequisites

Make sure the following tools are installed:

- Node.js  
- Angular CLI  
- Java (JDK 17 or higher)  
- Maven  
- MySQL  

---


---
## 🔗 API Endpoints

### Song Management

| Method | Endpoint | Description |
|------|------|------|
| POST | `/songs` | Create a new song |
| GET | `/songs` | Get all songs |
| GET | `/songs/{id}` | Get a song by ID |
| PUT | `/songs/{id}` | Update an existing song |
| DELETE | `/songs/{id}` | Delete a song |

### Search & Filter

| Method | Endpoint | Description |
|------|------|------|
| GET | `/songs/search?artist=ArtistName&genre=GenreName` | Search songs by artist and genre |
| GET | `/songs/name/{name}` | Find songs by name |
| GET | `/songs/artist/{artist}` | Find songs by artist |
| GET | `/songs/genre/{genre}` | Find songs by genre |



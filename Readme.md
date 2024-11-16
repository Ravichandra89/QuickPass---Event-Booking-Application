# QuickPass---Event-Booking-Application

Welcome to the QuickPass project! This repository contains the source code and detailed instructions for building an online event management platform where users can search, book, and manage events, while event organizers can create and track their events, with admin oversight ensuring smooth operations.

## Table of Contents

- [Introduction](#introduction)
- [Project Setup](#project-setup)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Deployment](#deployment)

## Introduction

EventPass is designed to simplify event management by providing a seamless experience for users to discover and book events. Event organizers can easily create and manage their events, while admins ensure the platform runs efficiently.

## Project Setup

This section outlines the steps to set up the development environment and ensure all necessary tools are installed for the backend and frontend technologies used in this project.

## Features

### User Features
- **Search Events**: Easily find events based on various criteria.
- **Book Events**: Reserve spots for events of interest.
- **Manage Bookings**: View and manage booked events, including cancellations.
- **Profile Management**: Create and update user profiles for better event tracking.

### Event Organizer Features
- **Create Events**: Organizers can set up and publish new events.
- **View Applicants**: See users who have applied for events.
- **Profit Tracking**: Access insights into total profits from bookings.
- **Send Notifications**: Communicate with users regarding event updates.
- **Cancel Events**: Manage events by canceling them if necessary.

### Admin Features
- **Admin Panel Management**: Oversee all activities on the platform for a smooth user experience.

## Process 
<img width="420" alt="Screenshot 2024-10-15 at 3 04 38 PM" src="https://github.com/user-attachments/assets/cb6e247b-ad59-4913-a5ea-b44169821ecd">

## High-Level Design and Components
<img width="1710" alt="Screenshot 2024-10-15 at 3 06 18 PM" src="https://github.com/user-attachments/assets/4de4cf1b-66d7-4cdb-beca-879b30807fc7">

#### Components
<img width="1710" alt="Screenshot 2024-10-15 at 3 07 02 PM" src="https://github.com/user-attachments/assets/d41d156b-13f2-44ec-a1d1-3a0b19f18f95">


## Technologies Used

- **Frontend**: React, Tailwind CSS, TypeScript, NextJs
- **Backend**: Node.js, Express, Postgress, SQL
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Notifications**: WebSocket
- **Caching**: Redis Cache, RedisQueue
- **High Scalability & Availability**: Auto-Scalling, Master-Slave Database Architecture.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/eventpass.git
   ```
2. **Install Dependency**:
   ```bash
    npm install
   ```
3. **SetUp Enviornment Variables**
   - Create a .env file in the root directory and add your configuration settings.

4. **Start the Server**:
    ```bash
    npm run dev
    ```
## Deployment

Deploy the EventPass application on cloud platforms like AWS, Heroku, or DigitalOcean. 

### Steps:

1. **Set Up Environment**:
   - Create a project in your cloud provider.
   - Configure a MongoDB database (e.g., MongoDB Atlas).

2. **Prepare Application**:
   - Update environment variables in your cloud dashboard.
   - Ensure production settings are applied.

3. **Build Application**:
   ```bash
   npm run build

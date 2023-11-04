<img align=center src="https://github.com/zstenger93/Transcendence/blob/master/images/transcendence.webp">

<h1 align="center">📖 TRANSCENDENCE</h1>

<h2 align="center">A group project to create a fully functional website with front and backend.</br>It will be a single-page application</h2>

---

## Menu

[Docker Setup](#setup)

[DataBase](#database)

[Frontend](#frontend)

[Backend](#backend)

[Game](#game)

[Chat](#chat)

[Resources](#resources)

[MindMap](#mindmap)

[TODO](#todo)

[Modules Used](#modules)

---
## Setup

docker-compose.dev.yaml for development

- Services:

	- postgreSQL

	- frontend

	- backend

	- na

docker-compose.yaml for deployment


- Services:

	- transcendence

---

## DataBase

postgreSQL

---

## Frontend



---

## Backend



---

## Original Game

PONG

---

## Chat



---

## Resources

our braincells

---

## MindMap

<img align=center src="https://github.com/zstenger93/Transcendence/blob/master/images/sudo_transcEND.png">

---

## TODO

Done: :white_check_mark: Not done: :x:

Basic structure :white_check_mark:

Backend structure setup :x:

First mindmap :white_check_mark:

Docker files for services :x:

docker-compose.dev :x:

Hased passwords :x:

Using OAuth system from 42 :x:

Setting unique username :x:

Uploading an avatar for user :x:

Option to enable 2FA auth :x:

Friend list and their status :x:

User stats of wins, losses etc.. :x:

Match history from games :x:

User being able to create private, protected and public channels :x:

Be able to block and unblock other users :x:

Able to invite other users to play a game :x:

Accessing other users profile :x:

Playing live games on the site :x:

Matchmaking system :x:

Faithful to the original pong game :x:

Custom options for the game :x:

The game must be responsive :x:


## Modules

- Web
	- <u>Major module</u>: Use a framework as backend
	- <u>Minor module</u>: Use a front-end framework or toolkit
	- <u>Minor module</u>: Use a database for the backend
	- <u>Major module</u>: Store the score of a tournament in the Blockchain
- User Management
	- <u>Major module</u>: Standard user management, authentication, users across tournaments
	- <u>Major module</u>: Implementing a remote authentication
- Gameplay and User Experience
	- <u>Major module</u>: Remote players
	- <u>Major module</u>: Multiplayer (more than 2)
	- <u>Major module</u>: Add Another Game with User History and Matchmaking
	- <u>Minor module</u>: Game customization options
	- <u>Major module</u>: Live chat
- AI-Algo
	- <u>Major module</u>: Introduce an AI opponent
	- <u>Minor module</u>: User and game stats dashboard
- Cybersecurity
	- <u>Major module</u>: Implement WAF/ModSecurity with Hardened Configuration and HashiCorp Vault for Secrets Management
	- <u>Minor module</u>: GDPR Compliance Options with User Anonymization, Local Data Management, and Account Deletion
	- <u>Major module</u>: Implement Two-Factor Authentication (2FA) and JWT
- Devops
	- <u>Major module</u>: Infrastructure Setup for Log Management
	- <u>Minor module</u>: Monitoring system
	- <u>Major module</u>: Designing the Backend as Microservices
- Graphics
	- <u>Major module</u>: Use advanced 3D techniques
- Accessibility
	- <u>Minor module</u>: Support on all devices
	- <u>Minor module</u>: Expanding browser compatibility
	- <u>Minor module</u>: Multiple language support
	- <u>Minor module</u>: Add accessibility for visually impaired users
	- <u>Minor module</u>: Server-side rendering (SSR) integration
- Object Oriented
	- <u>Major module</u>: Replacing Basic Pong with Server-Side Pong and Implementing an API
	- <u>Major module</u>: Enabling Pong Gameplay via CLI against Web Users with API Integration
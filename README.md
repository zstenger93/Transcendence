<img align=center src="https://github.com/zstenger93/Transcendence/blob/master/images/transcendence.webp">

<h1 align="center">📖 TRANSCENDENCE</h1>

<h2 align="center">A group project to create a fully functional website with front and backend.</br>It will be a single-page application</h2>

---

## Menu

[MindMap](#mindmap)

[Setup](#setup)

[DataBase](#database)

[Frontend](#frontend)

[Backend](#backend)

[Game](#game)

[Chat](#chat)

[Resources](#resources)

[TODO](#todo)

[Modules Used](#modules_used)

---

## MindMap

<img align=center src="https://github.com/zstenger93/Transcendence/blob/master/images/sudo_transcEND.png">

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

- Microservices
	- Game
		- Normal mode
		- Mode with extra features
			- Balanced matchmaking
			- Optimized responsiveness
			- Gamplay statistics
			- Secure data storing
	- AI opponent
	- Acessibility features
		- More browser support
		- Multiple language support
	- Security tools
	- Chat
		- Direct messages
		- Access to profiles
		- Sending invite to play
		- Let players know who is next in line
	- Statistics
		- Win rate
		- Score
		- Match amount against players
		- etc

---

## Original Game

PONG

---

## Chat



---

## Resources

our braincells

---

## TODO

Done: :white_check_mark: Not done: :x:

Plan everything as a microservice :x:

Basic structure :white_check_mark:

Backend structure setup :x:

First mindmap :white_check_mark:

Docker files for services :x:

docker-compose.dev :x:

Hashed passwords :x:

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


## Modules Used

16 Major module

11 Minor module

- **Web**
	- *Major module*: Use a framework as backend :x:
	- *Minor module*: Use a front-end framework or toolkit :x:
	- *Minor module*: Use a database for the backend :x:
	- *Major module*: Store the score of a tournament in the Blockchain :x:
- **User Management**
	- *Major module*: Standard user management, authentication, users across tournaments :x:
	- *Major module*: Implementing a remote authentication :x:
- **Gameplay and User Experience**
	- *Major module*: Remote players :x:
	- *Major module*: Multiplayer (more than 2) :x:
	- *Major module*: Add Another Game with User History and Matchmaking :x:
	- *Minor module*: Game customization options :x:
	- *Major module*: Live chat :x:
- **AI-Algo**
	- *Major module*: Introduce an AI opponent :x:
	- *Minor module*: User and game stats dashboard :x:
- **Cybersecurity**
	- *Major module*: Implement WAF/ModSecurity with Hardened Configuration and HashiCorp Vault for Secrets Management :x:
	- *Minor module*: GDPR Compliance Options with User Anonymization, Local Data Management, and Account Deletion :x:
	- *Major module*: Implement Two-Factor Authentication (2FA) and JWT :x:
- **Devops**
	- *Major module*: Infrastructure Setup for Log Management :x:
	- *Minor module*: Monitoring system :x:
	- *Major module*: Designing the Backend as Microservices :x:
- **Graphics**
	- *Major module*: Use advanced 3D techniques :x:
- **Accessibility**
	- *Minor module*: Support on all devices :x:
	- *Minor module*: Expanding browser compatibility :x:
	- *Minor module*: Multiple language support :x:
	- *Minor module*: Add accessibility for visually impaired users :x:
	- *Minor module*: Server-side rendering (SSR) integration :x:
- **Object Oriented**
	- *Major module*: Replacing Basic Pong with Server-Side Pong and Implementing an API :x:
	- *Major module*: Enabling Pong Gameplay via CLI against Web Users with API Integration :x:
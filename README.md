<img align=center src="https://github.com/zstenger93/Transcendence/blob/master/images/transcendence.webp">

<h1 align="center">📖 TRANSCENDENCE</h1>

<h2 align="center">A group project to create a fully functional website with front and backend.</br>It will be a single-page application</h2>

---

# The current version deployed can be accessed by the following link (only frontend atm)

[TranscEND](https://zstenger93.github.io/Transcendence/)

---

## Menu

[MindMap](#mindmap)

[Setup](#setup)

[CI/CD Pipeline](#pipeline)

[DataBase](#database)

[Frontend](#frontend)

[Backend](#backend)

[Game](#game)

[Chat](#chat)

[Resources](#resources)

[TODO](#todo)

[Modules Used](#modules_used)

---

## [Github Project](https://github.com/users/zstenger93/projects/2)

## MindMap

<img align=center src="https://github.com/zstenger93/Transcendence/blob/master/images/sudo_transcEND.png">


## Git Flow

Master <--- :white_check_mark: --- Dev <--- :white_check_mark: --- Microservices <br/>
.....|............................................................| <br/>
.....|_______________ :x: ______________|

## [Microservices](https://www.youtube.com/watch?v=y8OnoxKotPQ)

## General Explanation

- Base of the project
	- PostgreSQL
	- Django backend
	- Rest for API to connect back and frontend
	- Frontend with React
- Backend
- Frontend
	- React

---
## Setup

- docker-compose.dev.yaml (later)

- docker-compose.yaml
	- backend
		- each microservice is an app
	- PostgreSQL database
	- frontend
		- React application
		- TailwindCss


- images (not customized yet for front and back)
	- Installs python and other required packages
	- Installs and sets venv
	- Installs django
	- Echoes the venv activation to bashrc
	- Copies the starting script to the image
	- Exposes the port
	- Entrypoint (not always, depends because some things wont work directly from dockerfile)
	- CMD to run

## Pipeline

- .github folder
	- workflows
		- workflow_name.yaml
- workflow jobs
	- testing
		- need to upload artifacts 
	- building
		- need to download the uploaded artifacts
		- ceraful with the correct path
	- deploying
		- in case of react project, in github settings directory should be changed to /doc instead of root

---

## DataBase

postgreSQL

---

## Frontend

React
Tailwind

- Multi language support
- Extra browser support
- Multiple device support
- Fullscreen mode for games except on IOS

- root / Login
	- Register with username email and password to the site
	- Login with your username and password
	- Login via 42 auth
- Home / Welcome
- Game & Watch
	- Pong
		- Original
		- AI Opponent
		- Multiplayer
		- Modded
		- 3D Pong
	- Future game
- Chat
	- Channels
	- Online
	- Image Sharing
- Profile
- About Us
- Logout

---

## Backend

- Microservices (kind of)
	- Authentication service
	- Game
		- Normal mode
		- Balanced matchmaking
		- Optimized responsiveness
		- Gamplay statistics
		- Secure data storing
	- Extra game
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

Sortof works now and you can play on one keyboard. Also AI mode has been implemented.

- Extra Pong versions implemented:
	- AI Pong
	- 3D Pong

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

Backend structure setup :white_check_mark:

First mindmap :white_check_mark:

Docker files for services :white_check_mark:

docker-compose.dev :x: :white_check_mark:

Hashed passwords :x:

Using OAuth system from 42 :white_check_mark:

CI/CD pipeline setup :white_check_mark:

Deploying to github pages :white_check_mark:

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
	- *Major module*: Use a framework as backend :white_check_mark:
	- *Minor module*: Use a front-end framework or toolkit :white_check_mark: :question:
	- *Minor module*: Use a database for the backend :white_check_mark:
	- *Major module*: Store the score of a tournament in the Blockchain :x:
- **User Management**
	- *Major module*: Standard user management, authentication, users across tournaments :x:
	- *Major module*: Implementing a remote authentication :white_check_mark:
- **Gameplay and User Experience**
	- *Major module*: Remote players :x:
	- *Major module*: Multiplayer (more than 2) :x:
	- *Major module*: Add Another Game with User History and Matchmaking :x:
	- *Minor module*: Game customization options :x:
	- *Major module*: Live chat :x:
- **AI-Algo**
	- *Major module*: Introduce an AI opponent :white_check_mark:
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
	- *Minor module*: Expanding browser compatibility :white_check_mark:
	- *Minor module*: Multiple language support :white_check_mark:
	- *Minor module*: Add accessibility for visually impaired users :x:
	- *Minor module*: Server-side rendering (SSR) integration :x:
- **Object Oriented**
	- *Major module*: Replacing Basic Pong with Server-Side Pong and Implementing an API :x:
	- *Major module*: Enabling Pong Gameplay via CLI against Web Users with API Integration :x:
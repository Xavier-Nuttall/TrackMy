# TrackMy

Requirements: 
* [Docker](https://www.docker.com/) - hosts the database
* [npm](https://www.npmjs.com/) -  installs dependencies/manages the packages
* [node](https://nodejs.org/en) - runs the services

Config file: backend/secrets/secrets.ini

* `db_port` - port for the database to run on
* `db_host` - ip of the database probably localhost
* `db_admin_user` - username for the database admin user
* `db_admin_password` - password for the database admin user
* `db_database` - database name trackmy

Launch Instructions: 

1. `npm run init-install` 
2. `npm run start`

Connect:

* `localhost:3000`
<details>
 <summary>User Stories</summary>
 
## Equipment Availability

As a gym member I want to be able to view the availability of sports equipment to ensure that the inventory has the equipment I need at the moment.

* Difficulty: 23

* **Won't Have**

## University Login

As a university student I want to be able to log in with my university account so I don’t have to keep track of another account

* Difficulty: 23-50

* **Should Have**

## Accessibility HTML

As a visually impaired gym member I want to be able to turn on notation so that I am able to use it.

* Difficulty: 8-23
* **Should Have**


## Colour and Style

As a user with photosensitivity, I want a color palette that isn't hard on the photoreceptors, so I can navigate the application comfortably without experiencing discomfort or strain on my eyes.

* Difficulty: 13
* **Must Have**

## Friends Tracking

As a gym member I want to know when my friends are in the gym so that I’m more motivated to go. 

* Difficulty: 89
* **Won't Have**

## Opt Out of Notifications

As a gym member, I want to be able to opt out of receiving notifications about the gym’s capacity so that the notifications don't interfere with my other work? 

* Difficulty: 3
* **Must Have**

## Core Member Tracking

As a gym member I want an app that tracks how many people are in the gym so I can make a schedule for which times are available. 

* Difficulty: 13
* **Must Have**

## Programme Attendance

As a staff member I want to be able to check programme engagement so I know which programmes are most popular

* Difficulty: 13
* **Won’t Have**

## Guest Access

As a university student I want to be able to use the app without creating an account so I can get a feel for if I want to sign up. 

* Difficulty: 3
* **Should Have**

## Reliability

As IT staff I want the system to be reliable so I don't have to waste my time fixing it. 

* Difficulty: 21
* **Should Have**

## Historical Records

As a Unipol staff member I want to be able to generate historical reports so I can estimate staffing requirements.

* Difficulty: 8
* **Should Have**

## Viewing Trends
As a gym member I want to be able to view trends in the amount of people present at the gym so that I can plan forward for suitable open gym times.

* Difficulty: 21
* **Should Have**

## Email Notifications
As a gym member I want to be able to receive notifications about the gym's capacity so I don’t have to keep checking the app.

* Difficulty: 13
* **Should Have**

## Live Updating Information
As a user I want to see information updates without refreshing so I know I’m not looking at out of date information.

* Difficulty: 21
* **Could Have**

## Secure Information Transport
As a user I want to know my personal information is sent securely over the net so other people don’t capture it.
* Difficulty: 8
* **Should Have**

## Website Scaling Multiple Sites
As a User I want to be able to access the site on multiple devices so I don’t have to rely on a single device to get capacity information.

* Difficulty: 13
* **Could Have**
</details>

<details>
<summary>Feasibility Study</summary>

## Technical -  Do we have enough expertise? YES

Each team member is an Undergraduate 300-level INFO Science student which means we all have experience programming to a high level. 
	
We’ve all used node.js before in previous papers, and we have all interacted with databases. Postgresql was the Database Management System used in the COMP101 so we all have experience working with Postgres.

**Xavier:**
* 10 Years of website building experience, Has experience working with docker containers, for managing databases, and has used GitHub for managing group projects. 

**Dianne:**
* Major in Data Science and minor in Software Engineering. Has experience with website building and coding from various papers offered over the course of this major. Has co-developed within a team in COSC202.

**Ben:**
* Major in Information Science. Have experience with code and website building through INFO papers at the University of Otago.

**Charlie:**
* Bachelor of Science Majoring in Computer Science and minoring in Mathematics and Information Science. Has experience building websites and using databases through papers at University as well as personal projects.

## Operational - Do we have the logistics to make it work? YES

Communication

* Our team will be using the Discord app for communication amongst each other, for use with discussion and planning.

Development Tools
* Our team is using a Github repository as a version control system in order to develop code.

Peer Programing 
* Our team will engage in peer programming sessions to collaborate and review code together, fostering knowledge sharing and code quality improvement.

Learning Tools
* If we run into knowledge gaps our group are able to use tutorials, search engines, AI and group meetups to fill these gaps

## Resources - Do we have the resources? YES


Node.js
* We plan to use node.js to host the server 

React
* We plan to use React for the front end as members have experience using the framework.

PostgreSQL
* PostgreSQL will be used for the database. All members have experience with using the software.

Microsoft sign-in
* For user authentication, we plan to use Microsoft sign-in. This is due to Otago University students having Microsoft accounts which can be used to sign in into the service using OAuth2.0 

VSCode
* The Text editor we will use for developing the project which has plugins for other features

Programming Languages
* Javascript, HTML, CSS

Chart.js
* This can be used to generate trend charts for our website



## Schedule - do we have enough time? YES

Expert estimation
* We have identified the level of difficulty of user stories and the appropriate amount of time needed for each sprint by using expert estimation approaches like Planning Poker. We have an estimated time for each milestone based on our prior projects' completion dates and experience.

Three sprints (3 milestones)
* We plan to use at least 3 sprints to create the basic prototype of the website

For Example:

Sprint 1: Back End Development
* 1 ½ weeks

Sprint 2: Front End Development
* 1 ½ weeks
	
Sprint 3: Cleanup and Finalisation
* 1 week 

We believe that we will be able to complete the project by the due dates due to our estimation and sprint plan.
</details>
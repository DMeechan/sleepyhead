# Sleepyhead

Sleepyhead helps improve your sleep quality by measuring how your environment affects your sleep (using factors like light, noise, air quality, and temperature) and giving personalised suggestions on how you can improve your environment to get better sleep.

Created in 12 hours for [Jisc IoT Hackathon](https://www.jisc.ac.uk/rd/get-involved/take-part-in-our-hackathon) in Glasgow.

## Getting Started

This project is split into two sections:

* `server` - a server which stores and serves data through a RESTful API
* `web` - a web app which fetches sleep data from the API server then displays it in a beautiful interface with graphs and sleep suggestions

Here's how to get a copy of the project up and running on your local machine for development and testing purposes.

See deployment for notes on how to deploy the project on a live system.	

### Prerequisites	

What things you need to install the software and how to install them	

- Install [Git](https://git-scm.com/)
- Install [Node.js](https://nodejs.org/en/) (Node 12 LTS is recommended)
- Have a [Postgres](https://www.postgresql.org/) database running locally or in the cloud (you'll need the credentials for it)

- Prerequisites for embedded devices... *(TODO)*

### Installing	

First off, download this repository to your machine by running this command in a Terminal window:

```bash
git clone https://github.com/DMeechan/Sleepyhead.git
```

Then enter the repository:

```bash
cd Sleepyhead
```

#### Running the backend server

Open the server folder:

```bash
cd server
```

Create a .env file:

```bash
cp .env.example .env
```

Open up the `.env` file and edit the database URL to point to your own Postgres database

Next, install depencencies:

```bash
npm install
```

Start a local development server:

```bash
npm run dev
```

Now visit `http://localhost:3000` to check that your API server works!


### Running the web frontend

In a new Terminal window (to keep your local backend running), open up the repository folder and then enter the web folder:

```bash
cd web
```

Install depencencies:

```bash
npm install
```

Start a local development server:

```bash
npm run start
```


### Running the embedded device

*TODO*


## Deployment	

We recommend deploying the backend to any cloud provider which supports Node.js applications and Postgres (like [Render](https://render.com/) or [Heroku](https://heroku.com/)).

And we recommend deploying the frontend to a cloud provider which supports static sites (like [Render](https://render.com/) or [Netlify](https://netlify.com/)).


### Deploying the backend server

Set up a Postgres database and then set up a Node.js application with the following settings:

Build command:

```bash
cd server && npm i
```

Start command:

```bash
cd server && npm start
```

Health check path (used by Render):

```bash
/health
```

> Don't forget to set the `DATABASE_URL` environment variable to point to your database in the cloud. 


### Deploying the frontend

You can deploy the React web app as a static site for free with providers like Netlify and Render. To do so, use these settings:

Build command:

```bash
cd web && npm && npm run build
```

Start command:

```bash
./web/build
```


## Built With	

* [Node.js](https://nodejs.org/en/) - Used to run the backend API server
* [TypeScript](https://www.typescriptlang.org/) - Used to write the backend server
* [React.js](https://reactjs.org/) - Used to build the web app
* [PostgreSQL](https://www.postgresql.org/) - The database used by the backend server to store data


## Authors

* **Adriana Cucu** - *Frontend* - [AdrianaCucu](https://github.com/AdrianaCucu)
* **Adam Binks** - *Frontend* - [adam-binks](https://github.com/adam-binks)
* **Daniel Meechan** - *Backend* - [DMeechan](https://github.com/DMeechan)
* **Ferdia McKeogh** - *Embedded* - [chocol4te](https://github.com/chocol4te)

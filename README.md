# How to Use #

## Pre requisite ##

Make sure you have Node.js and npm.

Then make sure you have a directory look like this:

```
VibeCheck-ManaloSingson/
  backend/
    index.js
    package.json
  frontend/
    index.html
    app.js
```
Go to the backend directory and install the necessary packages.
```bash
npm init -y
npm install express cors
```

### Run the backend ###

```bash
node backend/index.js
```

Expected terminal output:

```
VibeCheck API running at http://localhost:3000
```

### Run the frontend ###
 Open the index.html

## API endpoints ##

- GET /api/fortune -> returns { fortune: "..." }
- GET /api/joke -> returns { joke: "..." }
- GET /api/vibe?mood=happy|tired|stressed -> returns { mood, emoji, message }
- POST /api/smash -> increases a counter and returns { smashes: number }
- GET /api/smashes -> returns { smashes: number }
- GET /api/secret?code=411L

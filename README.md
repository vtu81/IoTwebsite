# README

This repository contains my final project for course *B/S Arch Software Design*.

## Quick Setup

First install dependency with:
```bash
# Under the root directory of the repository
npm install
cd server && npm install && cd ..
```

Start both the frontend and the backend concurrently (in development mode) with:
```bash
# Under the root directory of the repository
npm run whole
```

---

**If you are willing to setup the frontend and the backend respectively, check the content below.**

### Frontend

Start the frontend server (for debug) with

```bash
# Under the root directory of the repository
npm start
```

Generate static files with

```bash
# Under the root directory of the repository
npm run build
```

The default generate directory is `server/public`.

### Backend

Start the backend server with:

```bash
# Under the root directory of the repository
cd server
npm start # release
# or
npm run dev # debug
```


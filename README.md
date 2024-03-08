## Setup

1. Install npm dependencies with `npm install`
1. Install python dependencies with `poetry install`
1. Create `.env` file in package root with the following entries:

```
FLASK_APP=src/api
FLASK_ENV=dev
FLASK_DEBUG=1
```

1. For dev, open two windows and run the following two commands separately in them:
   1. `poetry run flask run`
   1. `npm run dev`
1. Browse to `http://localhost:3000` to view the page.

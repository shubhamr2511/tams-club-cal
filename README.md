# TAMS Club Calendar [WIP]

An unofficial calendar for the [Texas Academy of Mathematics and Science (TAMS)](https://tams.unt.edu/) student organizations.

[Here's the document](https://docs.google.com/document/d/1U_zqoEiplk0ODeGdMTzK1aLhz9OYFQV0FlhSI52VSBo) for all the ideas, planning, and other notes for this project.

## Contribution

There currently is no format for pull requests or issues, but if you would like to contribute, make a fork of the repo and create pull requests to resolve issues. I am currently actively working on this project and can review any pull requests that are made. 

## Setup

```bash
git clone https://github.com/MichaelZhao21/tams-club-cal.git
cd tams-club-cal/client && yarn install
cd ../server && yarn install
```

Create the config file at `client/src/files/config.json` (**For the `backend` field, don't put a `/` after**):

```json
{
    "backend": "[address that the backend server is hosted on (eg. http://localhost:5000)]"
}
```

If you would like to help develop the backend, email or message [MichaelZhao21](https://github.com/MichaelZhao21) to get access to the database. If you are just developing frontend, you can simply use `https://api.tams.club` as the backend address in the json file and only run the frontend (`client` folder). You will not need to do the following step if you are only developing frontend.

Create the environmental variable file at `server/.env`:

```.env
MONGO_USER="[Username for cluster]"
MONGO_PASS="[Password for cluster]"
```

## Execution

To run the client:

```bash
cd client
yarn start
```

To run the server:

```bash
cd server
yarn start
```

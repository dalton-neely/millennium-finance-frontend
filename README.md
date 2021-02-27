# Millennium Finance Frontend Server

## How To Run the Frontend
The front end uses the `create-react-app` server so `Node.js` and `NPM` are needed.
```bash
npm start
```
This will spin up a server at [localhost:300](http://localhost:3000/) where the home page of the application will be
sitting.

## How to Run with Docker
```bash
docker rm --force current-frontend && docker build --tag millennium-finance-frontend . && docker run --publish 3000:3000 --name current-frontend millennium-finance-frontend && docker logs current-frontend
```

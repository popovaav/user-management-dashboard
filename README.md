This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Make sure you have completed the following steps:

First, start the JSON server to create a mock database. Run the following commands:

```bash
cd server
json-server --watch db.json --port 3001
```
After that, open your web browser and go to http://localhost:3001/users to see the list of users used as a mock database.

Next, run the GraphQL server. Execute the following command:

```bash
cd server
nodemon server.js
```
Open http://localhost:4000/graphql in your web browser to see the result.

Finally, run the development server:

```bash
cd client && npm run dev
```

**Run tests**:

 ```bash
 cd client && npm test
 ```


Open http://localhost:3000 in your web browser to see the project's result.

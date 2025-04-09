import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import path from 'node:path';
import db from './config/connection.js';
import { authenticateToken } from './utils/auth.js';
import type { Request, Response } from 'express';
import { fileURLToPath } from 'node:url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();























// const app = express();
// const PORT = process.env.PORT || 3001;
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const startApolloServer = async () => {
//   await server.start();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use('/graphql', expressMiddleware(server as any,
//   {
//     context: authenticateToken as any
//   }
// ));

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));

//   app.get('*', (_req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//   });
// }

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.listen(PORT, () => {
//   console.log(`API server running on port ${PORT}!`);
//   console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
// });
// };

// startApolloServer();


// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
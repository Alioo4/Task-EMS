import 'dotenv/config';

export const config = {
  serverPort: process.env.PORT ? Number(process.env.PORT) : 4000,
  databaseUrl: process.env.DB_URL,
};

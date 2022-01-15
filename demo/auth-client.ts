import { Client } from '../src/client';

export default new Client({
  id: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET,
  redirectURI: 'http://localhost:3000/auth',
  scopes: ['identify', 'guilds']
});

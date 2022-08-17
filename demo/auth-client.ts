import { Client } from '../lib/client.js';

export const auth = new Client({
  id: `${process.env.CLIENT_ID || "773617743345483826"}`,
  secret: `${process.env.CLIENT_SECRET || "uRr2MkXLZhObJ30O6durf7aiROnAkJkb"}`,
  redirectURI: 'http://localhost:3000/auth',
  scopes: ['identify', 'guilds', 'guilds.join']
});
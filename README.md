# Esp Customs OAuth
Clonado de disco-oauth, pero con compatibilidad con TypeScript y menos errores

**Ejemplos completos**: [Demo](/tree/stable/demo), [Esp Customs](https://github.com/esp-customs)

## 1 - Instalar
`npm i -S @espcustomss/oauth`

[![NPM](https://nodei.co/npm/@espcustomss/oauth.png)](https://nodei.co/npm/@espcustomss/oauth/)

## 2 - Usar

```js
import { Client } from '@espcustomss/oauth';

export default new Client({
  id: '681799808276758533',
  secret: '<your_bot_secret>',
  redirectURI: 'http://localhost:3000/auth',
  scopes: ['identify', 'guilds']
});
...
const key = await client.getAccess('<code_from_discord>');
...
const user = await client.getUser(key); // { id: '...', username: '! BLD Gobi', ... }
const guilds = await client.getGuilds(key); // Collection<{ id: '...', name: 'ESP CUSTOMS', ... }>
```


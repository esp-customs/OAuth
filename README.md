## 📖 Introduction Esp Customs OAuth
Discord V13 Final (@discordjs/collection@0.7.0) todas las dependencias actualizadas!!
Maxima compatibilidad con TypeScript y errores corregidos
![](https://i.imgur.com/0lnboQ5.png)

**Ejemplos completos**: [Demo](/tree/stable/demo), [Esp Customs](https://github.com/esp-customs)

## 1 - 💻 Instalación
`npm i @espcustomss/oauth`

[![NPM](https://nodei.co/npm/@espcustomss/oauth.png)](https://nodei.co/npm/@espcustomss/oauth/)

## 2 - Modo de uso

```js
import { Client } from '@espcustomss/oauth';

export const auth = new Client({
  id: '<your_bot_id>',
  secret: '<your_bot_secret>',
  redirectURI: 'http://localhost:3000/auth',
  scopes: ['identify', 'guilds', 'guilds.join']
});
```
```js
import { auth } from ...

const key = await auth.getAccess('<code_from_discord>');
const user = await auth.getUser(key); // { id: '...', username: '! BLD Gobi', ... }
const guilds = await auth.getGuilds(key); // Collection<{ id: '...', name: 'ESP CUSTOMS', ... }>
```
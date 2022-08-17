## 📖 Introduction Esp Customs OAuth
Discord V13 Final (@discordjs/collection@0.7.0) todas las dependencias actualizadas!!
Maxima compatibilidad con TypeScript y errores corregidos
<style>
table th:first-of-type {
    width: 10%;
}
table th:nth-of-type(2) {
    width: 10%;
}
</style>
| ![DiscordJS](https://camo.githubusercontent.com/d55d8a7f07a103454ebb77b653d9600ce27e011f78395d9713b432c8c011c76a/68747470733a2f2f646973636f72642e6a732e6f72672f7374617469632f6c6f676f2e737667)| ![DiscordTS](https://discord-ts.js.org/discord-ts.svg) |
| :---        |    :----:   |

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
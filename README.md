# [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&size=40&pause=1000&color=5865F2&multiline=true&random=false&width=435&lines=Esp+Customs+OAuth)](#)

<p align="center"><a href="https://github.com/esp-customs/OAuth"><img src="https://i.imgur.com/0lnboQ5.png"></a></p>
<p align="center"><a href="https://nodei.co/npm/@espcustomss/oauth/"><img src="https://nodei.co/npm/@espcustomss/oauth.png"></a></p>
<p align="center"><img src="https://img.shields.io/npm/v/@espcustomss/oauth?style=for-the-badge"> <img src="https://img.shields.io/npm/dm/@espcustomss/oauth?style=for-the-badge"> <img src='https://img.shields.io/bundlephobia/minzip/@espcustomss/oauth?label=size&style=for-the-badge' alt='size' /> <img src="https://img.shields.io/npm/l/@espcustomss/oauth?style=for-the-badge"> <img src="https://img.shields.io/npm/dt/@espcustomss/oauth?style=for-the-badge"> <a href="https://discord.gg/cqrN3Eg" target="_blank"> <img alt="Discord" src="https://img.shields.io/badge/Support-Click%20here-7289d9?style=for-the-badge&logo=discord"> </a> </p>

## [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&pause=1000&color=F20000&random=false&width=435&lines=%E2%9D%94How+To+Install%3F)](#)

```console
npm i @espcustomss/oauth
```

# [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&pause=1000&&color=00EDFF&random=false&width=435&lines=%F0%9F%8E%AF+Describing)](#)

Esp Customs OAuth es una biblioteca diseñada para facilitar la integración de OAuth2 con Discord, permitiendo la autenticación, obtención de datos de usuario, servidores y conexiones de manera sencilla y eficiente.

## ✨Features

- 🔒 **Soporte completo para TypeScript** - Construido con TypeScript para una experiencia de desarrollo más robusta.
- 🚀 **Compatibilidad con las últimas versiones de Discord API** - Siempre actualizado con los últimos cambios de Discord.
- 🛠️ **Fácil de usar** - API intuitiva para desarrolladores de todos los niveles.
- 🌐 **Obtención de datos de usuario, servidores y conexiones** - Accede fácilmente a la información del usuario autenticado.
- 🔄 **Generación de enlaces de autorización** - Simplifica el proceso de autenticación OAuth2.

# 📦Examples

## **Configuración básica**

```typescript
import { Client } from '@espcustomss/oauth';

const auth = new Client({
  id: '<your_bot_id>',
  secret: '<your_bot_secret>',
  redirectURI: 'http://localhost:3000/auth',
  scopes: ['identify', 'guilds', 'connections']
});
```

## **Autenticación y obtención de datos**

```typescript
// Obtener el token de acceso
const key = await auth.getAccess('<code_from_discord>');

// Obtener datos del usuario
const user = await auth.getUser(key); 
console.log(user); // { id: '...', username: '...', ... }

// Obtener servidores del usuario
const guilds = await auth.getGuilds(key); 
console.log(guilds); // Collection<{ id: '...', name: '...', ... }>

// Obtener conexiones del usuario
const connections = await auth.getConnections(key); 
console.log(connections); // Collection<{ id: '...', name: '...', ... }>
```

## **Generar un enlace de autorización**

```typescript
const authLink = auth.authCodeLink.url;
console.log(`Visita este enlace para autenticarte: ${authLink}`);
```

# 🛠️API Documentation

Consulta la [documentación completa](https://oauth.srgobi.com) para más detalles sobre cómo usar esta biblioteca.

# 📝Contributing

¡Las contribuciones son bienvenidas! Si encuentras un error o tienes una idea para mejorar la biblioteca, no dudes en abrir un issue o enviar un pull request.

# 📄License

Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
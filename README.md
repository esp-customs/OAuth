# [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&size=40&pause=1000&color=5865F2&multiline=true&random=false&width=435&lines=Esp+Customs+OAuth)](#)

<p align="center"><a href="https://github.com/esp-customs/OAuth"><img src="https://i.imgur.com/0lnboQ5.png"></a></p>
<p align="center"><a href="https://nodei.co/npm/@espcustomss/oauth/"><img src="https://nodei.co/npm/@espcustomss/oauth.png"></a></p>
<p align="center"><img src="https://img.shields.io/npm/v/@espcustomss/oauth?style=for-the-badge"> <img src="https://img.shields.io/npm/dm/@espcustomss/oauth?style=for-the-badge"> <img src='https://img.shields.io/bundlephobia/minzip/@espcustomss/oauth?label=size&style=for-the-badge' alt='size' /> <img src="https://img.shields.io/npm/l/@espcustomss/oauth?style=for-the-badge"> <img src="https://img.shields.io/npm/dt/@espcustomss/oauth?style=for-the-badge"> <a href="https://discord.gg/cqrN3Eg" target="_blank"> <img alt="Discord" src="https://img.shields.io/badge/Support-Click%20here-7289d9?style=for-the-badge&logo=discord"> </a> </p>

## [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&pause=1000&color=F20000&random=false&width=435&lines=%E2%9D%94How+To+Install%3F)](#)

```console
npm i @espcustomss/oauth
```

# [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&pause=1000&&color=00EDFF&random=false&width=435&lines=%F0%9F%8E%AF+Describing)](#)

Esp Customs OAuth is a library designed to facilitate the integration of OAuth2 with Discord, allowing authentication, retrieval of user data, servers, and connections in a simple and efficient manner.

## ✨Features

- 🔒 **Full TypeScript Support** - Built with TypeScript for a more robust development experience.
- 🚀 **Compatibility with the Latest Discord API Versions** - Always up-to-date with the latest Discord changes.
- 🛠️ **Easy to Use** - Intuitive API for developers of all skill levels.
- 🌐 **Get User, Server, and Connection Data** - Easily access authenticated user information.
- 🔄 **Authorization Link Generation** - Simplifies the OAuth2 authentication process.

# 📦Examples

## **Basic Configuration**

```typescript
import { Client } from '@espcustomss/oauth';

const auth = new Client({
  id: '<your_bot_id>',
  secret: '<your_bot_secret>',
  redirectURI: 'http://localhost:3000/auth',
  scopes: ['identify', 'guilds', 'connections']
});
```

## **Authentication and Data Collection**

```typescript
// Get the access token
const key = await auth.getAccess('<code_from_discord>');

// Get user data
const user = await auth.getUser(key); 
console.log(user); // { id: '...', username: '...', ... }

// Get user servers
const guilds = await auth.getGuilds(key); 
console.log(guilds); // Collection<{ id: '...', name: '...', ... }>

// Get user connections
const connections = await auth.getConnections(key); 
console.log(connections); // Collection<{ id: '...', name: '...', ... }>
```

## **Generate an authorization link**

```typescript
const authLink = auth.authCodeLink.url;
console.log(`Visit this link to authenticate: ${authLink}`);
```

# 🛠️API Documentation

See the [full documentation](https://oauth.srgobi.com) for more details on how to use this library.

# 📝Contributing

Contributions are welcome! If you find a bug or have an idea for improving the library, feel free to open an issue or submit a pull request.

# 📄License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
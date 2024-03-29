import { config } from 'dotenv';
config({ path: 'demo/.env' });

import express from 'express';
import cookies from 'cookies';
import { auth } from './auth-client';

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(cookies.express(['I', 'store', 'login', 'sessions.']));

app.get('/', async (req, res) => {
  const key = req.cookies.get('key');

  res.render(`index`, {
    user: (key) ? await auth.getUser(key) : null,
    guilds: (key) ? await auth.getGuilds(key) : null
  });
});

// A DISCORD: discord.com/api/oauth2/authorize/...
app.get('/login', (req, res) => {
	res.redirect(auth.authCodeLink.url)
	console.dir(auth.authCodeLink.url)
});

// DESDE LA DISCORD: /auth?code=<access_token>
app.get('/auth', async (req, res) => {
  try {
    let code = req.query.code as string;
    const key = await auth.getAccess(code.toString());
    res
      .cookie('key', key)
      .redirect('/');
  } catch (error) {
    console.log(error);
  }
});

app.get('/logout', (req, res) => {
  res
    .clearCookie('key', undefined)
    .redirect('/');
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}.`));
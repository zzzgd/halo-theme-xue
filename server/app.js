const { setConfig } = require('next/config');
setConfig(require('../next.config'));
const routes = require('./routes');

const express = require('express');
const next = require('next');
const { Signale } = require('signale');

const dev = process.env.NODE_ENV !== 'production';

const port = process.env.PORT || 3000;
const app = next({ dev });

const handler = routes.getRequestHandler(app);

const handle = app.getRequestHandler();

const options = {
  scope: 'app server',
};
const signale = new Signale(options);

(async () => {
  await app.prepare();

  const server = express();

  server.use('/static', express.static('public/static'));

  server.use(handler);

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  signale.success(`<> Halo Blog ready on localhost:${port}`);
})();

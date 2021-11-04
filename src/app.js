const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const cwd = process.cwd();

  server.get('/test', (req, res) => {
    if (req.query.relative) {
      const testPath = path.join(cwd, 'cypress', req.query.relative);

      fs.createReadStream(testPath).pipe(res);
    } else {
      res.end('');
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

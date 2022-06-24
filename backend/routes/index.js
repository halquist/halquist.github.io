const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// static routes
// serve react build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  // serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // serve the frontend's index.html file at all other routes not starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

// add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

// routes all paths that start with /api to the api router
router.use('/api', apiRouter);



module.exports = router;

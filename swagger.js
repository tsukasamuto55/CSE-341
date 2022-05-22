const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Week 05 Personal Project',
    description: 'Music API',
  },
  host: 'cse341-music-playlist-api.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
     'endpointsFiles' only the root file where the route starts,
     such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//   require('./server.js'); // Your project's root file
// });
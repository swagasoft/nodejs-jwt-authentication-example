
require('./config/jwt_helper');
require('./models/db');


const cors = require('cors');
const routeController = require('./routes/route-controller');

 var express = require('express');
 var app = express();

 app.use(express.static('public'));

 app.use(express.json()); 

 app.use(cors());

const port = process.env.PORT || "5000"; 

// routes
app.use("/api", routeController );

app.listen(port, () => {
  console.log(`nodejs app server Listening to requests on http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const trustRoute = require('./routes/trust');

const app = express();
app.use(bodyParser.json());
app.use('/api/trust', trustRoute);

app.listen(4000, () => console.log("✅ Fabric REST API running on port 4000"));

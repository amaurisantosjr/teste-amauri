const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const rotaRoutes = require('./routes/rotaRoutes');


app.use(bodyParser.json());


app.use(cors());


app.use('/api', rotaRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

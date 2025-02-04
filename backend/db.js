const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',     
  password: 'root',    
  database: 'rotas'
});

connection.connect(err => {
  if (err) {
    console.error('Erro de conexão com o banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

module.exports = connection;

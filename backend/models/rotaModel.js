const connection = require('../db/connection');


const addRota = (origem, destino, valor, callback) => {
  const query = 'INSERT INTO rotas (origem, destino, valor) VALUES (?, ?, ?)';
  connection.query(query, [origem, destino, valor], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};


const getAllRotas = (callback) => {
  const query = 'SELECT * FROM rotas';
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para buscar a melhor rota entre dois pontos
const getMelhorRota = (origem, destino, callback) => {
  const query = `SELECT * FROM rotas WHERE origem = ? AND destino = ? ORDER BY valor ASC LIMIT 1`;
  connection.query(query, [origem, destino], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = {
  addRota,
  getAllRotas,
  getMelhorRota
};

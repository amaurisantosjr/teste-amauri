const db = require('../db');  
const dijkstra = require('dijkstrajs');  


const buildGraph = (rotas) => {
  const graph = {};
  rotas.forEach((rota) => {
    if (!graph[rota.origem]) graph[rota.origem] = {};
    if (!graph[rota.destino]) graph[rota.destino] = {};

 
    graph[rota.origem][rota.destino] = parseFloat(rota.valor);  
    graph[rota.destino][rota.origem] = parseFloat(rota.valor);  
  });
  return graph;
};


const calcularMelhorRota = (origem, destino, rotas) => {
  const graph = buildGraph(rotas);
  const caminho = dijkstra.find_path(graph, origem, destino);
  let custo = 0; 


  for (let i = 0; i < caminho.length - 1; i++) {
    const origem = caminho[i];
    const destino = caminho[i + 1];

   
    const valor = graph[origem][destino];
    if (!isNaN(valor)) {
      custo += valor;  
    }
  }

  return { caminho, custo };
};



exports.addRota = (req, res) => {
  const { origem, destino, valor } = req.body;
  const query = 'INSERT INTO rotas (origem, destino, valor) VALUES (?, ?, ?)';

  db.query(query, [origem, destino, valor], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar rota:', err);
      return res.status(500).send({ message: 'Erro ao adicionar rota' });
    }
    res.status(201).send({ message: 'Rota adicionada com sucesso' });
  });
};


exports.getAllRotas = (req, res) => {
  const query = 'SELECT * FROM rotas';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao listar rotas:', err);
      return res.status(500).send({ message: 'Erro ao listar rotas' });
    }
    res.status(200).send(results);
  });
};


exports.updateRota = (req, res) => {
  const { origem, destino, valor } = req.body;
  const id = req.params.id; 

  const queryUpdate = 'UPDATE rotas SET origem = ?, destino = ?, valor = ? WHERE id = ?';

  db.query(queryUpdate, [origem, destino, valor, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar rota:', err);
      return res.status(500).send({ message: 'Erro ao atualizar rota' });
    }


    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Rota não encontrada para atualização' });
    }

    res.status(200).send({ message: 'Rota atualizada com sucesso' });
  });
};


exports.deleteRota = (req, res) => {
  const id = req.params.id; 


  const queryDelete = 'DELETE FROM rotas WHERE id = ?';
  db.query(queryDelete, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar rota:', err);
      return res.status(500).send({ message: 'Erro ao deletar rota' });
    }


    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Rota não encontrada para exclusão' });
    }

    res.status(200).send({ message: 'Rota deletada com sucesso' });
  });
};


exports.getMelhorRota = (req, res) => {
  const { origem, destino } = req.params;

  const query = 'SELECT origem, destino, valor FROM rotas';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao consultar rotas:', err);
      return res.status(500).send({ message: 'Erro ao consultar rotas' });
    }

    const resultado = calcularMelhorRota(origem, destino, results);
    res.status(200).send({
      melhorRota: resultado.caminho.join(' - '),
      custo: resultado.custo
    });
  });
};

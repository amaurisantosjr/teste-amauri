const express = require('express');
const router = express.Router();
const rotaController = require('../controllers/rotaControllers');


router.post('/cadastrar-rota', rotaController.addRota);  
router.get('/rotas', rotaController.getAllRotas);       
router.put('/rotas/:id', rotaController.updateRota);
router.delete('/rotas/:id', rotaController.deleteRota);


router.get('/consultar-rota/:origem/:destino', rotaController.getMelhorRota);

module.exports = router;

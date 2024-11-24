const express = require('express');
const router = express.Router();
const discoController = require('../controllers/discoController');

router.get('/', discoController.listar);
router.post('/criar', discoController.criar);
router.post('/deletar/:id', discoController.deletar);

module.exports = router;

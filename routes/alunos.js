import express from 'express';
import UsuarioModel from '../models/usuario.js';
import UsuarioController from '../controllers/usersController.js'; // Ajuste o caminho conforme necessário

export default (sequelize) => {
    const router = express.Router();
    const Usuario = UsuarioModel(sequelize);
    

    // Rota para criar um novo usuário
    router.post('/', async (req, res) => {
        try {
            const usuario = await Usuario.create(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    // Rota para listar todos os usuários
    router.get('/', async (req, res) => {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    });

    // Rota para buscar um usuário pelo ID
    router.get('/:id', async (req, res) => {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });

    // Rota para atualizar um usuário pelo ID
    router.put('/:id', async (req, res) => {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            await usuario.update(req.body);
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });

    // Rota para deletar um usuário pelo ID
    router.delete('/:id', async (req, res) => {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            await usuario.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });

    // Rota para login
    router.post('/login', UsuarioController);

    return router;
};

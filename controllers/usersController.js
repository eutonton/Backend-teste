import UsuarioModel from '../models/usuario.js'; // Ajuste o caminho conforme necessário
import express from 'express';
import bcrypt from 'bcrypt'; // Para hash de senhas
import jwt from 'jsonwebtoken'; // Para gerar tokens

const UsuarioController = (sequelize) => {
    const router = express.Router();
    const Usuario = UsuarioModel(sequelize);

    // Função de login
    const loginUsuario = async (req, res) => {
        const { email, senha } = req.body;

        try {
            // Verifica se o usuário existe
            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }

            // Verifica a senha
            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            if (!senhaValida) {
                return res.status(401).json({ error: 'Senha incorreta' });
            }

            // Gera um token JWT
            const token = jwt.sign({ id: usuario.id }, 'seu_segredo_aqui', {
                expiresIn: '1h', // ou o tempo que você desejar
            });

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao autenticar' });
        }
    };

    // Rota para criar um novo usuário
    router.post('/', async (req, res) => {
        try {
            // Hash da senha antes de salvar
            const hashedPassword = await bcrypt.hash(req.body.senha, 10);
            const usuario = await Usuario.create({ ...req.body, senha: hashedPassword });
            res.status(201).json(usuario);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    });

    // Rota para login
    router.post('/login', loginUsuario);

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

    return router;
};

// Exporta a função de controlador
export default UsuarioController;

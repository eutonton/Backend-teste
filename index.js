import express from 'express';
import { Sequelize } from 'sequelize';
import alunoRoutes from './routes/alunos.js';
import cors from 'cors';

// Inicialize o app do Express
const app = express();

// Habilita CORS para todas as rotas
app.use(cors());

// Configurações do banco de dados
const sequelize = new Sequelize('teste', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
});

// Teste de conexão com o banco de dados
sequelize.authenticate()
    .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
        process.exit(1); // Saia do processo se a conexão falhar
    });

// Middlewares
app.use(express.json()); // Middleware para parsing de JSON

// Rotas
app.use('/alunos', alunoRoutes(sequelize)); // Use o roteador de alunos

// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

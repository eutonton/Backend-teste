import { DataTypes } from 'sequelize';

const Usuario = (sequelize) => {
    return sequelize.define('Usuario', {
        usuario_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo_usuario: {
            type: DataTypes.ENUM('aluno', 'professor', 'coordenador'),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: true, // Isso garante que as colunas createdAt e updatedAt sejam gerenciadas automaticamente
    });
};

export default Usuario;

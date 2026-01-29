import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class Log extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "Identificador único del log"
            },
            log: {
                type: DataTypes.STRING(255),
                allowNull: false,
                comment: "Mensaje o descripción del evento registrado"
            }
        }, {
            sequelize,
            tableName: 'log',
            timestamps: true, // Registra createdAt y updatedAt automáticamente para logs
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}

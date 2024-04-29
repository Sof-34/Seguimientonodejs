import mysql from 'mysql';

export default class DenunciasModel {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "denuncias",
        });
    }

    connect() {
        this.connection.connect();
    }

    closeConnection() {
        this.connection.end();
    }

    async getAllDenuncias() {
        const query = 'SELECT IDdenunciassegui, Tipodenuncia, Nombre, email, telefono, genero, descripcion FROM seguimientodenuncias';
            
        try {
            const results = await new Promise((resolve, reject) => {
                this.connection.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            
            return results;
        } catch (error) {
            throw error;
        }
    }
}


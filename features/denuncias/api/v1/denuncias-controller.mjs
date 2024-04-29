import express from 'express';
import DenunciasModel from './denuncias-model.mjs';

const { Router } = express;

export default class DenunciasController {
    #router = Router();
    #denunciasModel = new DenunciasModel();

    constructor() {
        this.registerRoutes();
    }

    getRouter() {
        return this.#router;
    }

    registerRoutes() {
        const routerV1 = Router();
        routerV1.get(`/denuncias`, async (req, res) => await this.getAllDenuncias(req, res));
        
        this.#router.use(`/v1`, routerV1);
    }

    async getAllDenuncias(req, res) {
        try {
            const denuncias = await this.#denunciasModel.getAllDenuncias();
            res.json(denuncias);
        } catch (error) {
            console.error(`error: ${error}`);
            res.status(500).send('Error interno del servidor');
        }
    }
}

import { Router } from 'express';
var trainerRouter = Router();

import {savePokemon,getPokemonsTrainer} from '../src/controllers/trainer/controller.js'


/**
 * @swagger
 * /api/trainer/save/{idtrainer}/{idpokemon}: 
 *   get:
 *     summary : When a trainer catches a pokemon
 *     parameters: 
 *          - name : idtrainer
 *            in : path
 *            description : Trainer Id 
 *            type: integer
 *            required: true
 *          - name : idpokemon
 *            in : path
 *            description : Pokemon Id
 *            type: integer
 *            required: true
 *     description: Get Pokemon by id 
 *     responses:
 *       200:
 *         description: Return json {result,data}
 */
trainerRouter.get('/save/:idtrainer/:idpokemon',savePokemon);

/**
 * @swagger
 * /api/trainer/{idtrainer}: 
 *   get:
 *     summary : Trainer's pokemons
 *     parameters: 
 *          - name : idtrainer
 *            in : path
 *            description : Trainer Id 
 *            type: integer
 *            required: true
 *     description: Get Trainer's Pokemon
 *     responses:
 *       200:
 *         description: Return an array of trainer's pokemons id
 */
trainerRouter.get('/:idtrainer',getPokemonsTrainer);

export default trainerRouter
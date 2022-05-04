import  pkg from "express"
import { Router } from 'express';
var pokemonRouter = Router();
const { Request, Response } = pkg;

import {getPokemon,getPokemonInFrench} from "../src/controllers/pokemon/controller.js"

/**
 * @swagger
 * /api/pokemon/{idpokemon}: 
 *   get:
 *     summary : Get a pokemon by id in french
 *     parameters: 
 *          - name : idpokemon
 *            in : path
 *            description : Pokemon Id
 *            type: integer
 *            required: true
 *     description: Get Pokemon by id 
 *     responses:
 *       200:
 *         description: Return json {name,abilities,moves,sprites,types}
 */
pokemonRouter.get("/:idpokemon",getPokemon)

/**
 * @swagger
 * /api/pokemon/{idPokemon}/french: 
 *   get:
 *     summary : Get a pokemon name and its description in french
 *     parameters: 
 *          - name : idPokemon
 *            in : path
 *            description : name french pokemon
 *            type: string
 *            required: true
 *     description: Get name french pokemon
 *     responses:
 *       200:
 *         description: Return array [nom,description,sprite]
 */
pokemonRouter.get("/:idPokemon/french",getPokemonInFrench)




export default pokemonRouter;
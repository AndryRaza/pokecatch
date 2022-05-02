import  pkg from "express"
import { Router } from 'express';

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

var swaggerRouter = Router();

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello World',
        version: '1.0.0',
      },
    },
    apis: ['./routes/*.js','index.js'], // files containing annotations as above
  };


swaggerRouter.use('/api-docs',swaggerUi.serve);
swaggerRouter.get('/api-docs',swaggerUi.setup(swaggerJsdoc(options)))


export default swaggerRouter;
import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

//Request Body: Criação ou atualização de um registro --> request.body
//Route Params: Identificar qual recurso eu quero atualizar ou deletar --> request.params
//Query params: Paginação, filtros, ordenação --> request.query
app.use(routes);
app.listen(3333);
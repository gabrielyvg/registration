import 'dotenv/config';
import express from 'express';
import UserController from './app/controllers/UserController';
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post('/users', UserController.store);

app.listen(3333, () => {
  console.log("Server running on localhost:3333");
});
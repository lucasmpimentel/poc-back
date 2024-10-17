import express from 'express';
import cors from 'cors';
import router from './routes';

const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})

import cors from 'cors';
import express from 'express';
import router from './controllers/router'

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router)

const PORT = 3001;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
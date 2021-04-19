import cors from 'cors';
import express from 'express';
import router from './routes/router';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
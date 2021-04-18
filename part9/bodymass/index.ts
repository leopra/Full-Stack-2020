import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import {calculateExercises } from "./exerciseCalculator"

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;
  if (!weight || !height) {
    res.send({
      error: "missing parameters",
    });
  }
  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    res.send({
      error: "malformatted parameters"
    });
  }
  const bmi = calculateBmi(Number(weight), Number(height));
  res.send({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //const { daily_exercises, target }: any = req.body;
  const body: any = req.body
  console.log(req.body)
  if (body.target && body.daily_exercises) {
    if (isNaN(Number(body.target)) || !Array.isArray(body.daily_exercises)) {
      return res.json({
        error: "malformatted parameters",
      });
    }
  }
  else if (!body.target || !body.daily_exercises) {
    return res.json({
      error: "parameters missing",
    });
  }
  const response = calculateExercises(body.daily_exercises, Number(body.target));
    console.log({ response });
    return res.json(response);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from 'express';
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack");
})

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;
  if (!weight || !height) {
    res.send({
      error: "missing parameters",
    });
  };
  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    res.send({
      error: "malformatted parameters"
    })
  };
  const bmi = calculateBmi(Number(weight), Number(height));
  res.send({ weight, height, bmi });
});

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
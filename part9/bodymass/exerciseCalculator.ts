
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number | undefined;
  ratingDescription: string | undefined;
  target: number;
  average: number;
}

export const calculateExercises = (
  exHours: number[],
  target: number
): Result => {
  const periodLength = exHours.length;
  const trainingDays = exHours.filter((exerciseHour) => exerciseHour > 0).length;
  const average = exHours.reduce((a, b) => a + b, 0) / exHours.length;
  const success = average >= target;
  let rating;
  let ratingDescription;
  if (average < target) {
    rating = 1;
    ratingDescription = `Bad Score`;
  } else if (target === average) {
    rating = 2;
    ratingDescription = `Goood`;
  } else if (average > target) {
    rating = 3;
    ratingDescription = `Excellent`;
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const a: Array<number> = JSON.parse(process.argv[2])
const b: number = Number(process.argv[3])

//console.log(calculateExercises([2,2,2,2,2,2,2], 3))
console.log(calculateExercises(a, b))
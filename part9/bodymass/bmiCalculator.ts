type WeightResult = 'Very severely underweight' | 'Severely underweight' | 'Underweight' | 'Normal (healthy weight)' | 'Overweight' |
  'Obese Class I (Moderately obese)' | 'Obese Class II (Severely obese)' | 'Obese Class III (Very severely obese)'| 'Error';

export const calculateBmi = (height: number, weight: number): WeightResult => {
  const res = weight / Math.pow(height / 100, 2);
  if (res < 15) {
    return 'Very severely underweight';
  } else if (res >= 15 && res < 16) {
    return 'Severely underweight';
  } else if (res >= 16 && res < 18.5) {
    return 'Underweight';
  } else if (res >= 18.5 && res < 25) {
    return 'Normal (healthy weight)';
  } else if (res >= 25 && res < 30) {
    return 'Overweight';
  } else if (res >= 30 && res < 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (res >= 35 && res < 40) {
    return 'Obese Class II (Severely obese)';
  } else if (res >= 40) {
    return 'Obese Class III (Very severely obese)';
  }
  return 'Error';

};


//const a: number = Number(process.argv[2])
//const b: number = Number(process.argv[3])
//Call the function in the same file with hard-coded parameters and print out the result. The code
//console.log(calculateres(a, b));
//should print the following message
//Normal (healthy weight)

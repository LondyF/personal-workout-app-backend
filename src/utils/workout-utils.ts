export const groupSetsPerExercise = (
  exercises: ExercisesWithSetsAndTargetMuscle
) => {
  return exercises.reduce((acc, curr) => {
    const excersieId = curr.exerciseId;
    const exerciseIndex = acc.findIndex((x) => x.exerciseId === excersieId);
    const { set, setId: _, ...restCur } = curr;

    exerciseIndex >= 0
      ? acc[exerciseIndex].sets.push(set)
      : acc.push({
          ...restCur,
          sets: [set],
        });

    return acc;
  }, []);
};

export const groupSetsPerMuscleGroup = (sets: any) => {
  return sets.reduce((acc, curr) => {
    const targetMuscle = curr.excersie.targetMuscle.name.toLowerCase();

    (acc[targetMuscle] = acc[targetMuscle] || []).push(curr);

    return acc;
  }, {});
};

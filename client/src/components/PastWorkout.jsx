var PastWorkout = (props) => (
  <div className="pastWorkoutOrFavorite">
    <p> <span className="dateAndTimeOrExercise">{props.date}</span> | <span>{props.lengthOfWorkout} minutes</span> </p>
  </div>
);


window.PastWorkout = PastWorkout;


var Favorite = (props) => (
  <div className="pastWorkoutOrFavorite">
    <span className="dateAndTimeOrExercise">{props.userFavorite}</span>
  </div>
);


window.Favorite = Favorite;

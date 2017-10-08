var Exercise = (props) => (
  <div className="exercise">
    <div className="exerciseDescription">
      <img className="exerciseImage" src={props.exercise.picture} />
      <p>
        <span className="exerciseName">{props.exercise.name}</span>
        <button onClick={ () => {props.favorite(props.exercise);} }>favorite</button>
      </p>
      {props.exercise.description}
    </div>
  </div>
);


window.Exercise = Exercise;

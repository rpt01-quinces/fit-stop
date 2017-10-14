class Exercise extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var style = {
      backgroundColor: this.props.userFavorites.includes(this.props.exercise.name) ? 'red' : null
    };

    return(
      <div className="exercise">
        <div className="exerciseDescription">
          <img className="exerciseImage" src={this.props.exercise.picture} />
          <p>
            <span className="exerciseName">{this.props.exercise.name}</span>
            <button style={style} onClick={ () => {this.props.favorite(this.props.exercise);} }>favorite</button>
          </p>
          {this.props.exercise.description}
        </div>
      </div>
    );
  }
}

window.Exercise = Exercise;

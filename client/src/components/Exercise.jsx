class Exercise extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var style = {
      opacity: this.props.userFavorites.includes(this.props.exercise.name) ? 1 : 0.5
    };

    return(
      <div className="exercise">
          <img className="exerciseImage" src={this.props.exercise.picture} />
          <p>
            <span className="exerciseName">{this.props.exercise.name}</span>
            <img src='/public/images/pizzafavor.png' className='pizzaFavor' style={style} onClick={ () => {this.props.favoriteOrUnfavorite(this.props.exercise);} } />
          </p>
          {this.props.exercise.description}
      </div>
    );
  }
}


window.Exercise = Exercise;

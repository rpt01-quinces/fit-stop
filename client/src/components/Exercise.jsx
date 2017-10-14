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
        <div className="exerciseDescription">
          <img className="exerciseImage" src={this.props.exercise.picture} />
          <p>
            <span className="exerciseName">{this.props.exercise.name}</span>
            <a href='#'>
              <img src='/public/images/pizzafavor.png' className='pizzafavor' style={style} onClick={ () => {this.props.favorite(this.props.exercise);} } />
            </a>
          </p>
          {this.props.exercise.description}
        </div>
      </div>
    );
  }
}

window.Exercise = Exercise;

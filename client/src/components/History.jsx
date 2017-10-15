class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHistory: true
    };
  }

  render() {
    return (
      <div className="history">
        <h2 className='historyHeader'> History </h2>
        <h2 className='favoritesHeader' onMouseOver={this.handleMouseOver.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}> Favorites </h2>

        {this.props.loggedIn && this.state.showHistory && this.props.workoutHistory.map(indivWorkout => <PastWorkout date={indivWorkout.date} lengthOfWorkout={indivWorkout.lengthOfWorkout} key={indivWorkout._id}/>)}

        {this.props.loggedIn && !this.state.showHistory && (<p>{this.props.userFavorites}</p>)}

        {!this.props.loggedIn && (<span className='historyNotLoggedIn'>You are not currently logged in. Please Log In or Sign Up to view Workout History.</span>)}
      </div>
    );
  }

  handleMouseOver() {
    this.setState({showHistory: false});
  }

  handleMouseLeave() {
    this.setState({showHistory: true});
  }
}


window.History = History;

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHistory: true
    };
  }

  render() {
    console.log(this.props.userFavorites, this.props.userFavorites.constructor);
    return (
      <div className="history">
        {this.props.loggedIn && (<h2 className='historyHeader'>History</h2>)}
        {this.props.loggedIn && (<h2 className='favoritesHeader' onClick={this.handleClick.bind(this)}>Favorites</h2>)}

        {this.props.loggedIn && this.state.showHistory && this.props.workoutHistory.map(
          workout => <PastWorkout date={workout.date} lengthOfWorkout={workout.lengthOfWorkout} key={workout._id} />
        )}

        {this.props.loggedIn && !this.state.showHistory && this.props.userFavorites.map(
          userFavorite => <Favorite userFavorite={userFavorite} />
        )}

        {!this.props.loggedIn && (
          <div className='noticeNotLoggedIn'>
            <p>You are currently not logged in.</p>
            <p>Please Log In or Sign Up to view Workout History and Favorited Exercises.</p>
          </div>
        )}
      </div>
    );
  }

  handleClick() {
    this.setState({showHistory: !this.state.showHistory});
  }
}


window.History = History;

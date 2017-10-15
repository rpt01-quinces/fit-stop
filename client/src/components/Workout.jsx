class Workout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warmupActive: false,
      workoutActive: false,
      cooldownActive: false,
      audioMuted: false
    }
    this.highlightActiveTitle.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  sets css on mount and updates with current exercise (triggered on timer() on App.js)
* * * * * * * * * * * * * * * * * * * * * * * * * *  * * * * * * * *  * * * * * * * * * * */

  componentDidMount() {
    this.highlightActiveTitle();
  }

  highlightActiveTitle() {
    if (this.props.exercise.type === 'warmup') {
      this.setState({warmupActive: true, workoutActive: false, cooldownActive: false});
    } else if (this.props.exercise.type === 'workout') {
      this.setState({warmupActive: false, workoutActive: true, cooldownActive: false});
    } else if (this.props.exercise.type === 'cooldown') {
      this.setState({warmupActive: false, workoutActive: false, cooldownActive: true});
    } else {
      console.log('workout type does not exist')
    }
  }

  toggleAudio() {
    console.log('toggling')
   this.setState({audioMuted: !this.state.audioMuted});
  }
/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Change css based on which exercise type
* * * * * * * * * * * * * * * * * * * * * * * * * * */

   render() {
    return (
      <div className="workout">
        <span className={'warmupTitle ' + (this.state.warmupActive ? 'activeTitle' : null)}>Warmup</span>
        <span className={'workoutTitle ' + (this.state.workoutActive ? 'activeTitle' : null)}>Workout</span>
        <span className={'cooldownTitle ' + (this.state.cooldownActive ? 'activeTitle' : null)}>Cooldown</span>

        <Timer timer= {this.props.timer} />
        <div className="exerciseDescription">
        <Exercise  exercise={this.props.exercise} userFavorites={this.props.userFavorites} toggleFavorite={this.props.toggleFavorite} />
        <ExerciseAudio
          source={`/public/audio/${this.props.exercise.name.replace(' ', '_')}.mp3`}
          muted={this.state.audioMuted}
          onToggle={this.toggleAudio}
        />
        </div>
        <button onClick={this.props.goToDashboard} className="blackButton">Quit & Back To Dashboard</button>
        <button onClick={this.props.goToSummary} className="blackButton">Summary</button>
      </div>
    );
  }

} // End of Class


window.Workout = Workout;


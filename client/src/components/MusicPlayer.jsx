const spotifyApi = new SpotifyWebApi;

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInToSpotify: false,
      user: this.props.user
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  componentDidMount() {
  }

  handleLoginClick() {
    window.location.href = '/hostLogin';
    this.props.handleLogin(this.props.user);
  }

  // playCurrentSong(deviceId, trackId) {
  //   spotifyApi.play({
  //     device_id: deviceId,
  //     uris: ['spotify:track:' + trackId]
  //   });
  // };

  // handlePlayButtonClick () {
  //   const trackId = this.state.songs[0].link.split('track/')[1];
  //   const songId = this.state.songs[0]._id;
  //   this.setState({currentSong: this.state.songs[0]});
  //   this.playCurrentSong(this.state.deviceId, trackId);
  //   this.removeSong(songId);
  // }

  render() {
    return (<div>
      {this.state.loggedInToSpotify ?
         <iframe src="https://open.spotify.com/embed?uri=spotify:track:54X78diSLoUDI3joC2bjMz" width="400" height="100" frameBorder="0" allowTransparency="true"></iframe>
        : <button onClick={this.handleLoginClick}>
        Log in to Spotify to Activate Player
        </button>
      }
    </div>)
  }
}


window.MusicPlayer = MusicPlayer;
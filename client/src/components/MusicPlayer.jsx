const spotifyApi = new SpotifyWebApi;

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // handleLoginClick() {
  //   window.location.href = '/hostLogin';
  // }

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
    return (<iframe src={"https://open.spotify.com/embed?uri=" + this.props.songId} width="400" height="100" frameBorder="0" allowTransparency="true"></iframe>)
  }
}


window.MusicPlayer = MusicPlayer;
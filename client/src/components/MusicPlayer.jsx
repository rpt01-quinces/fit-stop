class MusicPlayer extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedInToSpotify: false
    };
  }

  getSpotifyToken() {
    const getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g;
    let q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
      return hashParams;
    }

    const params = getHashParams();
    const access_token = params.access_token;
    const refresh_token = params.refresh_token;

    spotifyApi.setAccessToken(access_token);
    return access_token;
  }

  //get the active device for the host user who is signed in to Spotify
  getDeviceId() {
    spotifyApi.getMyDevices()
      .then((data) => {
        this.setState({deviceId : data.devices[0].id})
      }, (err) =>{
        console.error(err);
      });
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
      <button>Log in to Spotify to Activate Player</button>
    </div>)
  }
}


window.MusicPlayer = MusicPlayer;
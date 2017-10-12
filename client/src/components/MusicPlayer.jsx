const spotifyApi = new SpotifyWebApi;

var MusicPlayer = (props) => {

  return ( <iframe
    src={"https://open.spotify.com/embed?uri=" + props.albumId}
    width="400" height="100"
    frameBorder="0"
    allowTransparency="true">
    </iframe>)
}

window.MusicPlayer = MusicPlayer;

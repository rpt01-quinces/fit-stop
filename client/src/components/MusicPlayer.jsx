const spotifyApi = new SpotifyWebApi;

var MusicPlayer = (props) => {
  console.log(props.devices)
  return (
    <div>
      <iframe
      src={"https://open.spotify.com/embed?uri=" + props.albumId}
      width="400" height="100"
      frameBorder="0"
      allowTransparency="true">
      </iframe>
      <select>
      {props.devices.map((device) => {
        return <option value={device.name}>{device.name}</option>
      })}
      </select>
    </div>)

}

window.MusicPlayer = MusicPlayer;

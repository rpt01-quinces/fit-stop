const spotifyApi = new SpotifyWebApi;

var MusicPlayer = (props) => {

  var handleSelect = (e) => {
    props.handleDeviceSelect(e.target.value);
  }

  return (
    <div className='musicPlayer'>
      <iframe
      className='player'
      src={"https://open.spotify.com/embed?uri=" + props.albumId}
      width="275" height="80"
      frameBorder="0"
      allowTransparency="true">
      </iframe>
      <div className='devices'>
        <div className='currentDevice'>Current Device</div>
        <select onChange={handleSelect}>
        {props.devices.map((device) => {
          return <option value={device.id}>{device.name}</option>
        })}
        </select>
      </div>
    </div>)


}


window.MusicPlayer = MusicPlayer;

var MusicLoginButton = (props) => {
  return (
    <div>
      {!props.deviceFound && props.loggedIn &&
        <div className='deviceWarning'>No active devices found for current user. Make sure the Spotify app is open on at least 1 device
        </div>}
      <div className='musicButton' onClick={props.handleClick}>
          <div className='musicBtnText'>Log into Spotify to activate player</div>
      </div>
    </div>
  )
}

window.MusicLoginButton = MusicLoginButton;
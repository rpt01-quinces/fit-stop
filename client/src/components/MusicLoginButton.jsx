var MusicLoginButton = (props) => {

  return (
    <div className='musicButton' onClick={props.handleClick}>
        <div className='musicBtnText'>Log into Spotify to activate player</div>
    </div>
  )
}

window.MusicLoginButton = MusicLoginButton;
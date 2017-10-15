const ExerciseAudio = (props) => {
  return (
    <div className='exerciseAudio'>
      <div
        className='exerciseAudioBtn'
        onClick={props.onToggle}
      >Exercise Audio:{props.muted ? ' Off' : ' On'}</div>
      {!props.muted &&
        <audio
          autoPlay={!props.muted}
          src={props.source}
        ></audio>
      }
    </div>
    )
}


window.ExerciseAudio = ExerciseAudio;
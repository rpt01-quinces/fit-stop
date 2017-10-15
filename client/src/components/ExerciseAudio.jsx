const ExerciseAudio = (props) => {
  console.log(props.muted)
  return (
    <div className='exerciseAudio'>
      <div
        className='exerciseAudioBtn'
        onClick={props.onToggle}
      >Exercise Audio</div>
      {!props.muted && <audio
        autoPlay={!props.muted}
        src={props.source}
      ></audio>
      }

    </div>
    )
}


window.ExerciseAudio = ExerciseAudio;
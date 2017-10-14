const ExerciseAudio = (props) => {
  return (
    <div className='exerciseAudio'>
      <div className='exerciseAudioBtn'>Exercise Audio</div>
      <audio
        autoPlay
        controls='controls'
        src={props.source}
      ></audio>
    </div>
    )
}


window.ExerciseAudio = ExerciseAudio;
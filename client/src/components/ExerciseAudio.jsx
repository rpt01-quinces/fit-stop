const ExerciseAudio = (props) => {
  return (
    <div className='exerciseAudio'>
      <div className='exerciseAudioBtn'>Exercise Audio</div>
      <audio
        autoPlay
        src={props.source}
      ></audio>
    </div>
    )
}


window.ExerciseAudio = ExerciseAudio;
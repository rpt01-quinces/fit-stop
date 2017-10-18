const ExerciseAudio = (props) => {

  let style = {
    'background-color': props.muted ? 'white' : '#3b8fb5',
    'color': props.muted ? '#3b8fb5' : 'white'
  };

  return (
    <div className='exerciseAudio'>
      <div
        className='exerciseAudioBtn'
        onClick={props.onToggle}
        style={style}
      >Exercise Audio:{props.muted ? ' Off' : ' On'}</div>
      {!props.muted &&
        <audio
          autoPlay={!props.muted}
          src={props.source}
        ></audio>
      }
    </div>
  );
}

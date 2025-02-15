const VideoSlider = () => {
  return (
    <div className="w-full p-2 md:p-8">
      <video
        className="m-auto rounded-3xl shadow-2xl shadow-black"
        autoPlay
        muted
        controls
        loop
        preload="none"
      >
        <source src="video/videoCasamento.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoSlider;

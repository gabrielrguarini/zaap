const VideoSlider = () => {
  return (
    <div className="w-full p-2 md:p-8">
      <video
        className="m-auto rounded-3xl shadow-2xl shadow-black"
        autoPlay
        muted
        controls
      >
        <source src="/video/flower.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default VideoSlider;

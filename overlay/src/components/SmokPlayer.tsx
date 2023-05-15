import smokVideo from '../assets/smok.mp4';

const SmokPlayer = () => (
  <div className="absolute top-0 left-0 w-full h-full z-[-1]">
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      src={smokVideo}
    />
  </div>
);
export default SmokPlayer;

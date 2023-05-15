import {useState, useEffect} from 'react';
import teddyImg from '../assets/teddybear.png';
import {useSettingsStore} from '../store/settings';

export default function TeddyBear() {
  const [isVisible, setIsVisible] = useState(false);
  const showTeddy = useSettingsStore((state) => state.showTeddy);

  useEffect(() => {
    const waitTime = isVisible ? 60 * 1000 * 10 : 60 * 1000;
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
      console.log('Teddy Bear: ', isVisible, waitTime);
    }, waitTime);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div className={`max-w-[200px] ml-10 transition-all duration-1000 ${isVisible ? 'translate-x-[-150%]' : 'translate-x-[0px]'}`}>
      <img src={teddyImg} className={`${showTeddy ? 'opacity-100' : 'opacity-0'} transition-all duration-100`} alt="Some epic alt text lol" />
    </div>
  );
}

import {useState, useEffect} from 'react';
import teddyImg from '../assets/teddybear.png';
import styles from '../style/TeddyBear.module.scss';

export default function TeddyBear() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const waitTime = isVisible ? 60 * 1000 * 10 : 60 * 1000;
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, waitTime);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div className={`max-w-[200px] ml-10 transition-all duration-1000 ${isVisible ? 'translate-x-[-150%]' : 'translate-x-[0px]'}`}>
      <img src={teddyImg} alt="Teddy Bear" />
    </div>
  );
}

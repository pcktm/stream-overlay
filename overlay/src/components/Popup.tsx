import {useState, useEffect} from 'react';
import {useSettingsStore} from '../store/settings';
import {popupChannel} from '../utils/client';

export default function Popup() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState<string | null>();
  const [subtitle, setSubtitle] = useState<string | null>();
  useEffect(() => {
    const handler = (ev: {text: string}) => {
      console.log('popup', ev);
      setIsVisible(true);
      const parts = ev.text.split('|');
      if (parts.length === 1) {
        setName(parts[0].trim());
        setSubtitle(null);
      }
      if (parts.length === 2) {
        setName(parts[0].trim());
        setSubtitle(parts[1].trim());
      }
    };
    popupChannel.on('broadcast', {event: 'popup'}, handler as any);
    return () => {
      // eslint-disable-next-line no-underscore-dangle
      (popupChannel as any)._off('broadcast', {event: 'popup'});
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 8 * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [name, subtitle]);

  return (
    // eslint-disable-next-line max-len
    <div className={`mr-14 transition-all position-relative duration-1000 ${!isVisible ? 'translate-x-[200%] opacity-0 scale-[0.7]' : 'translate-x-[0px] opacity-1'}`}>
      <div className="flex flex-col justify-center items-end bg-black border-4 border-brand-green py-3 px-6 rounded-xl">
        <div className="text-3xl text-gray-100 font-bold">{name}</div>
        {subtitle && <div className="text-xl text-gray-100">{subtitle}</div>}
      </div>
    </div>
  );
}

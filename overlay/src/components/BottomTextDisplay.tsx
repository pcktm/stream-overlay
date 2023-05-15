import {useEffect, useState} from 'react';
import Balancer from 'react-wrap-balancer';
import {useSettingsStore} from '../store/settings';
import commonStyle from '../style/common.module.scss';

export default function BottomTextDisplay() {
  const text = useSettingsStore((state) => state.bottomText);
  const [visibleText, setVisibleText] = useState(text);

  useEffect(() => {
    if (text !== visibleText && text.length > 0) {
      setVisibleText(text);
    }
  }, [text, visibleText]);

  return (
  // eslint-disable-next-line max-len
    <div className={`transition-all duration-1000 mb-10 mx-14 ${text.length > 0 ? commonStyle.visible : commonStyle.hidden}`}>
      <div
        className={`py-6 px-6 bg-zinc-950 max-w-md rounded-xl ${commonStyle.glowbox}`}
      >
        <div className="w-100 h-100 overflow-hidden overflow break-words text-3xl text-center text-gray-100">
          <Balancer>{visibleText}</Balancer>
        </div>
      </div>
    </div>
  );
}

import {useEffect, useState} from 'react';
import {useSettingsStore} from '../store/settings';
import {supabase} from '../utils/client';
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
    <div className={`w-full flex justify-start flex-row transition-all duration-1000 mb-10 mx-14 ${text.length > 0 ? commonStyle.visible : commonStyle.hidden}`}>
      <div
        // eslint-disable-next-line max-len
        className={`text-3xl text-center py-6 px-8 bg-white max-w-lg break-words rounded-xl ${commonStyle.glowbox}`}
      >
        {visibleText}
      </div>
    </div>
  );
}

import {useEffect, useState} from 'react';
import Balancer from 'react-wrap-balancer';
import {useSettingsStore} from '../store/settings';
import commonStyle from '../style/common.module.scss';

export default function BottomTextDisplay() {
  const text = useSettingsStore((state) => state.bottomText);
  const [visibleText, setVisibleText] = useState(text);

  useEffect(() => {
    if (text !== visibleText && text.length > 0) {
      let newText = text.replace(/\n{2,}/g, '\n').replace(/\n$/, '');
      newText = newText.replace(/\n/g, ' \n ');
      setVisibleText(newText);
    }
  }, [text, visibleText]);

  return (
  // eslint-disable-next-line max-len
    <div className={`transition-all duration-1000 mb-16 mx-14 ${text.length > 0 ? commonStyle.visible : commonStyle.hidden}`}>
      <div
        className="py-6 px-6 bg-black bg-opacity-95 max-w-md rounded-xl"
      >
        <div className="w-100 h-100 overflow-hidden overflow break-words text-3xl text-center text-gray-100">
          <div className="flex flex-col justify-center items-center">
            {visibleText.split('\n').map((line, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="flex flex-row">
                <Balancer>{line.trim()}</Balancer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

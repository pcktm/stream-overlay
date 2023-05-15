import React, {useCallback, useEffect, useState} from 'react';
import Marquee from 'react-fast-marquee';
import {supabase} from '../utils/client';
import styles from '../style/common.module.scss';
import Hat from './Hat';
import {useSettingsStore} from '../store/settings';
import Scarf from './Scarf';
import Sparkles from './Sparkles';

interface IMessage {
  id: number;
  content: string;
  sender?: string;
}

const Message = ({message}: {message: IMessage}) => (
  <div className="flex flex-row items-center">
    <div className="text-lg text-gray-200">{message.content.trim()}</div>
    {message.sender && (
      <>
        <div className="text-lg text-gray-300 ml-2">-</div>
        <div className="ml-2 text-lg font-semibold text-gray-300">{message.sender.trim()}</div>
      </>
    )}
  </div>
);

const ServiceMessage = () => (
  <div className="flex flex-col">
    <div className="text-md text-gray-300 self-center">Chcesz kogoś pozdrowić?</div>
    <div className="text-md text-gray-300">
      Wyślij
      {' '}
      <span className="font-bold">SMS</span>
      {' '}
      na numer
      {' '}
      <span className="font-bold">513 717 393</span>
      !
    </div>
  </div>
);

const Divider = () => <div className="mx-4 text-lg text-gray-200">|</div>;

export default function BottomBar() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const usePolling = useSettingsStore((state) => state.usePolling);

  const fetchMessages = useCallback(async (limit = 10) => {
    const {data, error} = await supabase.from('messages').select('*').order('created_at').limit(limit);
    if (error) {
      console.log(error);
    } else {
      setMessages(data as IMessage[]);
    }
  }, [setMessages]);

  useEffect(() => {
    const channel = supabase
      .channel('table-db-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'messages',
      }, () => fetchMessages())
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [fetchMessages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, usePolling ? 10 * 1000 : 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchMessages, usePolling]);

  return (
    <div className={`relative w-full flex-1 mb-12 mx-14 transition-all duration-1000 ${messages.length > 0 ? styles.visible : styles.hidden}`}>
      <div
        className={`${styles.glowbox} w-full py-2 bg-zinc-950 rounded-xl overflow-hidden min-h-[4rem]`}
        style={{zIndex: 1}}
      >
        <Marquee
          gradient={false}
          speed={35}
          style={{
            margin: 0, padding: 0, overflow: 'hidden', whiteSpace: 'nowrap', position: 'absolute', zIndex: 2,
          }}
        >
          <ServiceMessage />
          {messages.length > 0 && <Divider />}
          {messages.map((message, index) => (
            <React.Fragment key={message.id}>
              <Message message={message} />
              <Divider />
            </React.Fragment>
          ))}
        </Marquee>
      </div>
      {/* <div className="absolute top-[-27px] left-[25px] rotate-[1deg]" style={{zIndex: 3}}>
        <Scarf className="h-28 z-10 w-28 drop-shadow-xl" fill="white" />
      </div>
      <div className="absolute bottom-[-28px] right-[-20px] [transform:scale(-1,-1)rotate(10deg)]" style={{zIndex: 3}}>
        <Sparkles className={`w-10 h-10 ${styles.glowdrop}`} fill="white" />
      </div> */}
    </div>
  );
}

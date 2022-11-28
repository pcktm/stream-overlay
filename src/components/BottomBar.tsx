import React, {useCallback, useEffect, useState} from 'react';
import Marquee from 'react-fast-marquee';
import {supabase} from '../utils/client';
import styles from '../style/colors.module.scss';
import Sparkles from './Sparkles';

interface IMessage {
  id: number;
  content: string;
  sender?: string;
}

const Message = ({message}: {message: IMessage}) => (
  <div className="flex flex-row items-center">
    <div className="text-lg text-gray-700">{message.content.trim()}</div>
    {message.sender && (
      <>
        <div className="text-lg text-gray-500 ml-2">-</div>
        <div className="ml-2 text-lg font-semibold text-gray-700">{message.sender.trim()}</div>
      </>
    )}
  </div>
);

const ServiceMessage = () => (
  <div className="flex flex-col">
    <div className="text-md text-gray-700 self-center">Chcesz kogoś pozdrowić?</div>
    <div className="text-md text-gray-700">
      Wyślij
      {' '}
      <span className="font-bold">SMS</span>
      {' '}
      na numer
      {' '}
      <span className="font-bold">794 531 752</span>
      !
    </div>
  </div>
);

const Divider = () => <div className="mx-4 text-lg text-gray-600">|</div>;

export default function BottomBar() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const fetchMessages = async (limit = 10) => {
    const {data, error} = await supabase.from('messages').select('*').order('created_at').limit(limit);
    if (error) {
      console.log(error);
    } else {
      setMessages(data);
    }
  };

  const handleTableEvent = useCallback((payload: any) => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('table-db-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'messages',
      }, (payload) => handleTableEvent(payload))
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="relative w-full flex-1 mb-12 mx-14 transition-opacity duration-1000" style={{opacity: messages.length > 0 ? 1 : 0}}>
      <div
        className={`${styles.glowbox} w-full py-2 bg-white rounded-xl overflow-hidden min-h-[4rem]`}
      >
        <Marquee
          gradient={false}
          speed={35}
          style={{
            margin: 0, padding: 0, overflow: 'hidden', whiteSpace: 'nowrap', position: 'absolute',
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
      <div className="absolute top-[-28px] left-[-20px] rotate-[-10deg]">
        <Sparkles className={`h-10 w-10 ${styles.glowdrop}`} fill="white" />
      </div>
      <div className="absolute bottom-[-28px] right-[-20px] [transform:scale(-1,-1)rotate(10deg)]">
        <Sparkles className={`h-10 w-10 ${styles.glowdrop}`} fill="white" />
      </div>
    </div>
  );
}

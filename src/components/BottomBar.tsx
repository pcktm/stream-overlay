import React, {useCallback, useEffect, useState} from 'react';
import Marquee from 'react-fast-marquee';
import {supabase} from '../utils/client';
import '../style/BottomBar.module.scss';

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
      <span className="font-bold">795 421 921</span>
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
    <div
      className="w-full bg-orange-100 py-2 mb-12 mx-14 overflow-hidden rounded-xl transition-opacity duration-1000 backdrop-blur-xg"
      style={{opacity: messages.length > 0 ? 0.9 : 0}}
    >
      <Marquee gradient={false} speed={50} style={{margin: 0, padding: 0}}>
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
  );
}

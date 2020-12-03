import { useEffect } from 'react';
import { io } from 'socket.io-client';

function useEvent<T>(event: string, cb: (data: T) => void): void {
  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL!);

    socket.on(event, (data: T) => {
      cb(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [event, cb]);
}

export default useEvent;

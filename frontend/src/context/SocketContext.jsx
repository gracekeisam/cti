import { createContext, useContext, useEffect, useState } from 'react';
import { socket, connectSocket, disconnectSocket } from '../services/socket';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    connectSocket();

    function onConnect() {
      setIsConnected(true);
      console.log('🔌 Socket connected');
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log('❌ Socket disconnected');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // If already connected
    if (socket.connected) {
      setIsConnected(true);
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      disconnectSocket();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used within a SocketProvider');
  return ctx;
}

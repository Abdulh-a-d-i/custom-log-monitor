import { useState, useEffect, useCallback } from 'react';

export const useWebSocket = (url) => {
    const [socket, setSocket] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('WebSocket Connected');
            setIsConnected(true);
        };

        ws.onclose = () => {
            console.log('WebSocket Disconnected');
            setIsConnected(false);
        };

        ws.onmessage = (event) => {
            setLastMessage(event);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [url]);

    const sendMessage = useCallback((message) => {
        if (socket && isConnected) {
            socket.send(JSON.stringify(message));
        }
    }, [socket, isConnected]);

    return { lastMessage, isConnected, sendMessage };
}; 
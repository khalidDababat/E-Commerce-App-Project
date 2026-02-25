import { useEffect, useState } from 'react';
import { socket } from '../socket';
import { getAllNotifications } from '../components/api/Notification';
import { Notification } from '../types';

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [count, setCount] = useState(0);

    const fetchNotifications = async () => {
        const data = await getAllNotifications();

        if (Array.isArray(data)) {
            setNotifications(data);
            const unreadCount = data.filter(
                (n: Notification) => !n.is_read
            ).length;
            setCount(unreadCount);
        }
    };

    useEffect(() => {
        fetchNotifications();
        socket.on('new-order', fetchNotifications);

        return () => {
            socket.off('new-order', fetchNotifications);
        };
    }, []);

    const handleMarkAsRead = (id: number) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
        );
        setCount((prev) => Math.max(0, prev - 1));
    };

    return {
        notifications,
        count,
        handleMarkAsRead,
    };
};

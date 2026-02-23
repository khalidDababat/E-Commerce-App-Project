import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '../../../utilities/FormatDateTime';
import { markNotificationAsRead } from '../../api/Notification';

export interface Notification {
    id: number;
    user_id: number;
    order_id: number;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface NotificationItemProps {
    message: Notification;
    title: string;
    onRead: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ message, title, onRead }) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        if (!message.is_read) {
            await markNotificationAsRead(message.id);
            onRead();
        }
        navigate(`/order/${message.order_id}`);
    }

    return (
        <div
            className={`notification-item ${!message.is_read ? 'unread' : ''}`}
            onClick={handleClick}
        >
            <div className="notification-item-header">
                <span className="notification-item-title">{title}</span>
                <span className="notification-item-time">
                    {formatTime(message.created_at)}
                </span>
            </div>
            <div className="notification-item-content">
                {message.message}
            </div>
        </div>
    );
};

export default NotificationItem;

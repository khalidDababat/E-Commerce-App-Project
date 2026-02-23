import React, { useState, useEffect } from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import './Notifications.scss';
import { socket } from "../../../socket";

import { getAllNotifications } from "../../api/Notification";
import NotificationItem, { Notification } from './NotificationItem';


const Notifications = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const data = await getAllNotifications();

            if (Array.isArray(data)) {
                setNotifications(data);
                const unreadCount = data.filter((n: Notification) => !n.is_read).length;
                setCount(unreadCount);
            }
        }
        fetchNotifications();

        const handelNewOrder = (data: any) => {
            setCount((prev) => prev + 1);
            setNotifications((prev) => [data, ...prev]);
        }

        socket.on("new-order", handelNewOrder);
        return () => {
            socket.off("new-order", handelNewOrder);
        }

    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleMarkAsRead = (id: number) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
        );
        setCount((prev) => Math.max(0, prev - 1));
    };

    return (

        <div className="notifications-conteaner">
            <IconButton size="large" onClick={toggleDropdown}>
                <Badge
                    badgeContent={count > 0 ? `+${count}` : null}
                    color="error"
                    className="notifications-badge"
                >
                    <NotificationsNoneIcon className="notifications-icon" />
                </Badge>
            </IconButton>

            {isOpen && (
                <div className="notifications-dropdown">
                    <div className="notifications-dropdown-header">
                        <h3>الإشعارات</h3>
                    </div>
                    <div className="notifications-dropdown-list">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <NotificationItem
                                    key={notif.id}
                                    message={notif}
                                    title={notif.title}
                                    onRead={() => handleMarkAsRead(notif.id)}
                                />
                            ))
                        ) : (
                            <div className="no-notifications">لا يوجد إشعارات جديدة</div>
                        )}
                    </div>
                </div>
            )}

        </div>

    );
};

export default Notifications;

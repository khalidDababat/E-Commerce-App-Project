import React, { useState } from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import './Notifications.scss';

import NotificationItem from './NotificationItem';
import { useNotifications } from '../../../hooks/useNotifications';

const Notifications = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { notifications, count, handleMarkAsRead } = useNotifications();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
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
                            <div className="no-notifications">
                                لا يوجد إشعارات جديدة
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;

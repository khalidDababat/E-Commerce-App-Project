import React, { useState, useEffect } from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import './Notifications.scss';
import { socket } from "../../../socket";

const Notifications = () => {


    const [count, setCount] = useState(0);

    useEffect(() => {

        const handelNewOrder = (data: unknown) => {
            console.log("🔔 New Order:", data);
            setCount((prev) => prev + 1);
        }

        socket.on("new-order", handelNewOrder);
        return () => {
            socket.off("new-order", handelNewOrder);
        }

    }, []);
    return (
        <IconButton size="small">
            <Badge
                badgeContent={`+${count}`}
                color="error"
                className="notifications-badge"
            >
                <NotificationsNoneIcon className="notifications-icon" />
            </Badge>
        </IconButton>
    );
};

export default Notifications;
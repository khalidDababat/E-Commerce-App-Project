
import express, { Request, Response } from 'express';
import { notificationStore } from '../module/notifications .js';

import { verifyAuthToken } from './verifyAuthToken.js';

const store = new notificationStore();

const index = async (req: Request, res: Response) => {
    try {
        const notifications = await store.index();
        res.json(notifications);
    } catch (error) {
        res.status(500).json(error);
    }
}

const unreadCount = async (req: Request, res: Response) => {
    try {
        const count = await store.unreadCount();
        res.json(count);
    } catch (error) {
        res.status(500).json(error);
    }
}
const markAsRead = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params['id']);
        await store.markAsRead(id);
        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json(error);
    }
}

const notificationRoutes = (app: express.Application) => {
    app.get('/notifications', verifyAuthToken, index);
    app.get('/notifications/unread', verifyAuthToken, unreadCount);
    app.put('/notifications/:id', verifyAuthToken, markAsRead);
}

export default notificationRoutes;



import express, { Request, Response } from 'express';

import { User, userStore } from '../module/Users.js';

import sgMail from '@sendgrid/mail';

import jwt from 'jsonwebtoken';
import { verifyAuthToken } from './verifyAuthToken.js';

import dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey(process.env['SENDGRID_API_KEY']!);

const store = new userStore();

//CRUD Operations
const index = async (_req: Request, res: Response) => {
    try {
        const Users = await store.index();
        res.json(Users);
    } catch (err) {
        res.status(400).json(err);
    }
};

const show = async (_req: Request, res: Response) => {
    const id = parseInt((_req.params['id'] as string) ?? '');
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user id' });
        return;
    }

    const User = await store.show(id);
    res.json(User); // Send To Client Front End
};

const create = async (req: Request, res: Response) => {
    try {
        const User: Omit<User, 'id'> = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
        };

        const newUser = await store.create(User);
        const tokenSecret = process.env['TOKEN_SECRET'];
        if (!tokenSecret) {
            throw new Error('TOKEN_SECRET environment variable is not set');
        }
        const token = jwt.sign({ user: newUser }, tokenSecret);

        res.json(token);
    } catch (err) {
        console.error(' Error creating user:', err);
        res.status(400);
        res.json(err);
    }
};

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        email: req.body.email,
        password: req.body.password,
    };

    try {
        const authenticatedUser = await store.authenticate(
            user.email!,
            user.password
        );

        if (!authenticatedUser) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const tokenSecret = process.env['TOKEN_SECRET'];
        if (!tokenSecret) {
            throw new Error('TOKEN_SECRET not set');
        }
        const token = jwt.sign({ user: authenticatedUser }, tokenSecret, {
            expiresIn: '1h',
        });
        res.json({ ...authenticatedUser, token });
    } catch (err) {
        res.status(401).json({ error: 'Authentication failed' });
        console.error('Authentication error:', err);
    }
};

const forgotPassword = async (req: Request, res: Response) => {
    const email = req.body.email;

    try {

        const token = await store.generateResetToken(email);

        if (token === null) {

            return res.json({ message: "Email not found" });

        }

        const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

        const msg = {
            to: email,
            from: process.env['EMAIL_FROM']!,
            subject: 'Reset Your Password',
            html: `
                <h3>Password Reset</h3>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">Reset Password </a>
                <p>This link will expire soon.</p>
            `,
        };

        await sgMail.send(msg);
        return res.json({ message: 'Reset link sent To Your Email', token: token });

    } catch (err) {
        console.error('Forgot password error:', err);
        return res.status(400).json({ error: 'Something went wrong' });
    }

}

const resetPassword = async (req: Request, res: Response) => {
    const token = req.params['token'] as string;
    const { password } = req.body;

    try {
        const success = await store.resetPassword(token, password);

        if (!success) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        return res.json({ message: 'Password updated successfully' });
    } catch (err) {
        return res.status(400).json({ error: 'Reset failed' });
    }
};


const usersRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
    app.post('/users/authenticate', authenticate);

    app.post('/users/forgot-password', forgotPassword);
    app.put('/users/reset-password/:token', resetPassword);
};

export default usersRoutes;

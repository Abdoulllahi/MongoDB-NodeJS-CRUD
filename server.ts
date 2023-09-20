/**
 * @ Author: Abdou Lahi DIOP
 * @ Create Time: 2023-09-17 09:07:11
 * @ Modified by: Abdou Lahi DIOP
 * @ Modified time: 2023-09-20 08:40:00
 * @ Description:
 */

import express, { json } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import departmentRouter from './routers/departments.router';
import employeeRouter from './routers/employees.router';

//init
dotenv.config();
const app = express();

// global config
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const accessLog = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

//Connection
(async function connectToMongoDB() {
    try {
        if (!MONGODB_URI) {
            console.log('DB URI is not defined in the environment variable');
            process.exit(1);
        }
        await mongoose.connect(MONGODB_URI);
        console.log('Successfully connected to the database');
    } catch (error) {
        console.log('Connection failed', error);
        setTimeout(connectToMongoDB, 5000);
    }
})();

//middlewares
app.use(morgan('combined', { stream: accessLog }));
app.use(morgan('dev'));
app.disable('x-powered-by');
app.use(json());

//routes
app.use('/departments', departmentRouter);
app.use('/employees', employeeRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
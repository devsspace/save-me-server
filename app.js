import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { handlePatients } from './controllers/consults.controller.js';
import consultRoutes from './routes/consults.js';
import donationRoutes from './routes/donations.js';
import donorsRoutes from './routes/donors.js';
import requestBloodRoutes from './routes/requestBlood.js';
import userRoutes from './routes/users.js';

const app = express();
const server = http.createServer(app);

dotenv.config();
app.use(express.json());
app.use(cors({ origin: true }));

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;

app.use('/user', userRoutes);
app.use('/donors', donorsRoutes);
app.use('/donation', donationRoutes);
app.use('/request-blood', requestBloodRoutes);
app.use('/consult', consultRoutes);



const io = new Server(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
  handlePatients(io, socket)
})


mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }))
    .catch(error => console.log(error.message));

mongoose.set('useFindAndModify', false);
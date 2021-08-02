import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import News from './models/News.model.js';
import donorsRoutes from './routes/donors.js';
import requestBloodRoutes from './routes/requestBlood.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({ origin: true }));

app.use('/user', userRoutes);
app.use('/donors', donorsRoutes);
app.use('/request-blood', requestBloodRoutes)


app.put('/:id', async (req, res) => {
    let news = await News.findById(req.params.id);
    news['title'] = req.body['title'];
    news['draft'] = req.body['draft'];
    news['published'] = req.body['published'];
    const updatedNews = await news.save();
    res.json({ updatedNews });
});

app.post('/', async (req, res) => {
    const news = new News(req.body);
    const createdNews = await news.save();
    // console.log({ createdNews });
    res.json({ createdNews });
});

app.get('/', async (req, res) => {
    // console.log({ createdNews });
    res.json({ message: "It works" });
})

app.use((error, req, res, next) => {
    res.status(403).json({
        name: error.name || "Internel Server Error",
        message: error.message || " Something went wrong",
        error: "Error Occured"
    })
});


const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }))
    .catch(error => console.log(error.message));

mongoose.set('useFindAndModify', false);

import cards from './dbCards.mjs';
import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
//App Config

const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:admin6577@cluster0.v2wrd.mongodb.net/tinderdb?retryWrites=true&w=majority';


//Middlewares
app.use(express.json());
app.use(cors());
//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
//API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello clever programmer'));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    });
});

app.get('/tinder/cards', (req, res) => {
    cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
});
//Listener

app.listen(port, () => console.log(`listening on localhost: ${port}`));
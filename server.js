const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const h_router = require('./router/h_list_router');
const cors = require('cors');
const message_route = require('./router/message');
const attractions_router = require('./router/mobile/attraction/attractions');
require('dotenv').config();
const FindJob = require('./router/mobile/find_job/find_job');

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const mongooseUrl = "mongodb+srv://lovenaing386:lovenaing386@my-dashboard.fquqg.mongodb.net/?retryWrites=true&w=majority&appName=my-dashboard"

mongoose.connect(mongooseUrl).then(() => {
    app.listen(PORT, () => {
        console.log('Server is runing on ' + PORT);
    })
    console.log('Mongoose Database is connected')
})

app.use(h_router);
app.use(message_route);
app.use(attractions_router);
app.use(FindJob);
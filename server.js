const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 5000;
const h_router = require('./router/h_list_router');
const cors = require('cors');

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
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const postsRouter = require('./routes/postsRouter');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' }));
app.use(
	express.urlencoded({
		limit: '50mb',
		extended: true,
		parameterLimit: 50000,
	})
);
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))


connectDB();

app.get('/', (req, res) => {
    res.status(200).json({message: 'This API is working!!!'})
})

app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`Server is runngin on port ${PORT}`);
})
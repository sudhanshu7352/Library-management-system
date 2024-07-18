const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require("./routes/userRoutes")
const bookRoutes = require('./routes/bookRoutes');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

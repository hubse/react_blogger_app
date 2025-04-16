const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const logger = require('./Middlewares/logger');

app.use(cors());
app.use(logger);
app.use(express.json());

// Swagger API docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test MongoDB connection
console.log('Attempting MongoDB connection...');
mongoose.connect(process.env.MONGO_URI, { 
    dbName: process.env.MONGO_DB_NAME || 'blog-app',
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => {
        console.error('MongoDB connection failed');
        console.error('Error details:', err.message);
        console.log('Using MONGO_URI:', process.env.MONGO_URI ? 'configured' : 'not configured');
    });

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Base route
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        database: 'disabled for testing'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

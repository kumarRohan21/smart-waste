const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Static uploads for dev
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

// Routes
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');
const uploadRoutes = require('./routes/upload');
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/upload', uploadRoutes);

// Connect DB & start
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
    console.log('Mongo connected');
    const port = process.env.PORT || 5000;
    app.listen(port, ()=>console.log('Server listening on', port));
  }).catch(err=>console.error('DB connect error', err));

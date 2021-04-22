const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');



const app = express();




// Connect Database
connectDB();


// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/events', require('./routes/events'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/invite', require('./routes/invite'));

// app.use('/allcontacts', require('./routes/contacts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
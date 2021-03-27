const express = require('express');
const connectDB = require('./config/connectDB');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => 
   res.json({msg: 'Welcome to the Contact Keeper API...'})
   );

   app.use('/api/users', require('./routes/api/users'));
   app.use('/api/auth', require('./routes/api/auth'));
   app.use('/api/profile', require('./routes/api/profileRoutes'));

   const PORT = process.env.PORT || 5000;
   
   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

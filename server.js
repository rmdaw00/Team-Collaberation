const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

app.post('/upload',(req,res)=>{
  if(req.files === null){
    return res.status(400).json({msg:'No file upload'});
  }

  //if there is a request from a file the we will pull it
  const file= req.files.file;

  //take a file as oject and move it to the path that is given in parenthesis
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err=>{
    if(err){
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({fileName: file.name, filePath:`/uploads/${file.name}`});
  });
})

// const app = express();


// Connect Database
connectDB();


// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/todoGroups', require('./routes/todoGroupRoutes'));
app.use('/api/todoTasks', require('./routes/todoTaskRoutes'));
app.use('/api/report', require('./routes/reportRoute'))
app.use('/api/messages', require('./routes/messageRoute'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/events', require('./routes/events'));

app.use('/api/notes', require('./routes/noteRoute'));
app.use('/api/setting', require('./routes/settingRoute'));

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
import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import users from './routes/users';
import auth from './routes/auth';
import upload from './routes/upload';
import projects from './routes/projects';
import details from './routes/details';
import files from './routes/files';
import profile from './routes/profile';

const CLIENT_DIR = path.join(__dirname, '/../client/build');
console.log('client directory:', CLIENT_DIR);

let app = express();

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/upload', upload);
app.use('/api/profile', profile);
app.use('/api/projects', projects);
app.use('/api/details', details);
app.use('/api/files', files);

if (fs.existsSync(CLIENT_DIR)) {
  app.use(express.static(CLIENT_DIR));
  app.get('/', function (req, res) {
    res.sendFile(path.join(CLIENT_DIR, 'index.html'));
  });
} else {
  console.log('client build directory does not exit');
}

app.listen(8000, function(){
 	console.log('Running on LocalHost: 8000');
});

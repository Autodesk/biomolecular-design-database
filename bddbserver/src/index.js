import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import users from './routes/users';
import auth from './routes/auth';
import upload from './routes/upload';
import projects from './routes/projects';
import details from './routes/details';
import files from './routes/files';

let app = express();

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/upload', upload);
app.use('/api/projects', projects);
app.use('/api/details', details);
app.use('/api/files', files);

app.listen(8000, function(){
 	console.log('Running on LocalHost: 8000');
});


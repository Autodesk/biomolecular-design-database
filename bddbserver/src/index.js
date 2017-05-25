import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import users from './routes/users';
import auth from './routes/auth';
import upload from './routes/upload';

let app = express();

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/upload', upload);


app.listen(8000, function(){
 	console.log('Running on LocalHost: 8000');
});


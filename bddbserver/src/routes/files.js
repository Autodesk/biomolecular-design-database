import express from 'express';
import Files from '../models/files';
import AWS from 'aws-sdk';
import mime from 'mime-types';
import jwt from 'jsonwebtoken';
import config from '../config';
import multer from 'multer';

let router = express.Router();

var s3 = new AWS.S3();
var bucketName = 'bionano-bdd-app';
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});


function getSignedUrl(files){
	const signed = files.map((file) => {
		var signedLinksArray = [];
		file.file_name = file.file_link;
		const type = mime.lookup(file.file_link);
		var keyName = file.file_link;
		var params = {Bucket: bucketName, Key: keyName, Expires: 2400}
		s3.getSignedUrl('getObject', params, (err, url) => {
			file.file_link = url;
		});
//		console.log("getting signed url");
//		var params3 = {Bucket: bucketName, Key: 'allFiles/2/test1.png', Expires: 2400}
//		s3.getSignedUrl('getObject', params3, (err, url) => {
//			console.log(url);
//		});
		//get signed url for links_array
		if(file.links_array){
			var newLinksArray = file.links_array.map((link) => {
			
				var params1 = {Bucket: bucketName, Key: link, Expires: 2400}
				s3.getSignedUrl('getObject', params1, (err, url) => {
					console.log(url);
					signedLinksArray.push(url);
					return url;
				});
			});
		}
		console.log(signedLinksArray);
		file.links_array = signedLinksArray;
		file.type = type;
		return file;
	});
	return signed;
}

function getSignedUrlForSingleFile(file){
	var keyName = file.file_link;
	var params = {Bucket: bucketName, Key: keyName, Expires: 2400}
	
	s3.getSignedUrl('getObject', params, (err, url) => {
		file.file_link = url;
	});
	
	return file.file_link;
}

router.get('/', (req, res) => {
	const _projectId = req.query.projectId;
	
	Files.forge().where({project_id: _projectId, deleted: false}).orderBy('id', 'ASC').fetchAll()
		.then(resData=> {
			res.status(200).json({error: false, data: getSignedUrl(resData.toJSON())});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
});

router.put('/file/', (req, res) => {
	const authorizationHeader = req.headers['authorization'];
	let token;
	if(authorizationHeader) {
		token = authorizationHeader.split(' ')[1]; //authorization header: 'Bearer <token>' 
													//split and take the index 1 to access token
	}
	if(token){
		jwt.verify(token, config.jwtSecret, (err, decode) => {
			if(err) {
				res.status(401).json({ error: 'Failed to authenticate'})
			} else {
				Files.where({id: req.body.id, user_id: decode.id})
				.save({ title: req.body.title,
					description: req.body.details,
					tags: req.body.tags
				 }, {patch: true})
				.then(resData=> {
					res.status(200).json({error: false});
				})
				.catch(err => {res.status(500).json({error: true})
				});
			}
		});
	} 
	else{
		res.status(403).json({	error: 'No token provided' 	});
	}
});

router.get('/file/getUrl/', (req, res) => {
	console.log(req.query);
	var keyName = req.query.saveLink;
	var params = {Bucket: bucketName, Key: keyName, Expires: 9400}
	s3.getSignedUrl('getObject', params, (err, url) => {
		console.log(url);
		res.status(200).json({error: false, signedUrl: url });
	});
});

router.post('/document/', upload.single('file'), (req, res) => {
	console.log(req.file);
	console.log(req.body.saveLink);
	var _url = '';
	var params = {
		Bucket: bucketName,
      	Key: req.body.saveLink, 
      	Body: req.file.buffer
	}
	s3.putObject(params, (err, data) => {
		if(data) {
			res.send({error: false, saveLink: params.Key});
		}
		else{ res.send({error: true}); }
	});
});

router.get('/file/', (req, res) => {
	const fileId = req.query.fileId;
	Files.forge().where({id: fileId, deleted: false}).fetch()
	.then(resData=> {
		const signedUrl = getSignedUrlForSingleFile(resData.toJSON());
		console.log(signedUrl);
		res.send({error: false, url: signedUrl })
	});
});

router.post('/file/', (req, res) =>{
	console.log(req.body);
	const authorizationHeader = req.headers['authorization'];
	let token;

	if(authorizationHeader) {
		token = authorizationHeader.split(' ')[1]; //authorization header: 'Bearer <token>' 
													//split and take the index 1 to access token
	}

	if(token){
		jwt.verify(token, config.jwtSecret, (err, decode) => {
			if(err) {
				res.status(401).json({ error: 'Failed to authenticate'})
			} else {
				console.log(decode);
				Files.forge({
					user_id: decode.id,
					project_id: req.body.project_id,
					title: req.body.title,
					tags: req.body.tags,
					file_link: req.body.file_path_s3,
					description: req.body.details,
					deleted: false
				}, { hasTimestamps: true }).save()
				.then(resData=> {
					res.status(200).json({error: false});
				})
				.catch(err => {res.status(500).json({error: true})
				});
			}
		});
	} 

	else{
		res.status(403).json({	error: 'No token provided' 	});
	}
});

router.delete('/document/', (req, res) => {
	console.log('deleting doc');
	console.log(req.query);
	 var params = {
	  	Bucket: bucketName, 
	  	Key: req.query.pathOnS3
	 };
	 s3.deleteObject(params, function(err, data) {
	   	if (err) res.send({error: true}); // an error occurred
	   	else     res.send({error: false, data: data});           // successful response
	 });
});

router.delete('/file/', (req, res) => {
	var file_id = req.query.file_id;
	const authorizationHeader = req.headers['authorization'];
	let token;
	console.log(req.query);
	if(authorizationHeader) {
		token = authorizationHeader.split(' ')[1]; //authorization header: 'Bearer <token>' 
													//split and take the index 1 to access token
	}

	if(token){
		jwt.verify(token, config.jwtSecret, (err, decode) => {
			if(err) {
				res.status(401).json({ error: 'Failed to authenticate'})
			} else {
				console.log(decode);
				Files.where({id: file_id}).where({user_id: decode.id}).save({ deleted: true }, {patch: true}); //update the project appreciations in database
				res.json({success: true});
			}
		});
	} 

	else{
		res.status(403).json({	error: 'No token provided' 	});
	}
});



export default router;
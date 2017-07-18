import express from 'express';
import Files from '../models/files';
import AWS from 'aws-sdk';
import mime from 'mime-types';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

var s3 = new AWS.S3();
var bucketName = 'bionano-bdd-app';

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
	
	Files.forge().where({project_id: _projectId}).orderBy('id', 'ASC').fetchAll()
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
				console.log(decode);
				Files.where({id: req.body.id}).where({user_id: decode.id})
				.save({ title: req.body.title,
					description: req.body.details
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

router.get('/file/', (req, res) => {
	const fileId = req.query.fileId;
	
	Files.forge().where({id: fileId}).fetch()
	.then(resData=> {
		const signedUrl = getSignedUrlForSingleFile(resData.toJSON());
		console.log(signedUrl);
		res.status(200).json({error: false, url: signedUrl })
	});
});

router.post('/', (req, res) =>{

});


export default router;
import express from 'express';
import Files from '../models/files';
import AWS from 'aws-sdk';
import mime from 'mime-types';

let router = express.Router();

var s3 = new AWS.S3();
var bucketName = 'bionano-bdd-app';

function getSignedUrl(files){
	const signed = files.map((file) => {
		file.file_name = file.file_link;
		const type = mime.lookup(file.file_link);
		var keyName = file.file_link;
		var params = {Bucket: bucketName, Key: keyName, Expires: 600}
		s3.getSignedUrl('getObject', params, (err, url) => {
			file.file_link = url;
		});
		file.type = type;
		return file;
	});
	return signed;
}

function getSignedUrlForSingleFile(file){
	var keyName = file.file_link;
	var params = {Bucket: bucketName, Key: keyName, Expires: 600}
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
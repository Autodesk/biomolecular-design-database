import Appreciations from '../models/appreciations';
import express from 'express';
import Projects from '../models/projects';
import AWS from 'aws-sdk';


var s3 = new AWS.S3();
let router = express.Router();
var bucketName = 'bionano-bdd-app';

function getSignedUrl(projects){
	const signed = projects.map((project) => {

		var keyName = project.header_image_link;
		var params = {Bucket: bucketName, Key: keyName, Expires: 1800}
		s3.getSignedUrl('getObject', params, (err, url) => {
			project.header_image_link = url;
		});
		if(project.hero_image !== null){
			var keyName1 = project.hero_image;
			var params1 = {Bucket: bucketName, Key: keyName1, Expires: 1800}
			s3.getSignedUrl('getObject', params1, (err, url) => {
				project.hero_image = url;
			});
		}
		return project;
	});
	return signed;
}


router.get('/published/', (req, res) => {
	Projects.where({ user_id: req.query.user_id, published: true}).fetchAll()
	.then(resData => { 
		res.status(200).json({publishedProjects: getSignedUrl(resData.toJSON())})
	})
	.catch(err => res.status(500).json({error: err}))
});

router.get('/drafts/', (req, res) =>{
	Projects.where({ user_id: req.query.user_id, published: false}).fetchAll()
	.then(resData => { 
		res.status(200).json({drafts: getSignedUrl(resData.toJSON())})
	})
	.catch(err => res.status(500).json({error: err}))
});


export default router;
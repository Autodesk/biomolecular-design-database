import Appreciations from '../models/appreciations';
import express from 'express';
import Projects from '../models/projects';
import AWS from 'aws-sdk';
import commaSplit from 'comma-split';

var s3 = new AWS.S3();
let router = express.Router();
var bucketName = 'biomolecular-design-database-development';

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

function nameSearch(project, search){
	if(project.name.toLowerCase().indexOf(search) !== -1){
		return true;
	}
	return false;
}

function keywordsSearch(project, search){
	if(project.keywords.toString().toLowerCase().indexOf(search) !== -1){
		return true;
	}
	return false;
}

function authorsSearch(project, search){
	if(project.authors.toString().toLowerCase().indexOf(search) !== -1){
		return true;
	}
	return false;
}

function applySearch(projects, search){
	var resData = [];
	var projectLen = projects.length;
	if(search){
		search = search.toLowerCase();
		var wordsArr = commaSplit(search);
		var wordsArrLen = wordsArr.length;
		for(var j = 0; j < projectLen; j++){
			var toAppend = true;
			for(var k = 0; k < wordsArrLen; k++){
				if(!nameSearch(projects[j], wordsArr[k]) && !keywordsSearch(projects[j], wordsArr[k]) && !authorsSearch(projects[j], wordsArr[k])) { 
					toAppend = false;
					break;
				}
			}
			if(toAppend){
				resData.push(projects[j]);
			}
		}
		return resData;
	}
	return projects;
}

router.get('/published/', (req, res) => {
	var search = req.query.search;
	var userId = req.query.user_id;
	if(search){
		Projects.where({ deleted: false, user_id: userId, published: true}).fetchAll()
		.then(resData=> {
			var resProjects = applySearch(resData.toJSON(), search);
			res.status(200).json({error: false, data: getSignedUrl(resProjects)});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}
	else{
		Projects.where({ user_id: req.query.user_id, published: true, deleted: false}).fetchAll()
		.then(resData => { 
			res.status(200).json({publishedProjects: getSignedUrl(resData.toJSON())})
		})
		.catch(err => res.status(500).json({error: err}))
	}
});

router.get('/drafts/', (req, res) =>{
	var search = req.query.search;
	var userId = req.query.user_id;
	if(search){
		Projects.where({ deleted: 'false', user_id: userId, published: false}).fetchAll()
		.then(resData=> {
			var resProjects = applySearch(resData.toJSON(), search);
			res.status(200).json({error: false, data: getSignedUrl(resProjects)});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}
	else{
		Projects.where({ user_id: req.query.user_id, published: false, deleted: 'false'}).fetchAll()
		.then(resData => { 
			res.status(200).json({drafts: getSignedUrl(resData.toJSON())})
		})
		.catch(err => res.status(500).json({error: err}))
	}
});


export default router;

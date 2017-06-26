import express from 'express';
import Projects from '../models/projects';
import AWS from 'aws-sdk';
import commaSplit from 'comma-split';
import Comments from '../models/comments';

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

function singleSignedUrl(project){
	var keyName = project.header_image_link;
	var params = {Bucket: bucketName, Key: keyName, Expires: 3600}
	s3.getSignedUrl('getObject', params, (err, url) => {
		project.header_image_link = url;
	});
	if(project.hero_image !== null){
		var keyName1 = project.hero_image;
		var params1 = {Bucket: bucketName, Key: keyName1, Expires: 3600}
		s3.getSignedUrl('getObject', params1, (err, url) => {
			project.hero_image = url;
		});
	}
	return project;
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

function applyFilters(reqQuery, projects){
	var resData = [];
	var projectLen = projects.length;
	if(reqQuery.filter){
		var filtersLen = Number(reqQuery.filtersLen);
		if(filtersLen === 1){
			var filter = reqQuery.filter.toLowerCase();
			for(var i = 0; i < projectLen; i++){ 
				if(projects[i].keywords.toString().toLowerCase().indexOf(filter) !== -1){
					resData.push(projects[i]); 
				}
			} 
		} 
		else{ //list of filters in reqQuery.filter[] 
			for(var j = 0; j < projectLen; j++){
				var toAdd = true;
				for(var k = 0; k < filtersLen; k++){ 
					if(projects[j].keywords.toString().toLowerCase().indexOf(reqQuery.filter[k].toLowerCase()) === -1){
						toAdd = false;
						break;
					}
				}
				if(toAdd){
					resData.push(projects[j]);
				}
			}
		}	
		return resData;	
	}
	return projects;
}

router.get('/', (req, res) => { //get all projects 
	const search = req.query.search;
	const sortby = req.query.sortby;   
	const from = req.query.from;
	var to = req.query.to;

	if(sortby === 'Most Viewed'){ 
		Projects.forge().where({ published: 'true'}).orderBy('views', 'DESC').fetchAll()
		.then(resData=> {
			var resProjects = applySearch(applyFilters(req.query, resData.toJSON()), search).slice(from, to);
			res.status(200).json({error: false, data: getSignedUrl(resProjects)});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}
	else if( sortby === 'Quality of Documentation') {
		Projects.forge().where({ published: 'true'}).orderBy('quality_of_documentation', 'DESC').fetchAll()
		.then(resData=> {
			var resProjects = applySearch(applyFilters(req.query, resData.toJSON()), search).slice(from, to);
			res.status(200).json({error: false, data: getSignedUrl(resProjects)});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}
	else if(sortby === 'Most Appreciations'){
		Projects.forge().where({ published: 'true'}).orderBy('likes', 'DESC').fetchAll()
		.then(resData=> {
			var resProjects = applySearch(applyFilters(req.query, resData.toJSON()), search).slice(from, to);
			res.status(200).json({error: false, data: getSignedUrl(resProjects)});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}	
	else{ //return Newest
		Projects.forge().where({ published: 'true'}).orderBy('created_at', 'DESC').fetchAll()
		.then(resData=> {
			var resProjects = applySearch(applyFilters(req.query, resData.toJSON()), search).slice(from, to);
			res.status(200).json({error: false, data: getSignedUrl(resProjects)});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}
});

router.get('/project/', (req, res) => {
	Projects.where({id: req.query.projectId}).fetch()
		.then(resData=> {
			console.log(resData);
			var resProject =  resData.toJSON();
			res.status(200).json({error: false, data: singleSignedUrl(resProject)});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
});

router.get('/comments/', (req, res) => {
	var _projectId = req.query.projectId;
	Comments.query({
		where: { project_id: _projectId }
	}).fetchAll().then(comments => {
		console.log(comments.toJSON());
		var commentsArr = comments.toJSON();
		res.json({ commentsArr });
	});
});
/*

router.post('/', (req, res) =>{
	const user_id = req.body.userId;
	const project_id = req.body.projectId;
	var _projectAppreciations = req.body.projectAppreciations + 1;
	Projects.where({id: project_id}).save({ likes: _projectAppreciations }, {patch: true}); //update the project appreciations in database

	Appreciations.forge({ 
		user_id,
		project_id
	}, { hasTimestamps: true }).save()
	.then(appreciation => {
		res.status(200).json({error: false, success: true})
	})
	.catch(err => console.log(err));
});
*/

router.post('/comments/', (req, res) => {
	const user_id = req.body.user_id;
	const project_id = req.body.project_id;
	const user_firstname = req.body.user_firstname;
	const user_lastname = req.body.user_lastName;
	const username = req.body.username;
	const comment = req.body.comment;
	
	Comments.forge({ 
		user_id,
		project_id,
		username,
		user_firstname,
		user_lastname,
		comment
	}, { hasTimestamps: true }).save()
	.then(comment => {
		res.status(200).json({error: false, success: true})
	})
	.catch(err => console.log(err));
});

export default router;
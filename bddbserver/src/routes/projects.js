import express from 'express';
import Projects from '../models/projects';
import AWS from 'aws-sdk';

var s3 = new AWS.S3();
let router = express.Router();
var bucketName = 'bionano-bdd-app';

function getSignedUrl(projects){
	const signed = projects.map((project) => {
		var keyName = project.header_image_link;
		var params = {Bucket: bucketName, Key: keyName, Expires: 86400}
		s3.getSignedUrl('getObject', params, (err, url) => {
			project.header_image_link = url;
		});
		return project;
	});
	return signed;
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
				for(var k = 0; k < filtersLen; k++){ 
					if(projects[j].keywords.toString().toLowerCase().indexOf(reqQuery.filter[k].toLowerCase()) !== -1){
						resData.push(projects[j]);
						break;
					}
				}
			}
		}	
		return resData;	
	}
	return projects;
}

router.get('/', (req, res) => { //get all projects 
	const sortby = req.query.sortby;   
	const from = req.query.from;
	var to = req.query.to;
	console.log(req.query);
	Projects.fetchAll()
	.then(resData => {
		if(resData.toJSON().length < to){ to = resData.toJSON().length }
	})
	.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
	});

	if(sortby === 'Most Viewed'){ 
		Projects.forge().orderBy('views', 'DESC').fetchAll()
		.then(resData=> {
			var resProjects = applyFilters(req.query, resData.toJSON());
			res.status(200).json({error: false, data: getSignedUrl(resProjects.slice(from, to))});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}
	else if( sortby === 'Quality of Documentation') {
		Projects.forge().orderBy('quality_of_documentation', 'DESC').fetchAll()
		.then(resData=> {
			var resProjects = applyFilters(req.query, resData.toJSON());
			res.status(200).json({error: false, data: getSignedUrl(resProjects.slice(from, to))});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}
	else if(sortby === 'Most Appreciations'){
		Projects.forge().orderBy('likes', 'DESC').fetchAll()
		.then(resData=> {
			var resProjects = applyFilters(req.query, resData.toJSON());
			res.status(200).json({error: false, data: getSignedUrl(resProjects.slice(from, to))});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}
	else{ //return Newest
		Projects.forge().orderBy('created_at', 'DESC').fetchAll()
		.then(resData=> {
			//console.log(resData.models);
			var resProjects = applyFilters(req.query, resData.toJSON());
			res.status(200).json({error: false, data: getSignedUrl(resProjects.slice(from, to))});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}
})


export default router;
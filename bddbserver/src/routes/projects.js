import express from 'express';
import Projects from '../models/projects';

let router = express.Router();


router.get('/', (req, res) => { //get all projects 

	const sortby = req.query.sortby;
	console.log(sortby);

	if(sortby === 'Most Viewed'){
		Projects.forge().orderBy('views', 'DESC').fetchAll()
		.then(resData=> {
			//console.log(resData.models);
			res.status(200).json({error: false, data: resData.toJSON()});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}

	else if( sortby === 'Quality of Documentation') {
		Projects.forge().orderBy('quality_of_documentation', 'DESC').fetchAll()
		.then(resData=> {
			//console.log(resData.models);
			res.status(200).json({error: false, data: resData.toJSON()});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}

	else if(sortby === 'Most Appreciations'){
		Projects.forge().orderBy('likes', 'DESC').fetchAll()
		.then(resData=> {
			//console.log(resData.models);
			res.status(200).json({error: false, data: resData.toJSON()});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}

	else{ //return Newest
		Projects.forge().orderBy('created_at', 'DESC').fetchAll()
		.then(resData=> {
			//console.log(resData.models);
			res.status(200).json({error: false, data: resData.toJSON()});
		})
		.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
		});
	}
})


export default router;
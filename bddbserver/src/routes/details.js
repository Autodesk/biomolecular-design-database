import Appreciations from '../models/appreciations';
import express from 'express';
import Projects from '../models/projects';

let router = express.Router();

router.get('/', (req, res) => {
	//check if the user has already appreciated the project 
	var _userId = req.query.userId;
	var _projectId = req.query.projectId;
	Appreciations.where({user_id: _userId}).where({project_id: _projectId}).fetch().then((appreciation) => {
		res.status(200).json({error: false, data: appreciation});
	})
	.catch(err => {res.status(500).json({error: true, data: {message: err.message}})
	});
});

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


export default router;
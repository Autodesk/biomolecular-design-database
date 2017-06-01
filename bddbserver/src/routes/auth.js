import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import Projects from '../models/projects';

let router = express.Router();

router.post('/', (req, res) => {
	/*const user_id= 4;
		const		name= 'Flat 2D Origami of Autodesk A Logo';
		const		authors= 'Joseph Schaeffer, Aaron Berliner';
		const		keywords= 'Autodesk, 2D Origami, DNA, AFM';
		const		views= 0;
		const		likes= 0;
		const		quality_of_documentation= 0;
		const		header_image_link='linkToAwss3/bucket/file';
		const		user_rights= ' to be updated';
	Projects.forge({
				user_id,
				name,
				authors,
				keywords,
				views,
				likes,
				quality_of_documentation,
				header_image_link,
				user_rights

			}, { hasTimestamps: true }).save() //save returns 'promise' so we can use then/catch
			.then(project =>  console.log(project)) //All GOOD
			.catch(err => console.log(err));
*/

	const { username, password } =req.body;
	var projectArr;
	//Projects.fetchAll().then(resData=> {
	//	console.log(resData.models);
	//})
	//console.log(projectArr);
	//User.fetchAll().then(resData=> {
//		console.log(resData.models);
//	})
	User.query({
		where: { username: username }
	}).fetch().then(user => {
		if(user) {
			if(bcrypt.compareSync(password, user.get('password_digest'))) {
				//Valid credentials
				const token = jwt.sign({ //create a jwt web token. 
					id: user.get('id'),
					username: user.get('username')
				}, config.jwtSecret);
				res.json({ token });
			} 
			else{
				res.status(401).json({ errors: { form: 'Invalid Credentials'}});
			}
		}
		else{
			res.status(401).json({ errors: { form: 'Invalid Credentials'}});
		}
	});
});

export default router;

import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import projects from '../models/projects';
import Files from '../models/files';
let router = express.Router();

router.post('/', (req, res) => {
	/*const user_id= 1;
		const		name= 'Square Nut Design, Wyss Institute, Melting Temperatures';
		const		authors= JSON.stringify([ 'Shawn M. Douglas', 'Hendrik Dietz', 'Tim Liedl', 'Björn Högberg', 'Franziska Graf', 'William M. Shih']);
		const		keywords= JSON.stringify({"keywords": [ 'Wyss Institute', '3D Origami', 'Material: DNA', 'Data: TEM', 'Lattice: Honeycomb', 'Scaffold: p7560']});
		const		views= 21;
		const		likes= 1;
		const		quality_of_documentation= 4;
		const		header_image_link='linkToAwss3/bucket/file';
		const		user_rights= ' to be updated';
	projects.forge({
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
					firstName: user.get('firstName'),
					lastName: user.get('lastName'),
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

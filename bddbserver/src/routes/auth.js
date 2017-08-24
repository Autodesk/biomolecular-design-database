import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import projects from '../models/projects';
import Files from '../models/files';
import Comments from '../models/comments';
let router = express.Router();

router.post('/', (req, res) => {
	const user_id = 1;
	const project_id = 20;
	const comment = "Header image description will enhance the quality of project";
	const title = "CanDo Result Data";
	const tags = "Simulation: CanDo";
	const file_link = "allFiles/1/3/AutodeskALogo CanDo_Results.zip";
	const description = "CanDo returned solid-body simulations with a final displacement range of between 1.6 and 6.2 nanometers. The simulation was illustrated by both figures and movies. In the first iterations of this design, the displacement range exceeded ~50 nanometers (recall that DNA helices are about 2 nanometers in diameter, and the entire design here is about 120nm tall and 60nm wide at the A's join). This was reduced greatly by iterating the placement of the crossovers, and our resulting CanDo simulations demonstrate that no single helix or small helical subunit displays large displacements. Qualitatively, a large global twist is placed on the structure, but following Rothemund's results, the experimental results are expected to remain flat on a mica surface on AFM.";
	
	
	const { username, password } =req.body;
	var projectArr;

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

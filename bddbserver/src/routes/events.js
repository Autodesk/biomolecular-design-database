import express from 'express';
import authenticate from '../middleware/authenticate';

//use aunthiticate: when request come to this route, first this aunthicate middleware function is called 
// it will check if the token is validated, proceed only if everything is okay!
//if token is invalid, error occurs. posst function never executes


//any route which needs authentication, we can simply include authenticate middleware


let router = express.Router();

router.post('/', authenticate, (req, res) => {
	res.status(201).json({ success: true });
});

export default router;

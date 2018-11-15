const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
let router = express.Router();



app.use(fileUpload());


router.post('/', function(req, res){
   if (!req.body.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.body.files.sampleFile;
  console.log(sampleFile);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('.', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
})
 


/*
AWS.config.update(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    subregion: 'us-west-2',
  }
);
const upload = multer({
	storage: multer.memoryStorage()
});
router.post('/', upload.single('theseNamesMustMatch'), (req, res) => {
  // req.file is the 'theseNamesMustMatch' file
  s3.putObject({
      Bucket: 'biomolecular-design-database-development',
      Key: 'AKIAJ4EW4PSVRLE36F2Q', 
      Body: req.file.buffer,
      ACL: 'public-read', // your permisions  
    }, (err) => { 
      if (err) return res.status(400).send(err);
      res.send('File uploaded to S3');
});
})
*/

export default router;

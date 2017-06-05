// Load the SDK and UUID
var AWS = require('aws-sdk');

AWS.config.apiVersions = {
  s3: '2006-03-01',
  // other service API versions
};

var s3 = new AWS.S3();

var params = { 
  Bucket: 'bionano-bdd-app',
  Key: 'allFiles/1/SquareNut_Temperature.png',
  Expires: 86400 
};


s3.getSignedUrl('getObject', params, function (err, url) {
  console.log('The URL is', url);
});

/*
 s3.listObjects(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
   
   data = {
    Contents: [
       {
      ETag: "\"70ee1738b6b21e2c8a43f3a5ab0eee71\"", 
      Key: "example1.jpg", 
      LastModified: <Date Representation>, 
      Owner: {
       DisplayName: "myname", 
       ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
      }, 
      Size: 11, 
      StorageClass: "STANDARD"
     }, 
       {
      ETag: "\"9c8af9a76df052144598c115ef33e511\"", 
      Key: "example2.jpg", 
      LastModified: <Date Representation>, 
      Owner: {
       DisplayName: "myname", 
       ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
      }, 
      Size: 713193, 
      StorageClass: "STANDARD"
     }
    ], 
    NextMarker: "eyJNYXJrZXIiOiBudWxsLCAiYm90b190cnVuY2F0ZV9hbW91bnQiOiAyfQ=="
   }
   
 });
/*/

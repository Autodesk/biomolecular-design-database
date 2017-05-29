
exports.up = function(knex, Promise) {
  	return knex.schema.createTable('projects', function(table){
  		table.increments(); 		//id
  		table.integer('user_id'); 	//user id of the owner
  		table.string('name'); 		//Project title
  		table.string('authors'); 
  		table.string('keywords'); 	//keywords seperated by '/'
 		table.integer('views');
 		table.integer('likes');
 		table.integer('quality_of_documentation');
 		table.string('header-image-link'); //link to s3 image 
  	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('projects');
};

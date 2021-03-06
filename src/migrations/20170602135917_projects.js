exports.up = function(knex, Promise) {
  	return knex.schema.createTable('projects', function(table){
  		table.increments(); 		//id
  		table.integer('user_id'); 	//user id of the owner
  		table.text('name'); 		//Project title
  		table.jsonb('authors'); 
  		table.jsonb('keywords'); 	//keywords seperated by '/'
 		table.integer('views');
 		table.integer('likes');
 		table.integer('quality_of_documentation');
 		table.text('header_image_link'); //link to s3 image 
 		table.text('user_rights');
 		table.timestamps();
  	});
};

exports.down = function(knex, Promise){
  	return knex.schema.dropTable('projects');
};

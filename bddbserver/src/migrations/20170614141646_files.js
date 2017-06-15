
exports.up = function(knex, Promise) {
  	return knex.schema.createTable('files', function(table){
  		table.increments(); 		//id
  		table.integer('user_id'); 	//user id of the owner
  		table.integer('project_id');// if of the project this file belong
  		table.text('title');
  		table.text('tags'); //link to the file in amazon aws s3 bucket 
  		table.text('file_link');
  		table.text('description');
  		//file type can be added 
  		table.timestamps();
  	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('files');
};

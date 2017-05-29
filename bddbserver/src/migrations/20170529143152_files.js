
exports.up = function(knex, Promise) {
  	return knex.schema.createTable('files', function(table){
  		table.increments(); 		//id
  		table.integer('user_id'); 	//user id of the owner
  		table.integer('project_id');// if of the project this file belongs
  		table.string('link'); //link to the file in amazon aws s3 bucket 
  	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('files');
};

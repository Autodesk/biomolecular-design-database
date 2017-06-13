exports.up = function(knex, Promise) {
  	return knex.schema.createTable('appreciations', function(table){
  		table.increments(); 		//id
  		table.integer('user_id'); 	//user id of the owner
  		table.integer('project_id');
 		table.timestamps();
  	});
};

exports.down = function(knex, Promise){
  	return knex.schema.dropTable('appreciations');
};

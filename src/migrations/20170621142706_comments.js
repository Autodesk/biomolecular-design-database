
exports.up = function(knex, Promise) {
  	return knex.schema.createTable('comments', function(table){
  		table.increments();
  		table.integer('user_id');
  		table.integer('project_id');
  		table.text('comment');
  		table.timestamps();
  	});
};

exports.down = function(knex, Promise) {
 	return knex.schema.dropTable('comments');
};

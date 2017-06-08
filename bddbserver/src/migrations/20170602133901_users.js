
exports.up = function(knex, Promise) {
  	return knex.schema.createTable('users', function(table) {
  		table.increments();
  		table.string('firstName').notNullable();
  		table.string('lastName').notNullable();
  		table.string('username').notNullable().unique();
  		table.string('email').notNullable().unique();
  		table.string('password_digest').notNullable();
  		table.timestamps();
  	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('users');
};

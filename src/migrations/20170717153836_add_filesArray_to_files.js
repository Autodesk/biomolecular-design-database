
exports.up = function(knex, Promise) {
  return knex.schema.table('files', (t) => {
  	t.jsonb('links_array');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('files', (t) => {
  	t.dropColumn('links_array');
  });
};

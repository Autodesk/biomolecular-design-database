// Update with your config settings.

const PGHOST = process.env.PGHOST || '127.0.0.1';

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: PGHOST,
      database: 'bdd',
      user: 'bddapp',
      password: 'storageBDD'
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: 'pg',
    connection: {
      host: PGHOST,
      database: 'bdd',
      user: 'bddapp',
      password: 'storageBDD'
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: PGHOST,
      database: 'bdd',
      user: 'bddapp',
      password: 'storageBDD'
    },
    pool: {
      min: 2,
      max: 10
    },
  },
};

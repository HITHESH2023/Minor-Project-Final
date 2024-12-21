const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mp_user_credentials',
  password: 'postgres@123',
  port: 5432,
});

const insertAdmin = async () => {
  const username = 'admin';
  const email = 'admin@gmail.com';
  const password = 'admin@123';

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin details into the database
    await pool.query(
      'INSERT INTO public.admins (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );

    console.log('Admin added successfully!');
  } catch (error) {
    console.error('Error inserting admin:', error);
  } finally {
    pool.end(); // Close the database connection
  }
};

insertAdmin();

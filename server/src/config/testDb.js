import pool from "../db/db.js";

const testDB = async () => {

  try {

    const result = await pool.query(
      "SELECT NOW()"
    );

    console.log("PostgreSQL Connected");

    console.log(result.rows[0]);

  } catch (error) {

    console.error(
      "Database connection failed"
    );

    console.error(error);
  }
};

export default testDB;
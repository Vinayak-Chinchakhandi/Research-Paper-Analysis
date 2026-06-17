import pool from "./db.js";

const initDB = async () => {

  try {

    /* USERS */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    /* PROJECTS */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    /* DOCUMENTS */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        original_name TEXT,
        stored_name TEXT,
        num_chunks INTEGER,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    /* CHAT SESSIONS */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        title VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    /* CHAT MESSAGES */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        session_id INTEGER REFERENCES chat_sessions(id) ON DELETE CASCADE,
        role VARCHAR(20) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    /* DOCUMENT TABLE MIGRATIONS */

    await pool.query(`
      ALTER TABLE documents
      ADD COLUMN IF NOT EXISTS file_path TEXT;
    `);

    await pool.query(`
      ALTER TABLE documents
      ADD COLUMN IF NOT EXISTS document_id TEXT;
    `);

    await pool.query(`
      ALTER TABLE chat_messages
      ADD COLUMN IF NOT EXISTS sources JSONB;
    `);

    console.log(
      "Database tables initialized"
    );

  } catch (error) {

    console.error(
      "Database initialization failed"
    );

    console.error(error);
  }
};

export default initDB;
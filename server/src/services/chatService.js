import pool from "../db/db.js";

export const saveMessageToDB =
  async (
    session_id,
    role,
    content,
    sources = []
  ) => {

    const result =
      await pool.query(
        `
        INSERT INTO chat_messages
        (
          session_id,
          role,
          content,
          sources
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
        [
          session_id,
          role,
          content,
          JSON.stringify(sources)
        ]
      );

    return result.rows[0];
  };
import pool from "../db/db.js";

/* CREATE PROJECT */
export const createProject =
  async (req, res) => {

    try {

      const {
        user_id,
        title,
        description,
      } = req.body;

      const result =
        await pool.query(
          `
          INSERT INTO projects
          (user_id, title, description)
          VALUES ($1, $2, $3)
          RETURNING *
          `,
          [
            user_id,
            title,
            description,
          ]
        );

      res.status(201).json(
        result.rows[0]
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Project creation failed",
      });
    }
  };

/* GET PROJECTS */
export const getProjects =
  async (req, res) => {

    try {

      const { user_id } = req.query;

      const result =
        await pool.query(
          `
          SELECT *
          FROM projects
          WHERE user_id = $1
          ORDER BY created_at DESC
          `,
          [user_id]
        );

      res.json(result.rows);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Fetching projects failed",
      });
    }
  };
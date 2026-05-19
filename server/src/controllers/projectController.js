import pool from "../db/db.js";

/* CREATE PROJECT */
export const createProject =
  async (req, res) => {

    try {

      const {
        title,
        description,
      } = req.body;

      const user_id = req.user.id;

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

      const user_id = req.user.id;
      
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

  
export const getProjectById =
  async (req, res) => {

    try {

      const projectId =
        req.params.id;

      const user_id =
        req.user.id;

      const result =
        await pool.query(
          `
          SELECT *
          FROM projects
          WHERE id = $1
          AND user_id = $2
          `,
          [projectId, user_id]
        );

      if (
        result.rows.length === 0
      ) {

        return res.status(404).json({
          message:
            "Project not found",
        });
      }

      res.json(
        result.rows[0]
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Server error",
      });
    }
  };
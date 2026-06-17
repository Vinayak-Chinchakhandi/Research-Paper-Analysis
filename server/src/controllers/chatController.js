import pool from "../db/db.js";

//Crete Session
export const createSession =
    async (req, res) => {

        try {

            const {
                project_id,
                title,
            } = req.body;

            const result =
                await pool.query(
                    `
          INSERT INTO chat_sessions
          (
            project_id,
            title
          )
          VALUES ($1, $2)
          RETURNING *
          `,
                    [
                        project_id,
                        title,
                    ]
                );

            res.status(201).json(
                result.rows[0]
            );

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message:
                    "Failed to create session",
            });
        }
    };


//Get session
export const getProjectSessions =
    async (req, res) => {

        try {

            const {
                projectId,
            } = req.params;

            const result =
                await pool.query(
                    `
          SELECT *
          FROM chat_sessions
          WHERE project_id = $1
          ORDER BY created_at DESC
          `,
                    [projectId]
                );

            res.json(
                result.rows
            );

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message:
                    "Failed to fetch sessions",
            });
        }
    };


//save message
export const saveMessage =
    async (req, res) => {

        try {

            const {
                session_id,
                role,
                content,
                sources,
            } = req.body;

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
          VALUES ($1, $2, $3, $4)
          RETURNING *
          `,
                    [
                        session_id,
                        role,
                        content,
                        JSON.stringify(sources || [])
                    ]
                );

            res.status(201).json(
                result.rows[0]
            );

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message:
                    "Failed to save message",
            });
        }
    };

//get message
export const getSessionMessages =
  async (req, res) => {

    try {

      const {
        sessionId,
      } = req.params;

      const result =
        await pool.query(
          `
          SELECT *
          FROM chat_messages
          WHERE session_id = $1
          ORDER BY created_at ASC
          `,
          [sessionId]
        );

      res.json(
        result.rows
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch messages",
      });
    }
  };
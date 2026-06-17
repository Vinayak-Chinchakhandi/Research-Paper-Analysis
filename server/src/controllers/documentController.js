import pool from "../db/db.js";

export const saveDocuments =
    async (
        project_id,
        documents
    ) => {

        for (const doc of documents) {

            await pool.query(
                `
  INSERT INTO documents
  (
    project_id,
    document_id,
    original_name,
    stored_name,
    file_path,
    num_chunks
  )
  VALUES ($1, $2, $3, $4, $5, $6)
  `,
                [
                    project_id,
                    doc.document_id,
                    doc.original_name,
                    doc.stored_name,
                    doc.file_path,
                    doc.chunk_count,
                ]
            );
        }
    };

export const getProjectDocuments =
    async (req, res) => {

        try {

            const {
                projectId,
            } = req.params;

            const result =
                await pool.query(
                    `
          SELECT *
          FROM documents
          WHERE project_id = $1
          ORDER BY uploaded_at DESC
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
                    "Failed to fetch documents",
            });
        }
    };
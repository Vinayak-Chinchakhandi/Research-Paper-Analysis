import API from "./api";

export const createSession =
    async (project_id, title) => {

        const response =
            await API.post(
                "/chat/session",
                {
                    project_id,
                    title,
                }
            );

        return response.data;
    };

export const fetchSessions =
    async (projectId) => {

        const response =
            await API.get(
                `/chat/session/${projectId}`
            );

        return response.data;
    };

export const fetchMessages =
    async (sessionId) => {

        const response =
            await API.get(
                `/chat/message/${sessionId}`
            );

        return response.data;
    };


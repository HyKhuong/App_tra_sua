import AxiosClient from "api/axios-client";
import { Post } from "types/post";

export const PostService = {
    getAll: async (): Promise<Post[]> => {
        try {
            return await AxiosClient.get("/post");
        } catch (error) {
            console.error("Error fetching all posts:", error);
            return [];
        }
    },

    getById: async (id: string): Promise<Post> => {
        try {
            const response = await AxiosClient.get<Post>(`/post/${id}`);
            return response.data; // Assuming AxiosClient returns a standard Axios response object
        } catch (error) {
            console.error(`Error fetching post with ID ${id}:`, error);
            throw error; // Re-throw the error to be handled by the caller
        }
    },
};
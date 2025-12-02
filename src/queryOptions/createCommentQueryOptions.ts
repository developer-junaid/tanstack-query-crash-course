import { queryOptions } from "@tanstack/react-query";

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function createCommentQueryOptions(id: number, on: boolean) {
  return queryOptions({
    queryKey: ["comments", id],
    queryFn: () => getCommentsByPostId(id),
    enabled: on,
  });
}

const getCommentsByPostId = async (id: number): Promise<Comment[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  return await response.json();
};

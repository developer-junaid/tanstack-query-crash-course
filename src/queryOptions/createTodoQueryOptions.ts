import { queryOptions } from "@tanstack/react-query";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function createTodoQueryOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });
}

const getAllTodos = async (): Promise<Todo[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return await response.json();
};

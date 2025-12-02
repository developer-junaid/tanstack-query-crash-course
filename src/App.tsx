import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import "./App.css";
import { useState } from "react";
import createTodoQueryOptions from "./queryOptions/createTodoQueryOptions";
import createCommentQueryOptions from "./queryOptions/createCommentQueryOptions";

function App() {
  // Learnings
  // 1. useQuery is a hook that allows you to fetch data from an API
  // 2. You can use data, isPending, error, refetch to manage the data
  // 3. You can use queryKey to identify the data
  // 4. QueryFn is the function that fetches the data
  // 5. You can give dynamic query key (like id in this case) to filter the data
  // 6. You can use enabled to conditionally fetch the data
  // 7. Separate queries into queryOptions folder and import them here
  // 8. useSuspense query makes sure the data is fetched before the component is rendered (never undefined)
  // 9. useQueries() is a hook that allows you to fetch multiple queries at once
  // 10. You can create queries run sequentially based on previous query results using enabled and suspenseQuery

  const [id, setId] = useState(1);

  // Conditional fetching
  const [on, setOn] = useState(true);

  const { data, isPending, refetch, error } = useQuery(
    createTodoQueryOptions()
  );

  const { data: comments, isPending: isCommentsPending } = useSuspenseQuery(
    createCommentQueryOptions(id, on)
  );

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <h1 className="text-2xl text-red-400 font-medium">
          Error: {error.message}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            TanStack Query Demo
          </h1>
          <p className="text-zinc-400">Learning React Query fundamentals</p>
        </header>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors"
          >
            Refetch Todos
          </button>
          <button
            onClick={() => setId(id + 1)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
          >
            Increment Post ID ({id})
          </button>
        </div>

        <div className="grid gap-6">
          <section className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
            <h2 className="text-xl font-semibold text-cyan-400 mb-3">Todos</h2>
            {isPending ? (
              <p className="text-zinc-400 animate-pulse">Loading...</p>
            ) : (
              <p className="text-zinc-200 font-mono text-sm bg-zinc-900 p-3 rounded-lg">
                {JSON.stringify(data[0]?.title)}
              </p>
            )}
          </section>

          <section className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
            <h2 className="text-xl font-semibold text-emerald-400 mb-3">
              Comments (Post #{id})
            </h2>
            {isCommentsPending ? (
              <p className="text-zinc-400 animate-pulse">Loading...</p>
            ) : (
              <p className="text-zinc-200 font-mono text-sm bg-zinc-900 p-3 rounded-lg">
                {JSON.stringify(comments[0]?.name)}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;

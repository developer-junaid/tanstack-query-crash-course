# TanStack Query Crash Course

A hands-on learning project exploring TanStack Query (React Query) for server state management in React.

## What I Learned

### 1. `useQuery` Hook

The core hook for fetching data from an API. It handles caching, background updates, and stale data automatically.

```tsx
const { data, isPending, error, refetch } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
});
```

### 2. Query Return Values

`useQuery` provides several useful values to manage data fetching:

- **`data`** — The fetched data
- **`isPending`** — Loading state (true while fetching)
- **`error`** — Error object if the request failed
- **`refetch`** — Function to manually trigger a refetch

### 3. Query Keys

Query keys uniquely identify cached data. TanStack Query uses these to determine when to refetch or serve cached data.

```tsx
queryKey: ["todos"]; // Static key
queryKey: ["comments", id]; // Dynamic key - refetches when id changes
```

### 4. Query Functions

The `queryFn` is the async function that fetches your data. It should return a promise.

```tsx
queryFn: async () => {
  const response = await fetch("https://api.example.com/todos");
  return response.json();
};
```

### 5. Dynamic Query Keys

Pass variables into the query key to filter/fetch specific data. The query automatically refetches when the key changes.

```tsx
queryKey: ["comments", postId]; // Refetches when postId changes
```

### 6. Conditional Fetching with `enabled`

Use the `enabled` option to conditionally run queries. The query won't execute until `enabled` is `true`.

```tsx
useQuery({
  queryKey: ["comments", id],
  queryFn: () => fetchComments(id),
  enabled: isReady, // Only fetches when isReady is true
});
```

### 7. Query Options Pattern

Separate query configurations into dedicated files for reusability and cleaner components.

```tsx
// queryOptions/createTodoQueryOptions.ts
export default function createTodoQueryOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });
}

// App.tsx
const { data } = useQuery(createTodoQueryOptions());
```

### 8. `useSuspenseQuery` Hook

Guarantees data is fetched before the component renders. The `data` is never `undefined`, making it type-safe.

```tsx
const { data } = useSuspenseQuery(queryOptions);
// data is guaranteed to exist (not undefined)
```

### 9. `useQueries` Hook

Fetch multiple queries in parallel. Useful when you need to fetch several independent resources at once.

```tsx
const results = useQueries({
  queries: [
    { queryKey: ["todos"], queryFn: fetchTodos },
    { queryKey: ["users"], queryFn: fetchUsers },
  ],
});
```

### 10. Sequential/Dependent Queries

Chain queries that depend on previous results using `enabled` or combine with `useSuspenseQuery`.

```tsx
// First query
const { data: user } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

// Second query - only runs after user is fetched
const { data: posts } = useQuery({
  queryKey: ["posts", user?.id],
  queryFn: () => fetchPosts(user.id),
  enabled: !!user, // Waits for user to exist
});
```

## Project Structure

```
src/
├── App.tsx                 # Main component with query examples
├── index.tsx               # App entry with QueryClientProvider
└── queryOptions/           # Reusable query configurations
    ├── createTodoQueryOptions.ts
    └── createCommentQueryOptions.ts
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)

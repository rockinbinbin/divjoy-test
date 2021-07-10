import {
  useQuery,
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "react-query";
import { Item, User } from '.prisma/client';
import { apiRequest } from "./util";

// For interacting with the React Query cache
const queryClient = new QueryClient();

/**** USERS ****/

// Fetch user data (hook)
// This is called automatically by auth.js and merged into auth.user
export function useUser(uid: string) {
  // Unique cache key for this query
  const cacheKey = ["user", { uid }];
  // Query for fetching user
  const query = () => apiRequest(`user-get?uid=${uid}`);
  // Fetch with react-query (only if we have a uid)
  // Docs: https://react-query.tanstack.com/guides/queries
  return useQuery(cacheKey, query, { enabled: !!uid });
}

// Create a new user
export function createUser(uid: string, data: Partial<User>) {
  return apiRequest("user-create", "POST", { uid, ...data });
}

// Update an existing user
export async function updateUser(uid: string, data: Partial<User>) {
  const response = await apiRequest(`user-update?uid=${uid}`, "PATCH", data);
  // Invalidate and refetch queries that could have old data
  await queryClient.invalidateQueries(["user", { uid }]);
  return response;
}

/**** ITEMS ****/
/* Example query functions (modify to your needs) */

// Fetch item data (hook)
export function useItem(id: number) {
  const cacheKey = ["item", { id }];
  const query = () => apiRequest(`item-get?id=${id}`);
  return useQuery(cacheKey, query, { enabled: !!id });
}

// Fetch all items by owner (hook)
export function useItemsByOwner(owner: string) {
  const cacheKey = ["items", { owner }];
  const query = () => apiRequest(`items-get?owner=${owner}`);
  return useQuery(cacheKey, query, { enabled: !!owner });
}

// Create a new item
export async function createItem(data: Item) {
  const response = await apiRequest("item-create", "POST", data);
  // Invalidate and refetch queries that could have old data
  await queryClient.invalidateQueries(["items"]);
  return response;
}

// Update an item
export async function updateItem(id: number, data: Partial<Item>) {
  const response = await apiRequest(`item-update?id=${id}`, "PATCH", data);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    queryClient.invalidateQueries(["item", { id }]),
    queryClient.invalidateQueries(["items"]),
  ]);
  return response;
}

// Delete an item
export async function deleteItem(id: number) {
  const response = await apiRequest(`item-delete?id=${id}`, "DELETE");
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    queryClient.invalidateQueries(["item", { id }]),
    queryClient.invalidateQueries(["items"]),
  ]);
  return response;
}

// React Query context provider that wraps our app
export function QueryClientProvider(props: any) {
  return (
    <QueryClientProviderBase client={queryClient}>
      {props.children}
    </QueryClientProviderBase>
  );
}

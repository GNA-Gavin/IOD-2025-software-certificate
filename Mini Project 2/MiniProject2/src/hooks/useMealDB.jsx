import { useData } from "./useData";

export function useMealDB(query) {
  const encodedQuery = encodeURIComponent(query || "");
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodedQuery}`;

  const { data, loading, error } = useData(url);

  return {
    meals: data?.meals || [],
    loading,
    error,
  };
}

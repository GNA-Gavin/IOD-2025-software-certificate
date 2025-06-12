import { useData } from "./useData";

export function useMealDBByCategory(category) {
  const url = category
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
        category
      )}`
    : null;
  const { data, loading, error } = useData(url);

  return {
    meals: data?.meals || [],
    loading,
    error,
  };
}

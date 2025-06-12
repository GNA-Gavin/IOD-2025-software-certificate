import { useData } from "./useData";

export function useMealDBById(id) {
  const url = id
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : null;

  const { data, loading, error } = useData(url);

  return {
    meal: data?.meals?.[0] || null,
    loading,
    error,
  };
}

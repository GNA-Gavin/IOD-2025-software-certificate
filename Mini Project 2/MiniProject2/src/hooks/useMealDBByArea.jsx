import { useData } from "./useData";

export function useMealDBByArea(area) {
  const url = area
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(
        area
      )}`
    : null;
  const { data, loading, error } = useData(url);

  return {
    meals: data?.meals || [],
    loading,
    error,
  };
}

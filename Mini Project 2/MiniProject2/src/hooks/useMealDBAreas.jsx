import { useData } from "./useData";

export function useMealDBAreas() {
  const { data, loading, error } = useData(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );

  return {
    areas: data?.meals || [],
    loading,
    error,
  };
}

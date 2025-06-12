import { useData } from "./useData";

export function useMealDBCategories() {
  const { data, loading, error } = useData(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  return {
    categories: data?.categories || [],
    loading,
    error,
  };
}

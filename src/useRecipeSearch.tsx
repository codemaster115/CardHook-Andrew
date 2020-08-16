import { useEffect, useState } from "react";
import axios from "axios";

export default function useRecipeSearch(
  query: string,
  queryB: string,
  pageNumber: number
) {
  let initData: any[] = [];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState(initData);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setRecipes([]);
  }, [query, queryB]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: () => void;
    axios({
      method: "GET",
      url: "http://www.recipepuppy.com/api/",
      params: { i: queryB, q: query, p: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setRecipes((prevRecipes) => {
          return [...prevRecipes, ...res.data.results.map((r: any) => r)];
        });
        setHasMore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [query, queryB, pageNumber]);
  return { loading, error, recipes, hasMore };
}

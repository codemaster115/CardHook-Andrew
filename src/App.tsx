import React, { useState, useRef, useCallback } from "react";
import Card from "./components/Card";
import Loading from "./components/Loading";
import useRecipeSearch from "./useRecipeSearch";

import "./App.css";

export default function App() {
  const [query, setQuery]: any = useState(localStorage.getItem("query"));
  const [queryB, setQueryB]: any = useState(localStorage.getItem("queryB"));
  const [pageNumber, setPageNumber] = useState(1);

  const { recipes, hasMore, loading, error } = useRecipeSearch(
    query,
    queryB,
    pageNumber
  );

  const observer: any = useRef();
  const lastItemRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries: any) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleNameSearch(e: React.FormEvent<HTMLInputElement>) {
    setQuery(e.currentTarget.value);
    localStorage.setItem("query", e.currentTarget.value);
    setPageNumber(1);
  }

  function handleIngredientSearch(e: React.FormEvent<HTMLInputElement>) {
    setQueryB(e.currentTarget.value);
    localStorage.setItem("queryB", e.currentTarget.value);
    setPageNumber(1);
  }

  return (
    <>
      <div className={"FixedBar-Container"}>
        <div className={"FixedBar"}>
          <div className={"LogoLabel"}>Recipe Labs</div>
          <div className={"SearchLayout"}>
            <div className={"SearchBoxContainer"}>
              <input
                type="text"
                onChange={handleNameSearch}
                value={query}
                placeholder={"Search By Name..."}
                autoFocus={true}
                className={"SearchInput"}
              />
            </div>
            <div className={"SearchBoxContainer"}>
              <input
                type="text"
                onChange={handleIngredientSearch}
                placeholder={"Search By Ingredient..."}
                value={queryB}
                className={"SearchInput"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={"RecipeList"}>
        {loading && (
          <div className={"RecipeItem-Container"}>
            <Loading />
          </div>
        )}
        {!loading && recipes.length === 0 && (
          <div className={"RecipeItem-Container"}>No Matching Recipe Found</div>
        )}
        {recipes.map((item, index) => {
          if (recipes.length === index + 1) {
            return (
              <div
                ref={lastItemRef}
                key={item.title}
                className={"RecipeItem-Container"}
              >
                <Card
                  title={item.title}
                  href={item.href}
                  thumbnail={item.thumbnail}
                  ingredients={item.ingredients}
                />
              </div>
            );
          } else {
            return (
              <div className={"RecipeItem-Container"} key={item.title}>
                <Card
                  title={item.title}
                  href={item.href}
                  thumbnail={item.thumbnail}
                  ingredients={item.ingredients}
                />
              </div>
            );
          }
        })}

        {error && <div>Error</div>}
      </div>
    </>
  );
}

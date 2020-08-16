import React from "react";

type Recipe = {
  title: string;
  href: string;
  thumbnail: string;
  ingredients: string;
};
export default function Card({ title, href, thumbnail, ingredients }: Recipe) {
  return (
    <div className={"CardContainer"}>
      <div className={"CardImageWrapper"}>
        <div>
          <img src={thumbnail} className={"ThumbnailContainer"} />
        </div>
      </div>

      <div>
        <div className={"CardTitle"}>{title}</div>
        <div className={"CardSubTitle"}>Ingredients</div>
        <div className={"IngredientBox"}>{ingredients}</div>
      </div>
    </div>
  );
}

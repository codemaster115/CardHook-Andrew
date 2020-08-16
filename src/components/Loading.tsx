import React from "react";

export default function Loading() {
  return (
    <div className={"CardContainer"}>
      <div className={"CardImageWrapper"}>
        <div>
          <img src={""} className={"ThumbnailContainer"} />
        </div>
      </div>

      <div>
        <div className={"CardTitle"}>{"Loading..."}</div>
        <div className={"CardSubTitle"}>{"Loading..."}</div>
        <div className={"IngredientBox"}>{"Loading...."}</div>
      </div>
    </div>
  );
}

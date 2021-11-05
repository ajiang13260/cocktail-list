import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { loading, cocktails } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (cocktails.length < 1) {
    return (
      <h2 className="section-title">
        no cocktails matched your search criteria
      </h2>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strGlass, strAlcoholic } =
            item;
          const newCocktail = {
            id: idDrink,
            name: strDrink,
            img: strDrinkThumb,
            glass: strGlass,
            info: strAlcoholic,
          };
          return <Cocktail key={newCocktail.id} {...newCocktail} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;

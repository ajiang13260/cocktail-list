import React, { useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState({});
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        if (data.drinks) {
          const {
            idDrink,
            strDrink,
            strCategory,
            strAlcoholic,
            strGlass,
            strDrinkThumb,
            strInstructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          setCocktail({
            id: idDrink,
            name: strDrink,
            category: strCategory,
            info: strAlcoholic,
            glass: strGlass,
            img: strDrinkThumb,
            instruction: strInstructions,
            ingredients,
          });
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  } else {
    const { name, category, info, glass, img, instruction, ingredients } =
      cocktail;
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={img} alt={name} />
          <div className="drink-info">
            <p>
              <span className="drink-data">name : </span>
              {name}
            </p>
            <p>
              <span className="drink-data">category : </span>
              {category}
            </p>
            <p>
              <span className="drink-data">info : </span>
              {info}
            </p>
            <p>
              <span className="drink-data">glass : </span>
              {glass}
            </p>
            <p>
              <span className="drink-data">instruction : </span>
              {instruction}
            </p>
            <p>
              <span className="drink-data">ingredients : </span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default SingleCocktail;

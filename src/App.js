import "./App.css";
import { useState } from "react";
import { snacks } from "./data/snacksData";

function App() {
  const [searchedSnack, setSearchedSnack] = useState("");

  const inputHandler = (e) => setSearchedSnack(e.target.value);

  const [sortBy, setSortBy] = useState({ property: "", isAscending: false });

  const snacksBySearch = searchedSnack
    ? snacks.filter(
        (snack) =>
          snack?.product_name
            ?.toLowerCase()
            ?.includes(searchedSnack.toLowerCase()) ||
          snack?.ingredients?.some((ingredient) =>
            ingredient.toLowerCase()?.includes(searchedSnack.toLowerCase())
          )
      )
    : snacks;

  const snacksBySort = (sortBy) =>
    sortBy
      ? sortBy.property === "ingredients"
        ? sortBy.isAscending
          ? snacksBySearch.sort(
              (a, b) =>
                a[sortBy.property][0].toLowerCase().charCodeAt(0) -
                b[sortBy.property][0].toLowerCase().charCodeAt(0)
            )
          : snacksBySearch.sort(
              (a, b) =>
                b[sortBy.property][0].toLowerCase().charCodeAt(0) -
                a[sortBy.property][0].toLowerCase().charCodeAt(0)
            )
        : sortBy.isAscending
        ? snacksBySearch.sort((a, b) => a[sortBy.property] - b[sortBy.property])
        : snacksBySearch.sort((a, b) => b[sortBy.property] - a[sortBy.property])
      : snacksBySearch;

  // console.log(snacksBySort());
  return (
    <div className="App">
      <h1>Snacks Table</h1>
      <div className="table-section">
        <input
          onChange={inputHandler}
          placeholder="Search with products or ingredients"
        />
        <div className="table">
          <div className="table-header">
            <div
              onClick={() =>
                setSortBy(
                  sortBy.property === "id"
                    ? { ...sortBy, isAscending: !sortBy.isAscending }
                    : { ...sortBy, property: "id" }
                )
              }
              className="id"
            >
              ID
            </div>
            <div
              onClick={() =>
                setSortBy(
                  sortBy.property === "product_name"
                    ? { ...sortBy, isAscending: !sortBy.isAscending }
                    : { ...sortBy, property: "product_name" }
                )
              }
              className="name"
            >
              Product Name
            </div>
            <div
              onClick={() =>
                setSortBy(
                  sortBy.property === "product_weight"
                    ? { ...sortBy, isAscending: !sortBy.isAscending }
                    : { ...sortBy, property: "product_weight" }
                )
              }
              className="weight"
            >
              Product Weight
            </div>
            <div
              onClick={() =>
                setSortBy(
                  sortBy.property === "price"
                    ? { ...sortBy, isAscending: !sortBy.isAscending }
                    : { ...sortBy, property: "price" }
                )
              }
              className="price"
            >
              Price INR
            </div>
            <div
              onClick={() =>
                setSortBy(
                  sortBy.property === "calories"
                    ? { ...sortBy, isAscending: !sortBy.isAscending }
                    : { ...sortBy, property: "calories" }
                )
              }
              className="calories"
            >
              Calories
            </div>
            <div
              onClick={() =>
                setSortBy(
                  sortBy.property === "ingredients"
                    ? { ...sortBy, isAscending: !sortBy.isAscending }
                    : { ...sortBy, property: "ingredients" }
                )
              }
              className="ingredients"
            >
              Ingredients
            </div>
          </div>
          {snacksBySort(sortBy)?.map((snack) => {
            const {
              id,
              product_name,
              product_weight,
              price,
              calories,
              ingredients,
            } = snack;

            return (
              <div className="table-row" key={id}>
                <div className="id">{id}</div>
                <div className="name">{product_name}</div>
                <div className="weight">{product_weight}</div>
                <div className="price">{price}</div>
                <div className="calories">{calories}</div>
                <div className="ingredients">
                  {ingredients.map(
                    (ingredient, index) =>
                      `${ingredient} ${
                        index === ingredients.length - 1 ? "" : ","
                      }`
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

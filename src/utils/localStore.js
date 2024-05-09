import { products } from "../Components/db";
// import { getProducts } from "./http";

export function GetAndStore() {
     const allProducts = JSON.parse(localStorage.getItem('allProducts'));
     if (!allProducts) {
          fetchAndSave();
     } else {
          return allProducts;
     }
}

async function fetchAndSave() {
     // const allProducts = await getProducts();
     const allProducts = products;
     localStorage.setItem('allProducts', JSON.stringify(allProducts));
     return allProducts;
}    
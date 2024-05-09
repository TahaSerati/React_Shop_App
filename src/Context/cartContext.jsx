import { createContext, useReducer } from "react";
import { GetAndStore } from "../utils/localStore";

export const CartContext = createContext({
     products: [],
     addProduct: () => { },
     removeProduct: () => { }
})


function shoppingCartReducer(state, action) {

     if (action.type == "ADD_PRODUCT") {
          const allProductsInDatabase = GetAndStore();
          const allProducts = [...state.products];
          const existingProductIndex = allProducts.findIndex((product) => product.id == action.id);
          let newProduct;
          let updatedProducts;

          if (existingProductIndex !== -1) {
               // updating
               allProducts[existingProductIndex].quantity += 1;
               updatedProducts = [...state.products];
          } else {
               // adning new one  
               newProduct = allProductsInDatabase.find((product) => product.id === action.id);
               newProduct.quantity = 1;
               if (newProduct) {
                    updatedProducts = [...state.products, newProduct]; // => push ? 
               }
          }
          // update localStorage
          // localStorage.setItem('cartProducts', JSON.stringify(state.products));
          // return 
          return {
               ...state,
               products: updatedProducts
          }

     }
     if (action.type == "REMOVE_PRODUCT") {
          const allProducts = [...state.products];
          const existingProductIndex = allProducts.findIndex((product) => product.id == action.id);
          let updatedProducts;

          if (allProducts[existingProductIndex]) {
               allProducts[existingProductIndex].quantity -= 1;
               if (allProducts[existingProductIndex].quantity < 1) {
                    allProducts.splice(existingProductIndex, 1);
               }
               updatedProducts = allProducts
          } else {
               return state;
          }

          // update localStorage
          // localStorage.setItem('cartProducts', JSON.stringify(state.products));

          // return 
          return {
               ...state,
               products: updatedProducts
          }
     }
     return state;
}

// eslint-disable-next-line react/prop-types
export default function CartContextProvider({ children }) {
     const [cartReducer, cartReducerDispatch] = useReducer(shoppingCartReducer, {
          products: []
     })
     function handleAddPeoduct(id) {
          cartReducerDispatch({
               type: "ADD_PRODUCT",
               id: id
          })
     }
     function handleRemoveProduct(id) {
          cartReducerDispatch({
               type: "REMOVE_PRODUCT",
               id: id
          })
     }
     const cartContextValue = {
          products: cartReducer.products,
          addProduct: handleAddPeoduct,
          removeProduct: handleRemoveProduct
     }
     return (
          <>
               <CartContext.Provider value={cartContextValue}>
                    {children}

               </CartContext.Provider>
          </>
     );
}

/*
     products = {
          id : product.id
          product : product ,
          quantity : 0,
     }
*/
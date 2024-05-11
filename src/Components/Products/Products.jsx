// imports
import { useEffect, useState } from "react";
// import { GetAndStore } from '../../utils/localStore';
// import { products } from "../db";
// comps
import Header from "../pages/Header";
import Product from "./Product";
import { GetAndStore } from "../../utils/localStore";

export default function Products() {
     // fetch data
     const [cssClasses, setCssClasses] = useState(window.screen.width > 1023
          ? 'grid-products-system' : 'flex flex-col gap-3 items-center');
     const [fetchedProducts, setFetchedProducts] = useState();


     useEffect(() => {
          async function httpGetandSave() {
               const data = await GetAndStore();
               setFetchedProducts(data);
          }
          httpGetandSave();
     }, [])

     // if (!fetchedProducts)
     //      setFetchedProducts(products);

     window.addEventListener("resize", function () {
          if (window.screen.width > 1023) {
               setCssClasses('grid-products-system');
          } else {
               setCssClasses('flex flex-col gap-3 items-center');
          }
     });

     return (
          <>
               <Header />
               <section className={`w-full bg-white rounded-sm px-3 py-2 mt-4 ${cssClasses}`}>
                    {!fetchedProducts && <div className="lds-ring mx-auto"><div>
                    </div><div></div><div></div><div></div></div>
                    }
                    {fetchedProducts &&
                         fetchedProducts.map((product) => (
                              <Product key={product.id} product={product}
                              />
                         ))
                    }

               </section>
          </>
     );
}
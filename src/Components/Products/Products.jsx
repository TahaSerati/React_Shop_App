// imports
import { useState } from "react";
// import { GetAndStore } from '../../utils/localStore';
// comps
import Header from "../pages/Header";
import Product from "./Product";
import { products } from "../db";

export default function Products() {
     // fetch data
     const [cssClasses, setCssClasses] = useState(window.screen.width > 1023
          ? 'grid-products-system' : 'flex flex-col gap-3 items-center');
     const [fetchedProducts, setFetchedProducts] = useState();

     if (!fetchedProducts)
          setFetchedProducts(products);

     // useEffect(() => {
     //      async function httpGetandSave() {
     //           const data = await GetAndStore();
     //           setFetchedProducts(data);     
     //      }
     //      httpGetandSave();
     // }, [])

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
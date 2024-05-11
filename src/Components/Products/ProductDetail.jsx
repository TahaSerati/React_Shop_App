import { useParams } from "react-router-dom";
import Header from "../pages/Header";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/cartContext";
import { getProductWithId } from "../../utils/http";
// import { getProductWithId } from "../../utils/http";
// import { products } from "../db";


export default function ProductDetail() {
     const [product, setProduct] = useState();
     const params = useParams();
     const id = params.id;
     const cartCtx = useContext(CartContext);

     function onAddToCart(event) {
          event.stopPropagation();
          cartCtx.addProduct(product.id);
     }
     
     useEffect(() => {
          async function fetchOneProduct() {
               const data = await getProductWithId(id);
               setProduct(data);
          }
          fetchOneProduct();
     }, [id])
     
     // console.log(product, id, products)
     // if (!product) {
     //      const product = products.find((product) => product.id == id)
     //      setProduct(product);
     // }

     return (
          <>
               <Header />
               {
                    product &&
                    <div>
                         {/* mobile mode  */}
                         <div className="flex flex-col items-center gap-2 bg-gray-400 px-3 py-1 my-3 lg:hidden">
                              <div className="w-full rounded-lg ">
                                   {/* <img src={`../../${product.imgsrc}`} className="object-contain" alt="" /> */}
                                   <img src={`${product.imgsrc}`} className="object-contain" alt="" />
                              </div>
                              <div className="w-full flex flex-col gap-2">
                                   <h2 className="font-bold text-xl">{product.title}</h2>
                                   <h2 className="font-bold">price : ${product.price}</h2>
                                   {product.discount > 0 && <h2 className="font-bold">discount : %{product.discount}</h2>}

                              </div>
                              <div className="w-2/5 mx-auto ">
                                   <button className="btn-slate-dark w-full" disabled={product.status != 'marketable'}>
                                        {
                                             product.status == 'marketable' ? 'Add to Cart' : 'notAvailable'
                                        }
                                   </button>
                              </div>

                         </div>
                         {/* desktop mode  */}
                         <div className="hidden lg:flex bg-slate-700 text-white rounded-lg w-full py-1 px-2 gap-9 my-3">
                              <div className="w-1/3 rounded-lg">
                                   <img src={`../../${product.imgsrc}`} className="object-contain
                                    rounded-lg" alt="" />
                              </div>
                              <div className="w-2/3 rounded-lg flex flex-col justify-between py-3 px-2">
                                   <div className="flex flex-col gap-2">
                                        <h1 className="font-bold text-3xl">{product.title}</h1>
                                        <h1 className="font-bold text-xl">${product.price}</h1>
                                        {
                                             product.discount > 0 &&
                                             <h1 className="font-bold text-3xl">%{product.discount}</h1>
                                        }
                                   </div>
                                   <div className="w-full h-1/5">
                                        <button className="btn-slate-dark bg-teal-800 w-1/3 h-12" onClick={onAddToCart}>
                                             {
                                                  product.status == 'marketable' ? 'Add to Cart' : 'not Available'
                                             }
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>

               }
               {
                    !product &&
                    <div className="w-full flex-center my-3">
                         <div className="lds-ring mx-auto"><div>
                         </div><div></div><div></div><div></div></div>
                    </div>
               }
               {/* alike products
               <Products /> */}
          </>
     );
}
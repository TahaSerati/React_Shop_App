/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/cartContext";
import { useContext } from "react";

export default function Product({ product }) {
     const navigator = useNavigate();
     const cartCtx = useContext(CartContext);

     function goProductDetail() {
          navigator('/productdetail/' + product.id);
     }

     function onAddToCart(event) {
          event.stopPropagation();
          cartCtx.addProduct(product.id);
     }

     return (
          <>
               {/* <h1 className="font-bold text-3xl">Im 1 product item</h1> */}
               {/* desktop mode */}
               <div className="hidden w-full h-[490px] bg-slate-800 rounded-md cursor-pointer lg:block"
                    onClick={goProductDetail}>
                    <div className="w-full h-2/3 bg-rose-900">
                         <img className="rounded-t-md object-contain w-full h-full" src={product.imgsrc} alt="" />
                    </div>
                    <div className="w-full h-1/3 px-3 py-2 flex flex-col items-center justify-between text-white">
                         <div className="w-full">
                              <h3 className="font-bold text-2xl">{product.title}</h3>
                              <div className="flex items-center justify-between">
                                   <h5>$ {product.price}</h5>
                                   {
                                        product.discount != 0 &&
                                        <h5> %{product.discount} OFF</h5>
                                   }
                              </div>
                         </div>
                         <div className="w-2/3 mt-2">
                              <button className="btn-slate-asd w-full" onClick={onAddToCart}
                                   disabled={product.status != "marketable"}>
                                   {product.status == "marketable" ? "Add to cart" : "not available"}
                              </button>
                         </div>
                    </div>
               </div>



               {/* mobile mode */}
               <div className="sm:w-[400px] md:w-[500px] bg-slate-800 rounded-md px-2 py-1 cursor-pointer flex
                justify-center lg:hidden" onClick={goProductDetail}>
                    <div className="w-1/3 flex flex-col items-center justify-center">
                         <img src={product.imgsrc} className="object-contain" alt="" />
                    </div>
                    <div className="w-2/3 flex flex-col gap-3 px-2">
                         <div className="flex flex-col gap-1">
                              <h5 className="text-xl font-bold">{product.title}</h5>
                              <div className="w-full flex items-center justify-between">
                                   <h5 className="text-gray-700 text-sm">$ {product.price}</h5>
                                   {
                                        product.discount != 0 &&
                                        <h5 className="text-gray-700"> %{product.discount} OFF</h5>
                                   }
                              </div>
                         </div>

                         <div className="py-2 px-3">
                              <button className="btn-slate-light" onClick={onAddToCart}
                                   disabled={product.status != "marketable"}>
                                   {product.status == "marketable" ? "Add to cart" : "not available"}
                              </button>
                         </div>

                    </div>

               </div>

          </>
     );
}

/*
     carts need to be in mobile mode and desktop mode, how ? 
     
*/
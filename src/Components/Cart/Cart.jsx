import { useContext } from "react";
import Header from "../pages/Header";
import { CartContext } from "../../Context/cartContext";
import { Link } from "react-router-dom";

export default function Cart() {
     const iconTrash = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
     const cartCtx = useContext(CartContext);
     const totalPrice = cartCtx.products.reduce((acc, item) => {
          return acc += item.quantity * item.price
     }, 0);
     function onAddToCart(id) {
          cartCtx.addProduct(id);
     }
     function onRemoveFromCart(id) {
          cartCtx.removeProduct(id);
     }

     // const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

     return (
          <>
               <Header />
               <section
                    className=" w-full bg-slate-200 shadow-sm rounded-md mt-4 flex py-2
                     flex-col items-center gap-3">
                    {
                         cartCtx.products.length < 1 &&
                         cartCtx.products &&
                         <>
                              <h1 className="font-bold text-2xl">cart is empty :)</h1>
                              <h1 className="font-bold text-xl">
                                   <Link to="/products" >
                                        <button className="btn-slate-dark">
                                             Find new stuff
                                        </button>
                                   </Link>
                              </h1>
                         </>

                    }
                    <div className="w-full flex gap-2 ">
                         {
                              cartCtx.products &&
                              cartCtx.products.map((product) => {
                                   return <div key={product.id} className="w-2/3 lg:w-1/3 rounded-sm flex flex-col
                              items-center justify-evenly gap-2 bg-rose-800 text-white h-[400px]">
                                        <div className="w-full  h-2/3 px-1 py-1">
                                             <img src={product.imgsrc} className="object-contain h-full w-full rounded-sm"
                                                  alt="" />
                                        </div>
                                        <div className="w-full h-1/3 bg-red-900 px-3 py-2">
                                             <h1 className="font-bold">{product.title}</h1>
                                             <div className="w-full flex item-center justify-between">
                                                  <h2>${product.price * product.quantity}</h2>
                                                  {
                                                       product.discount > 0 &&
                                                       <h2>%{product.discount}</h2>
                                                  }
                                             </div>

                                             <div className="w-full flex gap-1 mt-4 justify-center">
                                                  <button className="btn-slate-dark w-5 md:w-10 "
                                                       onClick={() => onAddToCart(product.id)}>+</button>

                                                  <button className="btn-slate-dark w-5 md:w-10 "
                                                       onClick={() => onRemoveFromCart(product.id)}>
                                                       {product.quantity == 1 ? iconTrash : '-'}
                                                  </button>
                                                  <h2>count : {product.quantity}</h2>
                                             </div>
                                        </div>
                                   </div>
                              })
                         }
                    </div>
                    {
                         cartCtx.products.length > 0 &&
                         <div className="w-2/3 flex items-center justify-evenly ">
                              <span className="md:w-1/3 w-32 bg-rose-800 h-10 rounded-md text-white flex-center">
                                   total : ${totalPrice}
                              </span>

                              <button className="w-1/3 bg-slate-700 h-10 rounded-md text-white flex-center">
                                   checkout
                              </button>
                         </div>
                    }
               </section>

          </>
     );
}


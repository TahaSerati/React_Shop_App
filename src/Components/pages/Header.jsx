import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/cartContext";
import { ModalContext } from "../../Context/ModalContext";

import Modal from '../UI/Modal';

export default function Header() {
     const [barState, setBarState] = useState(false);
     const iconTrash = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
     const shopIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mt-1"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
     const hamberIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /></svg>;
     const cartCtx = useContext(CartContext);
     const ModalCtx = useContext(ModalContext);
     const openModal = ModalCtx.status == "cartModal";
     const cartCounter = cartCtx.products.reduce((acc) => {
          return acc += 1;
     }, 0)

     function onOpenCartModal() {
          ModalCtx.showCartModal();
     }

     function onCloseModal() {
          ModalCtx.hideModal();
     }

     function onAddToCart(id) {
          cartCtx.addProduct(id);
     }
     function onRemoveFromCart(id) {
          cartCtx.removeProduct(id);
     }


     return (
          <>
               <header className="w-full py-3 px-3 rounded-b-lg flex items-center justify-between bg-glass">
                    {/* desktop mode */}
                    <ul className=" items-center gap-5 hidden md:flex">
                         <Link to="/">
                              <li className="btn-slate-dark">
                                   Home
                              </li>
                         </Link>
                         <Link to="/products">
                              <li className="btn-slate-dark">
                                   Products
                              </li>
                         </Link>
                    </ul>
                    <ul className="items-center gap-2 hidden md:flex">
                         <li className="btn-slate-dark" onClick={onOpenCartModal}>
                              {/* <Link to="/cart" className="flex items-center gap-2">cart ({cartCounter})
                                   {shopIcon}
                              </Link> */}
                              <button className="flex items-center gap-2">cart ({cartCounter})
                                   {shopIcon}
                              </button>
                         </li>
                         <li>
                         </li>
                    </ul>
                    {/* mobile mode */}
                    <div className="w-full flex items-center justify-end md:hidden">
                         <div className="flex flex-col gap-2 w-full">
                              <button className="max-w-fit cursor-pointer" onClick={() => { setBarState((perv) => { return !perv }) }}>{hamberIcon}</button>
                              {
                                   barState &&
                                   <div className="flex flex-col gap-2">
                                        <Link to="/">
                                             <li className="btn-slate-dark">
                                                  Home
                                             </li>
                                        </Link>
                                        <Link to="/products">
                                             <li className="btn-slate-dark">
                                                  Products
                                             </li>
                                        </Link>
                                        <li className="btn-slate-dark" onClick={onOpenCartModal}>
                                             <button className="flex items-center gap-2">cart ({cartCounter})
                                                  {shopIcon}
                                             </button>
                                        </li>
                                   </div>
                              }
                         </div>
                    </div>
               </header>
               {
                    openModal &&
                    <Modal open={openModal} title={"your Cart :"}>
                         <div className="w-full ">
                              {
                                   cartCtx.products.length < 1 &&
                                   <h5>your Cart is empty.</h5>
                              }
                              {
                                   cartCtx.products.map((product) => {
                                        return <div key={product.id} className="w-full rounded-sm bg-slate-600 flex
                                              flex-col gap-1 my-2 px-2 py-1">
                                             <h2>{product.title}</h2>
                                             price : ${product.price * product.quantity}
                                             <div className="flex items-center justify-between">
                                                  <h1 className="rounded-sm bg-slate-800 text-white flex-center w-28">
                                                       count : {product.quantity} </h1>
                                                  <div className="w-full flex justify-end gap-2">
                                                       <button className="btn-slate-dark w-7 "
                                                            onClick={() => onAddToCart(product.id)}>+</button>
                                                       <button className="btn-slate-dark w-7 "
                                                            onClick={() => onRemoveFromCart(product.id)}>
                                                                 {
                                                                      product.quantity == 1 ? iconTrash : '-' 

                                                                 }
                                                            </button>
                                                  </div>
                                             </div>
                                        </div>
                                   })
                              }
                         </div>
                         <div className="w-full flex justify-end gap-3">
                              <Link to="/cart" className="flex items-center gap-2">
                                   <button className="btn-slate-dark" onClick={onCloseModal}>
                                        ShowCart
                                   </button>
                              </Link>
                              <button className="btn-red-light" onClick={onCloseModal}>close</button>
                         </div>
                    </Modal>
               }
          </>
     );
}
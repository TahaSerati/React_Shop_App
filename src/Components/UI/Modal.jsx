import { useRef, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../../Context/ModalContext";

export default function Modal({ title, open, children }) {
     const iconDel = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
     const dialog = useRef();
     const modalCtx = useContext(ModalContext);

     useEffect(() => {
          const modal = dialog.current;
          if (open) {
               modal.showModal();
               document.body.style.overflow = 'hidden';
          }

          return () => {
               modal.close();
               document.body.style.overflow = 'auto';
          }
     }, [open])

     function onModalClose() {
          modalCtx.hideModal()
     }

     return createPortal(
          <dialog ref={dialog} className="w-96 bg-slate-500 px-2 py-1 rounded-sm flex flex-col items-center center-dialog">
               <div className="w-full flex justify-end px-1 py-1">
                    <button onClick={onModalClose}>
                         {iconDel}
                    </button>
               </div>
               <div className="w-full flex justify-start">
                    <h1 className="font-bold text-xl">
                         {title}
                    </h1>
               </div>
               {children}
          </dialog>
          , document.getElementById('Modal')
     )

}

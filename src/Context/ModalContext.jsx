import { createContext, useState } from "react";

export const ModalContext = createContext({
     status: '', // cartModal, ... checkOut , ...
     showCartModal: () => { },
     // hideCartModal: () => { },
     // showCheckoutModal: () => { },
     // hideCheckoutModal: () => { },
     hideModal: () => { }
});

// eslint-disable-next-line react/prop-types
export default function ModalContextProvider({ children }) {

     const [statusState, setStatusState] = useState();

     function showCartModal() {
          setStatusState('cartModal')
     }
     function hideModal() {
          setStatusState('')
     }
     // function hideCartModal() {
     //      setStatusState('')

     // }
     // function showCheckoutModal() {
     //      setStatusState('checkoutModal')

     // }
     // function hideCheckoutModal() {
     //      setStatusState('')

     // }

     const ModalContextValue = {
          status: statusState, // cartModal, ... checkOut , ...
          showCartModal: showCartModal,
          // hideCartModal: hideCartModal,
          // showCheckoutModal: showCheckoutModal,
          // hideCheckoutModal: hideCheckoutModal,
          hideModal: hideModal
     }

     return (
          <>
               <ModalContext.Provider value={ModalContextValue}>{children}</ModalContext.Provider>
          </>
     );
}
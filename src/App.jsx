// routing 
import { RouterProvider } from 'react-router-dom';
import router from './Route/router';
import CartContextProvider from './Context/cartContext';
import ModalContextProvider from './Context/ModalContext';


function App() {

  return (
    <>
      <div className='container mx-auto'>
        <ModalContextProvider>
          <CartContextProvider>
            
            <RouterProvider router={router}>
            </RouterProvider>
            
          </CartContextProvider>
        </ModalContextProvider>
      </div>
    </>
  )
}

export default App

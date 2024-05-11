import { Link } from "react-router-dom";

export default function NotFound() {
     return (
          <>
               <h1 className="font-bold text-3xl">Error Not Found Page!</h1>
               <div className="flex items-center gap-4 my-3">
                    <button className="btn-slate-dark">
                         <Link to="/">
                              back to Home
                         </Link>
                    </button>
                    <button className="btn-slate-dark">
                         <Link to="/products">
                              see products
                         </Link>
                    </button>
               </div>
          </>
     );
}
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import LogoAprovIA from '../LogoAprovIA';


function Navbar() {
  const { user } = useContext(AuthContext);

  let navbarComponent;

  if (user.token !== '') {
    navbarComponent = (
      <div className="w-full text-white flex justify-center p-3 rounded-t-2xl bg-neutral-800 "> 
        <div className="container flex justify-center ">
        <Link
          to="/home"
          className="flex items-center gap-2 text-2xl font-serif hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded transition"
          tabIndex={0}
          aria-label="Ir para a página inicial"
        >
          <LogoAprovIA />
        </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/firebase';

const Navbar = ({ user }) => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <div className="space-x-4">
        {user && (
          <>
            <Link to="/bulgarian" className="text-blue-600">Български</Link>
            <Link to="/literature" className="text-blue-600">Литература</Link>
            <Link to="/baiganio" className="text-blue-600">B.A.I. Ганьо</Link>
          </>
        )}
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="text-red-500">Изход</button>
        ) : (
          <Link to="/login" className="text-green-600">Вход</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../services/firebase';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Matura Master</div>
      <div className="space-x-4">
        <NavLink
          to="/bulgarian"
          className={({ isActive }) =>
            isActive ? 'underline font-semibold' : 'hover:underline'
          }
        >
          Български език
        </NavLink>
        <NavLink
          to="/literature"
          className={({ isActive }) =>
            isActive ? 'underline font-semibold' : 'hover:underline'
          }
        >
          Литература
        </NavLink>
        <NavLink
          to="/baiganio"
          className={({ isActive }) =>
            isActive ? 'underline font-semibold' : 'hover:underline'
          }
        >
          BAI Ганьо
        </NavLink>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
          >
            Изход
          </button>
        ) : (
          <NavLink to="/login" className="hover:underline">
            Вход
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

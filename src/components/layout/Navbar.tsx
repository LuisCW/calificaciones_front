import { Link, useLocation } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaClipboardList } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaGraduationCap className="brand-icon" />
        <h1>Sistema de Calificaciones</h1>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/alumnos" className={isActive('/alumnos') ? 'active' : ''}>
            <FaGraduationCap /> Alumnos
          </Link>
        </li>
        <li>
          <Link to="/materias" className={isActive('/materias') ? 'active' : ''}>
            <FaBook /> Materias
          </Link>
        </li>
        <li>
          <Link to="/notas" className={isActive('/notas') ? 'active' : ''}>
            <FaClipboardList /> Notas
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

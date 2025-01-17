import { Outlet } from 'react-router-dom';
import NavBar from './global/NavBar';
import Footer from './global/Footer';

const Layout = () => {
  const routesToHideFooter = ["/"];
  const hideFooter = routesToHideFooter.includes(location.pathname);
  
  return (
    <div className='bg-myGray-100'>
      <nav>
        <NavBar />
      </nav>
      <Outlet />
      <div>
        { !hideFooter &&<Footer /> }
      </div>
    </div>
  )
}

export default Layout;
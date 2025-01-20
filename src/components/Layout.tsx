import { Outlet } from 'react-router-dom';
import NavBar from './global/NavBar';
import Footer from './global/Footer';
import NavContextProvider from './contexts/NavContext';

const Layout = () => {
  const routesToHideFooter = ["/"];
  const hideFooter = routesToHideFooter.includes(location.pathname);
  
  return (
    <div className='bg-myGray-100'>
      <NavContextProvider>
        <NavBar />
      </NavContextProvider>

      <NavContextProvider>
        <Outlet />
      </NavContextProvider>
      
      <div>
        { !hideFooter &&<Footer /> }
      </div>
    </div>
  )
}

export default Layout;
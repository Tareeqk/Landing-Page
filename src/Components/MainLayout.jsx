// components/MainLayout.jsx
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = ({isDark , setIsDark}) => {
  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <main >
        <Outlet />
      </main>
      <Footer isDark={isDark} setIsDark={setIsDark} />
    </>
  );
};

export default MainLayout;

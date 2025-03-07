import { ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import App from './App.tsx'
import AboutMe from './components/about/AboutMe.tsx'
import Projects from './components/projects/Projects.tsx'
import JunkLab from './components/junk-lab/JunkLab.tsx'
import ProjectView from './components/projects/ProjectView.tsx'
import UILayouts from './components/projects/UILayouts.tsx'
import { AnimatePresence, motion as m } from 'motion/react'
import NavBar from './components/global/NavBar.tsx'
import NavContextProvider from './components/contexts/NavContext.tsx'


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
              <Layout />
          }
        >
          <Route index element={
            <PageWrapper>
              <App />
            </PageWrapper>
          } />

          <Route 
          path="about" 
          element={
            <PageWrapper>
              <AboutMe />
            </PageWrapper>
          } />

          <Route 
          path="projects" 
          element={
            <PageWrapper>
              <Projects />
            </PageWrapper>
          } />

          <Route 
          path="projects/:title" 
          element={
            <PageWrapper>
              <ProjectView />
            </PageWrapper>
          } />

          <Route 
          path="projects/ui-layouts" 
          element={
            <PageWrapper>
              <UILayouts />
            </PageWrapper>
          } />

          <Route 
          path="junk-lab" 
          element={
            <PageWrapper>
              <JunkLab />
            </PageWrapper>
          } />

        </Route>
      </Routes>
    </AnimatePresence>
  )
}

const PageWrapper = ({children}: {children: ReactNode}) => {
  const location = useLocation();
  const duration = 1;
  const delay = .1;

  return (
    <>
      <m.div 
        initial={{opacity: 1, y: 50}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0.6, y: -100}}
        transition={{duration, ease: [0.22, 1, 0.36, 1], delay}}
      >
        {children}
      </m.div>

      <m.div 
      className={`fixed w-full h-screen top-0 left-0 opacity-0 pointer-events-none bg-black z-[5]`}
      initial={{opacity: 0.6}}
      animate={{opacity: 0}}
      exit={{opacity: 0.6}}
      transition={{duration: duration/2}}
      />

      <m.div
        className={`fixed z-10 left-0 top-0 bg-black w-full h-screen origin-bottom`}
        initial={{scaleY: 0}}
        animate={{scaleY: 0}}
        exit={{scaleY: 1}}
        transition={{duration, ease: [0.22, 1, 0.36, 1], delay}}
      />
      <m.div
        className={`fixed z-10 left-0 top-0 bg-black w-full h-screen origin-top`}
        initial={{scaleY: 1}}
        animate={{scaleY: 0}}
        exit={{scaleY: 0}}
        transition={{duration, ease: [0.22, 1, 0.36, 1], delay}}
      />

    </>
  )
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NavContextProvider>
        <NavBar />
        <AnimatedRoutes />
      </NavContextProvider>
    </BrowserRouter>
  </StrictMode>,
)

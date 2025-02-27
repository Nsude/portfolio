import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import App from './App.tsx'
import AboutMe from './components/about/AboutMe.tsx'
import Projects from './components/projects/Projects.tsx'
import JunkLab from './components/junk-lab/JunkLab.tsx'
import ProjectView from './components/projects/ProjectView.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      }, {
        path: "/about",
        element: <AboutMe />
      }, {
        path: "/projects",
        element: <Projects />
      }, {
        path: "/projects/:title",
        element: <ProjectView />
      }, {
        path: "/junk-lab",
        element: <JunkLab />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

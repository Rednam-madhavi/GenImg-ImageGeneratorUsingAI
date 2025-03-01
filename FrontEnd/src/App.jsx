import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './componets/Navbar'
import Generate from './componets/Generate'
import Footer from './componets/Footer'
import Home from './componets/Home'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Home /><Footer /></>
    },
    {
      path: "/generate",
      element: <><Navbar /><Generate /></>
    },

  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

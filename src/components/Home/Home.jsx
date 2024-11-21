import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom"
  import Sidebar from '../Sidebar/Sidebar'
  import * as Component from "../components"





function Home() {




  return (
    <>
      <Component.contain style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
       
        <h1>Welcome to the Home Page</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium est explicabo,
          tempora impedit animi quibusdam commodi assumenda ducimus dolore blanditiis, magni iste
          illum nulla suscipit voluptas sapiente accusantium repellendus atque, nesciunt officia omnis
          hic? Officia iure ullam illo aut inventore ea, sed ipsum nostrum fugiat repudiandae,
          accusantium eaque sunt magni perspiciatis possimus numquam incidunt quibusdam corporis
          architecto! At optio iure inventore? Atque veritatis facilis similique sit, repellendus eos
          voluptates dolores, esse minus ut tenetur possimus alias, voluptatum asperiores quisquam magnam
          dolorem necessitatibus error sequi eligendi ipsa aut. Iste quae quos sed recusandae non dolores
          eveniet nulla odit eius commodi. Corporis.
        </p>
      </Component.contain>
    </>
  )
}

export default Home

import React from 'react'
import { Datacontext } from '../../Context/userContext';
import { useContext } from 'react'
import { fieldcontext } from '../../Context/userContext'

function Neet() {
  const {userName} =useContext(Datacontext);
  const {field} =useContext(fieldcontext);

  return (
    <div>
      <h1>hi</h1>
    </div>
  )
}

export default Neet

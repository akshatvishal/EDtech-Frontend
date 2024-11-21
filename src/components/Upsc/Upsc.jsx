import React from 'react'
import { Datacontext } from '../../Context/userContext';
import { useContext } from 'react'
import { fieldcontext } from '../../Context/userContext'

function Upsc() {
  const {userName} =useContext(Datacontext);
  const {field} =useContext(fieldcontext);

  return (
    <div>
      <h1>yello</h1>
    </div>
  )
}

export default Upsc

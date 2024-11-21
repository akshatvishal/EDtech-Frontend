import React, { createContext, useState } from "react";

// Create the contexts
export const Datacontext = createContext('');
export const fieldcontext = createContext('');

// Create the data provider for user data
export const DataProvider = ({ children }) => {
  const [userName, setName] = useState(''); // State for the username

  return (
    <Datacontext.Provider value={{ userName, setName }}>
      {children}
    </Datacontext.Provider>
  );
};

// Create the field provider for field data
export const FieldProvider = ({ children }) => {
  const [field, setfield] = useState(''); // State for the field

  return (
    <fieldcontext.Provider value={{ field, setfield }}>
      {children}
    </fieldcontext.Provider>
  );
};

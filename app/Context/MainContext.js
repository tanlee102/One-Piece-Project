"use client";

import React, { createContext, useEffect, useLayoutEffect, useState } from 'react'
import Cookies from 'js-cookie';

export const MainContext = createContext();

const MainProvider = ({ children }) => {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <MainContext.Provider value={{darkMode, setDarkMode}}>
        {children}
    </MainContext.Provider>
  )
}

export default MainProvider

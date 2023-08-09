import React, { createContext, useContext, useState } from 'react';

export const CanvasContext = createContext();
export const CanvasContextProvider = (props) => {

    const[selectedElement, setSelectedElement] = useState(null);
    console.log(selectedElement, "from Context");
    console.log(setSelectedElement, "from Context");
    
    return (
        <CanvasContext.Provider
          value={{
           selectedElement,
           setSelectedElement
          }}
          {...props}
        >
          {props.children}
        </CanvasContext.Provider>
      );
};

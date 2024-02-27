import React from "react";
import noteContext from "./noteContext";

export const NoteStates = (props) => {
  const state = {
    "name":"mukesh"
    
  }

  return (
    <noteContext.Provider value={state}>{props.children}</noteContext.Provider>
  );
};

export  default NoteStates;

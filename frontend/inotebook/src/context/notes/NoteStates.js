import React, { useState } from "react";
import noteContext from "./noteContext";

export const NoteStates = (props) => {
 const hostUrl=`http://localhost:8000`;
  const [notes,setnotes] =useState([]);
 const getNotes=async()=>{
  //API Call
  const response=await fetch(`${hostUrl}/api/note/fetchallnote`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkODU0Nzg2NTFjN2Q1Mjc4NDQwOGJhIn0sImlhdCI6MTcwODY4Mjc0NX0.KC-NOG5oUZY1yXYJuSPDhPL7E5m6xtXBTJ6fpKzszPc'

    }
  });
  const json= await response.json();
  console.log(json) 
  setnotes(json);

 }
  const editNote=async(id,title,description,tag)=>{
    const response=await fetch(`${hostUrl}/api/note/updatenote/${id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkODU0Nzg2NTFjN2Q1Mjc4NDQwOGJhIn0sImlhdCI6MTcwODY4Mjc0NX0.KC-NOG5oUZY1yXYJuSPDhPL7E5m6xtXBTJ6fpKzszPc'

      },
      body:JSON.stringify(title,description,tag)
     
    });
    const json= await response.json();
    return json;  
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id===id) {
        element.title=title;
        element.description=description;
        element.tag=tag;
        
      }
      
    }
   
  }

  return (
    <noteContext.Provider value={{getNotes}}>{props.children}</noteContext.Provider>
  );
};

export  default NoteStates;

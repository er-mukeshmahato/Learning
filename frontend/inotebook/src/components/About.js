import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
  const a = useContext(noteContext);
  
  return (
    <>
      This is About {a.name}
    </>
  );
};

export default About;

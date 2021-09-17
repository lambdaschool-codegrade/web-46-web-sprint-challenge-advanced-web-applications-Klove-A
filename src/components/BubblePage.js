import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(async () => {
    const newColors = await fetchColorService()
    setColors(newColors)
  }, []);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth().put(`/colors/${editColor.id}`, editColor)
      .then(() => {
        setColors(colors.map(color => {
          if (color.id === editColor.id) return editColor;
          return color;
        }))
        setEditing(false)
    })
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`/colors/${colorToDelete.id}`)
      .then(() => {
        setColors(colors.filter(color => (color.id !== colorToDelete.id)))
      })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const sidebarContext = createContext(undefined);

export const SidebarContextContextProvider = (props) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [images, setImages] = useState([]);
  const [imageLoader, setImageLoader] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const decreaseValue = () => {
    let val = sliderValue;
    if (val > 10) {
      val = val - 1;
      setSliderValue(val);
    }
  };

  const increaseValue = () => {
    let val = sliderValue;
    if (val < 100) {
      val = val + 1;
      setSliderValue(val);
    }
  };

  const getImages = async (searchterm) => {
    setImageLoader(true);
    let searchQuery = searchterm == "" ? "certificate background" : searchterm;
    let response = await axios.get(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API}&q=${searchQuery}&image_type=photo`
    );

    setImages(response?.data?.hits);
    setImageLoader(false);
  };

  const getGifs = async (search) => {
    setImageLoader(true);
    var gifresponse;
    if (search == "") {
      gifresponse = await axios.get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API}`
      );
    } else {
      gifresponse = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API}&q=${search}`
      );
    }
     setGifs(gifresponse.data.data)
    setImageLoader(false);
  };


  const getStickers = async (search) => {
    setImageLoader(true);
    var stickerresponse;
    if (search == "") {
      stickerresponse = await axios.get(
        `https://api.giphy.com/v1/stickers/trending?api_key=${process.env.REACT_APP_GIPHY_API}`
      );
    } else {
      stickerresponse = await axios.get(
        `https://api.giphy.com/v1/stickers/search?api_key=${process.env.REACT_APP_GIPHY_API}&q=${search}`
      );
    }
     setStickers(stickerresponse.data.data)
    setImageLoader(false);
  };

  const selectCanvasElement = (element) => {
    setSelectedElement(element);
  }

  

  return (
    <sidebarContext.Provider
      value={{
        sliderValue,
        images,
        imageLoader,
        gifs,
        stickers,
        selectedElement,
        handleSliderChange,
        decreaseValue,
        increaseValue,
        getImages,
        getGifs,
        getStickers,
        selectCanvasElement
      }}
      {...props}
    >
      {props.children}
    </sidebarContext.Provider>
  );
};

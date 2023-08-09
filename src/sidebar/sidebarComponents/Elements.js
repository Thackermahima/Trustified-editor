import React, { useEffect, useState } from "react";
import { sidebarContext } from "../../context/SidebarContext";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress"; 
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SearchBar from "./SearchBar";

const Elements = () => {
  const SidebarContext = React.useContext(sidebarContext);
  const { getGifs, getStickers, stickers, gifs, imageLoader, selectCanvasElement } = SidebarContext;

  const [type, setType] = useState("gif");

  useEffect(() => {
    getGifs("");
  }, []);

  const handleClick = (value) => {
    setType(value);
  };
 

  let chipstyle = {
    border: "1px solid",
    borderRadius: "7px",
    padding: "20px",
    color:'white'
  };

  let selectedChipStyle = {
    border: "1px solid",
    borderRadius: "7px",
    padding: "20px",
    color: "black",
    background: "white",
  };

  return (
    <div > 
      <SearchBar id={type}/>
      <Stack direction="row" spacing={1} style={{ marginBottom: "20px" }}>
        <Chip
          label="Gif" 
          onClick={() => {
            handleClick("gif");
            getGifs("");
          }}
          style={type == "gif" ? selectedChipStyle : chipstyle}
        />
        <Chip
          label="Stickers" 
          variant="outlined"
          onClick={() => {
            handleClick("stickers");
            getStickers("");
          }}
          style={type == "stickers" ? selectedChipStyle : chipstyle}
        />
      </Stack>
      <div style={{ overflow: "scroll", height: "100vh" }}>
        <Grid container spacing={2} className="imagesContainer">
          {imageLoader && (
            <CircularProgress
              style={{ margin: "auto", marginTop: "60px" }}
            ></CircularProgress>
          )}
          {type == "gif" &&
            gifs.map((gif, index) => (
              <Grid item key={index} xs={12}  md={6} lg={6} style={{ marginBottom: index + 1 === gifs.length ? '180pt' : '10px' }} >
                <img
                  src={gif.images.original.url}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%",minWidth:'100px',minHeight:'100px'}}
                  onClick={() => selectCanvasElement(gif.images.original.url)}
                />
              </Grid> 
            ))}
          {type == "stickers" &&
            stickers.map((sticker, index) => (
              <Grid item key={index} xs={12} md={6} lg={6} style={{ marginBottom: index + 1 === stickers.length ? '180pt' : '10px' }} >
                <img
                  src={sticker.images.original.url}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%",minWidth:'100px',minHeight:'100px'}}
                  onClick={() => selectCanvasElement(sticker.images.original.url)}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Elements;

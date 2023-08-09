import React, { useEffect } from "react";
import { sidebarContext } from "../../context/SidebarContext";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import SearchBar from "./SearchBar";

const Images = () => {
  const SidebarContext = React.useContext(sidebarContext);
  const { getImages, images, imageLoader, selectCanvasElement } = SidebarContext;

  useEffect(() => {
    getImages("certificate");
  }, []);

  return (
    <div>
      <SearchBar id="image" />
      <div style={{ overflow: "scroll", height: "100vh" }}>
        <Grid container spacing={2} className="imagesContainer">
          {imageLoader && (
            <CircularProgress
              style={{ margin: "auto", marginTop: "60px" }}
            ></CircularProgress>
          )}
          {images && images.map((image, index) => { 
            return (
              <Grid item key={index} xs={12} sm={8} md={8} lg={6}  style={{ marginBottom: index + 1 === images.length ? '180pt' : '10px' }}>
                <img
                  src={image.previewURL}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%", minWidth: '100px', minHeight: '100px' }}
                  onClick={() => selectCanvasElement(image.previewURL)}
                />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Images;

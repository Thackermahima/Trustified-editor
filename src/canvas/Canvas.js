import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { sidebarContext } from "../context/SidebarContext";
import { parseGIF, decompressFrames } from "gifuct-js";
import { CanvasContext } from "../context/CanvasContext";

function Canvas() {
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 });
  const SidebarContext = React.useContext(sidebarContext);
  const { sliderValue } = SidebarContext;
  const canvasContext = React.useContext(CanvasContext);
  const { selectedElement } = canvasContext;
  var canvasRef = useRef(null);

  useEffect(() => {
    handleSize();
  }, [sliderValue]);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
      fabric.Image.fromURL(selectedElement, (img) => {
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height
     });
      // img.scaleToWidth(canvas.width * 0.50);
      // img.scaleToHeight(canvas.width * 0.50);
      canvas.centerObject(img);
      canvas.add(img);
      });
      canvas.renderAll();

  }, [selectedElement]);

  const handleSize = () => {
    const newWidth = (600 * sliderValue * 2) / 100;
    const newHeight = (400 * sliderValue * 2) / 100;
    setCanvasSize({ width: newWidth, height: newHeight });
  };


  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#eee",
        overflow: 'scroll',
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignSelf: 'center',
        padding: '10%',
        alignItems: 'center'
      }}
    >
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center align-self-center"
            style={{ marginTop: sliderValue > 70 ? '30%' : '10%', margin: '10%' }} >
            <canvas
              ref={canvasRef}
              id="myCanvas"
              style={{
                //backgroundColor: "#fff",
                height: canvasSize.height,
                width: canvasSize.width,
              }}
            />
            <div id="test"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
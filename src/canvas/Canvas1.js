// src/components/Canvas.js
import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import "./Canvas.css";
import { sidebarContext } from "../context/SidebarContext";


const Canvas = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  const SidebarContext = React.useContext(sidebarContext);
  const { sliderValue } = SidebarContext; 

  

  return (
    <div
      className="canvasContainer"
      id="canvasContainer"
      style={{ backgroundColor: "#fff", overflow: 'scroll' }}
    >
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center align-self-center " >
            <canvas
              width={window.innerWidth}
              height={window.innerHeight}  
              className="drawing-canvas"
              ref={canvasRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;

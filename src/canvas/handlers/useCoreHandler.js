import { useCallback } from 'react';  
import { propertiesToInclude } from '../constants/contants';
import { useCanvasContext } from '../hooks';
import { CanvasObjects } from '../CanvasObjects';

const useCoreHandler = () => {
  const { canvas, activeObject } = useCanvasContext();

  // Add objects to canvas
  const addObject = useCallback(
    options => {
      const { type, ...objectOptions } = options;
      const element = CanvasObjects[type].render(objectOptions);
      const workarea = canvas.getObjects().find(obj => obj.id === 'workarea');
      canvas.add(element);
      element.center();

      if (workarea) {
        element.clipPath = workarea;
      }
      canvas.renderAll();
    },
    [canvas]
  );

  // Update properties, optional set metadata if present
  const setProperty = useCallback(
    (property, value) => {
      if (activeObject) {
        activeObject.set(property, value);
        activeObject.setCoords();
        canvas.requestRenderAll();
      }
    },
    [activeObject, canvas]
  );

  const exportJSON = useCallback(() => {
    const json = canvas.toJSON(propertiesToInclude);
    return json;
  }, [canvas]);

  const loadJSON = useCallback(
    json => {
      if (canvas) {
        canvas.loadFromJSON(json, () => {
          canvas.requestRenderAll();
        });
      }
    },
    [canvas]
  );

  const setCanvasBackgroundColor = useCallback(
    color => {
      const workarea = canvas.getObjects().find(object => object.id === 'workarea');
      if (workarea) {
        workarea.set('fill', color);
        canvas.requestRenderAll();
      }
    },
    [canvas]
  );

  return { exportJSON, loadJSON, setCanvasBackgroundColor, addObject, setProperty };
};

export default useCoreHandler;

import { createRef, useCallback, useEffect } from 'react';
import { useCanvasContext } from '../hooks';

const useContainerHandler = () => {
  const containerRef = createRef();
  const { canvas } = useCanvasContext();

  const updateCanvasSize = useCallback((x, y) => {
    if (canvas) {
      canvas.setHeight(y).setWidth(x);
      canvas.renderAll();
      const workarea = canvas.getObjects().find(obj => obj.id === 'workarea');
      if (workarea) {
        workarea.center();
      }
    }
  }, [canvas]);

  useEffect(() => {
    const containerWidth = containerRef.current?.clientWidth || 0;
    const containerHeight = containerRef.current?.clientHeight || 0;
    updateCanvasSize(containerWidth, containerHeight);
  }, [containerRef, updateCanvasSize]);

  return containerRef;
};

export default useContainerHandler;
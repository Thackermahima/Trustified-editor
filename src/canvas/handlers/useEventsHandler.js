import { useCallback, useEffect } from 'react'; 
import { isArrow, isCtrlShiftZ, isCtrlZ } from '../utils/keyboard';
import { useCanvasContext } from '../hooks';

const useEventHandlers = () => {
  const { canvas, setActiveObject, activeObject, setZoomRatio } = useCanvasContext();

  /**
   * Canvas Mouse wheel handler
   */

  const onMouseWheel = useCallback(
    event => {
      if (canvas && event.e.ctrlKey) {
        const delta = event.e.deltaY;
        let zoomRatio = canvas.getZoom();
        if (delta > 0) {
          zoomRatio -= 0.04;
        } else {
          zoomRatio += 0.04;
        }
        setZoomRatio(zoomRatio);
      }
      event.e.preventDefault();
      event.e.stopPropagation();
    },
    [canvas, setZoomRatio]
  );

  useEffect(() => {
    if (canvas) {
      canvas.on('mouse:wheel', onMouseWheel);
    }
    return () => {
      if (canvas) {
        canvas.off('mouse:wheel', onMouseWheel);
      }
    };
  }, [canvas, onMouseWheel]);

  /**
   * Canvas selection handlers
   */

  const onSelect = useCallback(
    ({ target }) => {
      if (target) {
        if (canvas) {
          setActiveObject(canvas.getActiveObject());
        }
      } else {
        setActiveObject(null);
      }
    },
    [canvas, setActiveObject]
  );

  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', onSelect);
      canvas.on('selection:cleared', onSelect);
      canvas.on('selection:updated', onSelect);
    }
    return () => {
      if (canvas) {
        canvas.off('selection:cleared', onSelect);
        canvas.off('selection:created', onSelect);
        canvas.off('selection:updated', onSelect);
      }
    };
  }, [canvas, onSelect]);

  /**
   * Keyboard Events Handler
   */

  const undo = useCallback(() => {
    canvas?.undo?.();
  }, [canvas]);

  const redo = useCallback(() => {
    canvas?.redo?.();
  }, [canvas]);

  const moveUp = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.top = activeObject.top - 2;
      activeObject.setCoords();
      canvas.requestRenderAll();
    }
  }, [activeObject, canvas]);

  const moveDown = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.top = activeObject.top + 2;
      activeObject.setCoords();
      canvas.requestRenderAll();
    }
  }, [activeObject, canvas]);

  const moveRight = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.left = activeObject.left + 2;
      activeObject.setCoords();
      canvas.requestRenderAll();
    }
  }, [activeObject, canvas]);

  const moveLeft = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.left = activeObject.left - 2;
      activeObject.setCoords();
      canvas.requestRenderAll();
    }
  }, [activeObject, canvas]);

  const onKeyDown = useCallback(
    e => {
      isCtrlZ(e) && undo();
      isCtrlShiftZ(e) && redo();
      if (isArrow(e)) {
        e.code === 'ArrowLeft' && moveLeft();
        e.code === 'ArrowRight' && moveRight();
        e.code === 'ArrowDown' && moveDown();
        e.code === 'ArrowUp' && moveUp();
      }
    },
    [canvas, activeObject, undo, redo, moveLeft, moveRight, moveDown, moveUp]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [canvas, activeObject, onKeyDown]);
};

export default useEventHandlers;
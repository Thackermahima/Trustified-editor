import { useEffect } from 'react'; 
import { useCanvasContext } from '../hooks';
  

const useCustomizationHandler = () => {
  const { canvas } = useCanvasContext();

  /**
   * Customize fabric controls
   */
  useEffect(() => {
    // ... (same code as provided)
  }, [canvas]);

  /**
   * Customize selected styles for groups
   */
  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', function (ev) {
        const objects = canvas.getActiveObjects();
        if (objects.length > 1) {
          ev.target.setControlsVisibility({
            mt: false,
            mb: false,
            mr: false,
            ml: false,
          });
          ev.target.borderDashArray = [7];
        }
      });
    }
  }, [canvas]);

  /**
   * Customize selection styles
   */
  useEffect(() => {
    if (canvas) {
      canvas.selectionColor = 'rgba(46, 204, 113, 0.15)';
      canvas.selectionBorderColor = 'rgb(39, 174, 96)';
      canvas.selectionLineWidth = 0.4;
    }
  }, [canvas]);
};

export default useCustomizationHandler;
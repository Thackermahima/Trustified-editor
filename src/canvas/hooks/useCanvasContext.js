 
import { useContext } from 'react'
import { EditorContext } from '../../context/EditorContext'

function useCanvasContext() {
  const { zoomRatio, setZoomRatio, setCanvas, canvas, activeObject, setActiveObject } = useContext(EditorContext)
  return {
    zoomRatio,
    setZoomRatio,
    setCanvas,
    canvas,
    activeObject,
    setActiveObject,
  }
}

export default useCanvasContext

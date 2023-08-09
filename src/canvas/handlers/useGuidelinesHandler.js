import { useEffect } from 'react'
import { fabric } from 'fabric'  
import { useCanvasContext } from '../hooks'

function useGuidelinesHandler() {
  const { canvas } = useCanvasContext() 
  useEffect(() => {
    if (canvas) {
      let ctx = canvas.getSelectionContext(),
        aligningLineOffset = 5,
        aligningLineMargin = 4, 
        viewportTransform = canvas.viewportTransform,
        zoom = 1

      
     

      const isInRange = (value1, value2) => {
        value1 = Math.round(value1)
        value2 = Math.round(value2)
        for (let i = value1 - aligningLineMargin, len = value1 + aligningLineMargin; i <= len; i++) {
          if (i === value2) {
            return true
          }
        }
        return false
      }

      let verticalLines = [],
        horizontalLines = []

      canvas.on('mouse:down', function () {
        viewportTransform = canvas.viewportTransform
        zoom = canvas.getZoom()
      })

      canvas.on('object:moving', function (e) {
        let activeObject = e.target
        if (!activeObject || !viewportTransform) return

        let canvasObjects = canvas.getObjects()
        let activeObjectCenter = activeObject.getCenterPoint(),
          activeObjectLeft = activeObjectCenter.x,
          activeObjectTop = activeObjectCenter.y,
          activeObjectBoundingRect = activeObject.getBoundingRect(),
          activeObjectHeight = activeObjectBoundingRect.height / viewportTransform[3],
          activeObjectWidth = activeObjectBoundingRect.width / viewportTransform[0],
          horizontalInTheRange = false,
          verticalInTheRange = false,
          transform = canvas.viewportTransform

        if (!transform) return

        // It should be trivial to DRY this up by encapsulating (repeating) creation of x1, x2, y1, and y2 into functions,
        // but we're not doing it here for perf. reasons -- as this a function that's invoked on every mouse move

        for (let i = canvasObjects.length; i--; ) {
          if (canvasObjects[i] === activeObject) continue

          let objectCenter = canvasObjects[i].getCenterPoint(),
            objectLeft = objectCenter.x,
            objectTop = objectCenter.y,
            objectBoundingRect = canvasObjects[i].getBoundingRect(),
            objectHeight = objectBoundingRect.height / viewportTransform[3],
            objectWidth = objectBoundingRect.width / viewportTransform[0]

          // snap by the horizontal center line
          if (isInRange(objectLeft, activeObjectLeft)) {
            verticalInTheRange = true
            verticalLines.push({
              x1: objectLeft,
              y1:
                objectTop < activeObjectTop
                  ? objectTop - objectHeight / 2 - aligningLineOffset
                  : objectTop + objectHeight / 2 + aligningLineOffset,
              y2:
                activeObjectTop > objectTop
                  ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
                  : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset,
            })
            activeObject.setPositionByOrigin(
              new fabric.Point(objectLeft, activeObjectTop),
              'center',
              'center'
            )
          }

          // snap by the left edge
          if (isInRange(objectLeft - objectWidth / 2, activeObjectLeft - activeObjectWidth / 2)) {
            verticalInTheRange = true
            verticalLines.push({
              x1: objectLeft - objectWidth / 2,
              y1:
                objectTop < activeObjectTop
                  ? objectTop - objectHeight / 2 - aligningLineOffset
                  : objectTop + objectHeight / 2 + aligningLineOffset,
              y2:
                activeObjectTop > objectTop
                  ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
                  : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset,
            })
            activeObject.setPositionByOrigin(
              new fabric.Point(objectLeft - objectWidth / 2 + activeObjectWidth / 2, activeObjectTop),
              'center',
              'center'
            )
          }

          // snap by the right edge
          if (isInRange(objectLeft + objectWidth / 2, activeObjectLeft + activeObjectWidth / 2)) {
            verticalInTheRange = true
            verticalLines.push({
              x1: objectLeft + objectWidth / 2,
              y1:
                objectTop < activeObjectTop
                  ? objectTop - objectHeight / 2 - aligningLineOffset
                  : objectTop + objectHeight / 2 + aligningLineOffset,
              y2:
                activeObjectTop > objectTop
                  ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
                  : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset,
            })
            activeObject.setPositionByOrigin(
              new fabric.Point(objectLeft + objectWidth / 2 - activeObjectWidth / 2, activeObjectTop),
              'center',
              'center'
            )
          }

          // snap by the vertical center line
          if (isInRange(objectTop, activeObjectTop)) {
            horizontalInTheRange = true
            horizontalLines.push({
              y1: objectTop,
              x1:
                objectLeft < activeObjectLeft
                  ? objectLeft - objectWidth / 2 - aligningLineOffset
                  : objectLeft + objectWidth / 2 + aligningLineOffset,
              x2:
                activeObjectLeft > objectLeft
                  ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
                  : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset,
            })
            activeObject.setPositionByOrigin(
              new fabric.Point(activeObjectLeft, objectTop),
              'center',
              'center'
            )
          }

          // snap by the top edge
          if (isInRange(objectTop - objectHeight / 2, activeObjectTop - activeObjectHeight / 2)) {
            horizontalInTheRange = true
            horizontalLines.push({
              y1: objectTop - objectHeight / 2,
              x1:
                objectLeft < activeObjectLeft
                  ? objectLeft - objectWidth / 2 - aligningLineOffset
                  : objectLeft + objectWidth / 2 + aligningLineOffset,
              x2:
                activeObjectLeft > objectLeft
                  ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
                  : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset,
            })
            activeObject.setPositionByOrigin(
              new fabric.Point(activeObjectLeft, objectTop - objectHeight / 2 + activeObjectHeight / 2),
              'center',
              'center'
            )
          }

          // snap by the bottom edge
          if (isInRange(objectTop + objectHeight / 2, activeObjectTop + activeObjectHeight / 2)) {
            horizontalInTheRange = true
            horizontalLines.push({
              y1: objectTop + objectHeight / 2,
              x1:
                objectLeft < activeObjectLeft
                  ? objectLeft - objectWidth / 2 - aligningLineOffset
                  : objectLeft + objectWidth / 2 + aligningLineOffset,
              x2:
                activeObjectLeft > objectLeft
                  ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
                  : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset,
            })
            activeObject.setPositionByOrigin(
              new fabric.Point(activeObjectLeft, objectTop + objectHeight / 2 - activeObjectHeight / 2),
              'center',
              'center'
            )
          }
        }

        if (!horizontalInTheRange) {
          horizontalLines.length = 0
        }

        if (!verticalInTheRange) {
          verticalLines.length = 0
        }
      })

      canvas.on('before:render', function () {
        canvas.clearContext(ctx)
      }) 

      canvas.on('mouse:up', function () {
        verticalLines.length = horizontalLines.length = 0
        canvas.renderAll()
      })
    }
  }, [canvas])
}

export default useGuidelinesHandler

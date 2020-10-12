import React, {useCallback, useEffect, useState} from 'react'
import './Visualizer.css'


const makeShapes = (shapes, svgHeight) => {
    const allPoints = shapes.map(shape => {
        if(shape){
        const {x1, x2, y1, y2} = shape
        return {x1, x2, y1, y2}
        }
        return null
    })

    const randomShapeToConnect = allPoints[Math.floor(Math.random()*allPoints.length)]

    const drawRandomConnection = randomShapeToConnect => {
        const {x1, x2, y1, y2} = randomShapeToConnect
        const coordinates = [{x:x1, y:y1}, {x:x2, y:y2}]
        const randomCoordinate = coordinates[Math.floor(Math.random()*coordinates.length)]

        return {
            x1: randomCoordinate.x,
            y1: randomCoordinate.y,
            x2: Math.floor(Math.random()*svgHeight),
            y2: Math.floor(Math.random()*svgHeight)
        }

    }
    return drawRandomConnection(randomShapeToConnect)
}
const DecenterVisualizer = () => {
   const [svgHeight] = useState(400)
   const [shapes, setShapes] = useState([{
       x1:Math.floor(Math.random()*svgHeight),
       y1:Math.floor(Math.random()*svgHeight),
       x2: Math.floor(Math.random()*svgHeight),
       y2: Math.floor(Math.random()*svgHeight),
   }])

   const animate = useCallback(() => {
       setInterval(() => {    
        setShapes(shapes => [...shapes, makeShapes(shapes, svgHeight)])
    }, .1)
       
   }, [svgHeight])

   useEffect(()=>animate())
    return <svg onClick={animate} height={svgHeight} width={svgHeight}> 
        {shapes.map((shape, i ) => {
            const {x1, x2, y1, y2} = shape

            return(
                <line key={i} x1={x1} x2={x2} y1={y1} y2={y2} strokeWidth={0.1} stroke="#3c11c6" />
            )
        })}
    </svg>
}

export default DecenterVisualizer
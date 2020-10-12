import React, {useState, useMemo, useCallback,useEffect} from 'react'
import './Visualizer.css'



const makeShape  = (svgHeight, centerCoor) => {

    const randomXPoint = Math.floor(Math.random()*svgHeight)
    const randomYPoint = Math.floor(Math.random()*svgHeight)
   


    return {
        circleCoor: {
            cx: randomXPoint,
            cy: randomYPoint,
            radius: 0
        },
        lineCoor: {
            x1: randomXPoint,
            y1: randomYPoint,
            x2: centerCoor,
            y2: centerCoor,
            strokeWidth: 0.1,
            stroke: "#3c11c6"
        }
    }
}


const CenterVisualizer = () => {

    const [shapes, setShapes] = useState([])
    const [svgHeight] = useState(400)
    const centerPoint = useMemo(() => svgHeight/2 , [svgHeight])


    
    const animate = useCallback(()=>{

    
        setInterval(()=> {
            setShapes(shapes => [...shapes, makeShape(svgHeight, centerPoint)])

        }, .1)
    }, [setShapes,svgHeight, centerPoint])

    useEffect(()=> animate() )
    return(
        <svg onClick={animate} height={svgHeight} width={svgHeight}>
            <circle cx={centerPoint} cy={centerPoint} r="2" stroke="black" fill="black"> </circle>
            {shapes.map((shape, i) => {
                const {circleCoor, lineCoor} = shape
                const {cx, cy, radius} = circleCoor
                const {x1, y1, x2, y2, strokeWidth, stroke} = lineCoor


                return(
                <React.Fragment key={i}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={strokeWidth} stroke={stroke} />
                    <circle cx={cx} cy={cy} r={radius} stroke="black" fill="black"/>

                </ React.Fragment>
                )
            })}
        </svg>
    )
}

export default CenterVisualizer
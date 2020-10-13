import React, { useState, useMemo, useCallback, useEffect } from "react"
import "./Visualizer.css"

const makeShape = (svgHeight, centerCoor) => {
	const randomXPoint = Math.floor(Math.random() * svgHeight)
	const randomYPoint = Math.floor(Math.random() * svgHeight)
	const colors = ["#3c11c6"]
	return {
		circleCoor: {
			cx: randomXPoint,
			cy: randomYPoint,
			radius: 0,
		},
		lineCoor: {
			x1: randomXPoint,
			y1: randomYPoint,
			x2: centerCoor,
			y2: centerCoor,
			strokeWidth: 0.1,
			stroke: colors[Math.floor(Math.random() * colors.length)],
		},
	}
}

const CenterVisualizer = () => {
	const [shapes, setShapes] = useState([])
	const [svgHeight] = useState(700)
	const centerPoint = useMemo(() => svgHeight / 2.5, [svgHeight])

	const animate = useCallback(() => {
		setInterval(() => {
			setShapes(shapes => [...shapes, makeShape(svgHeight, centerPoint)])
		}, 1)
	}, [setShapes, svgHeight, centerPoint])

	useEffect(() => animate())
	return (
		<svg id='center' height={svgHeight} width={svgHeight}>
			<circle
				id='one'
				cx={centerPoint}
				cy={centerPoint}
				r={svgHeight / 30}
				stroke='#3c11c6'
				fill='#3c11c6'>
				{" "}
			</circle>
			{shapes.map((shape, i) => {
				const { circleCoor, lineCoor } = shape
				const { cx, cy, radius } = circleCoor
				const { x1, y1, x2, y2, strokeWidth, stroke } = lineCoor

				return (
					<React.Fragment key={i}>
						<line
							x1={x1}
							y1={y1}
							x2={x2}
							y2={y2}
							strokeWidth={strokeWidth}
							stroke={stroke}
						/>
						<circle cx={cx} cy={cy} r={radius} stroke='black' fill='black' />
					</React.Fragment>
				)
			})}
			<use href='#one' />
		</svg>
	)
}

export default CenterVisualizer

import React from "react"
import "./App.css"
import CenterVisualizer from "./components/CenterVisualizer"
import DecenterVisualizer from "./components/DecenterVisualizer"

const App = () => {
	return (
		<div className='svg-container'>
			{/* <CenterVisualizer /> */}
			<DecenterVisualizer />
		</div>
	)
}

export default App

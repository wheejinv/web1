import React from 'react';
import './Chart.scss'
import ChartBar from "./ChartBar";

function Chart(props) {
	let max = Math.max(...props.dataPoints.map(dataPoint => dataPoint.value));

	return (
		<div className="chart">
			{props.dataPoints.map(dataPoint => {
				return <ChartBar
					key={dataPoint.label}
					value={dataPoint.value}
					maxValue={max}
					label={dataPoint.label}
				/>
			})}
		</div>
	);
}

export default Chart;

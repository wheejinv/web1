import React from 'react';
import './ChartBar.scss'

function ChartBar(props) {
	// 바 차트를 구성하는데 value 를 어떻게 표현할건지가 중요함.
	// css 속성에서 fill 하는 부분의 값을 변경 예정.
	let barFillHeight = '0%';

	if (props.maxValue > 0) {
		barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
	}

	console.log(barFillHeight);

	return (
		<div className="chart-bar">
			<div className="chart-bar__inner">
				<div
					className="chart-bar__fill"
					style={{
						height: barFillHeight,
					}}/>
			</div>
			<div className="chart-bar__label">{props.label}</div>
		</div>
	);
}

export default ChartBar;

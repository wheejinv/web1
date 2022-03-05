import React from 'react';
import {render, screen} from "@testing-library/react";
import Greeting from "./Greeting";



test('renders Hello World as a text', () => {
	// 테스트의 Three A
	// Arrange: 테스트 데이터 설정
	// Act: 테스트를 실행
	// Assert: 아웃풋을 검토

	// Arrange
	render(<Greeting/>);

	// Act
	// ... nothing

	// Assert
	const helloWorldElement = screen.getByText('Hello World!');
	expect(helloWorldElement).toBeInTheDocument();
})

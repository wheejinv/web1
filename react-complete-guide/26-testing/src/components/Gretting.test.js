import React from 'react';
import {render, screen} from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from '@testing-library/user-event';

// Test Suites 그룹을 위한 문법
describe('Greeting component', () => {
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

	// 버튼이 눌렀을 때 상태가 변하는지 테스트
	test('on button clicked', () => {
		// Arrange
		render(<Greeting/>);

		// Act
		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement);

		// Assert
		const changedElement = screen.getByText('Changed!');
		expect(changedElement).toBeInTheDocument();
	});

	test('does not render "good to see you" if the button was clicked', () => {
		// Arrange
		render(<Greeting />);

		// Act
		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement)

		// Assert
		const outputElement = screen.queryByText('good to see you', { exact: false });
		expect(outputElement).toBeNull();
	});
})

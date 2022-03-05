import React from 'react';
import {render, screen} from "@testing-library/react";
import Async from "./Async";

describe('Async component', () => {
	test('renders posts if request succeeds', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => ([
				{"id": 1, "title": "first post"}
			])
		})
		render(<Async/>)

		// timeout default 1초
		const listItemElements = await screen.findAllByRole('listitem');
		expect(listItemElements).not.toHaveLength(0);
	});
})

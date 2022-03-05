import React from 'react';
import {render, screen} from "@testing-library/react";
import Async from "./Async";

// https://stackoverflow.com/questions/48433783/referenceerror-fetch-is-not-defined
global.fetch = require("node-fetch");

describe('Async component', () => {
	test('renders posts if request succeeds', async () => {
		render(<Async/>)

		// timeout default 1초
		const listItemElements = await screen.findAllByRole('listitem');
		expect(listItemElements).not.toHaveLength(0);
	});
})

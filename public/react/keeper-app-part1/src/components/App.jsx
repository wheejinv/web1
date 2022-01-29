import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';

import './App.scss'

export default function App() {
	return (
		<div>
			<Header />
			<Note />
			<Footer />
		</div>
	)
}

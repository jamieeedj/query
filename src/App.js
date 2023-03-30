import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Landing from './views/landing/index';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Landing />} />
			</Routes>
		</Router>
	);
}

export default App;

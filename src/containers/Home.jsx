import React from 'react';
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount = () => {
		document.title = 'Startupida'
	}

	render = () => (
		<React.Fragment>
		<Navbar />
		Siteza1
		<Footer />
		</React.Fragment>
	);
}

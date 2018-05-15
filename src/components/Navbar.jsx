import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
		<nav class="dt w-100 border-box pa3 ph5-ns bg-dark-blue-gray">
			<a class="dtc v-mid mid-gray link dim w-25" href="#" title="Home">
				<img src="http://tachyons.io/img/logo.jpg" class="dib w2 h2 br-100" alt="Startup-X" />{' '}
			</a>
			<div class="dtc v-mid w-75 tr">
				<Link class="link white f8 f5-ns dib mr3 mr4-ns white b ttu hover-amber link pointer" to="">
					Services
				</Link>
				<Link class="link white f8 f5-ns dib mr3 mr4-ns white b ttu hover-amber link pointer" to="#" >
					Blog
				</Link>
				<Link class="link white f8 f5-ns dib mr3 mr4-ns white b ttu hover-amber link pointer" to="#">
					Join Us
				</Link>
			</div>
		</nav>)
	}
}

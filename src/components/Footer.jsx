import React from 'react';

export default class Footer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<footer class="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l bg-dark-blue-gray">
				<nav class="f6 fw6 ttu tracked tc center">
					<a class="link hover-amber link pointer white dib mr3" href="#" title="Home">
						Startupida
					</a>
					<a class="link hover-amber link pointer white dib mr3" href="#" title="About">
						Sobre nós
					</a>
					<a class="link hover-amber link pointer white dib mr3" href="#" title="Store">
						Cases
					</a>
					<a class="link hover-amber link pointer white dib" href="#" title="Contact">
						Contate-nos
					</a>
				</nav>
			</footer>
		);
	}
}

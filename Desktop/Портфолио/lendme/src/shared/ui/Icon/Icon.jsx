// import React from 'react';
import './Icon.scss';
import Icons from './icons/sprite.svg';
export const Icon = (props) => {
	const { id, className = 'svg' } = props;

	return (
		<svg className={className}>
			<use xlinkHref={`${Icons}#${id}`}></use>
		</svg>
	);
};

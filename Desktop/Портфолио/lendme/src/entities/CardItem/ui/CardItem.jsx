// import React from 'react';
import './CardItem.scss';

export const CardItem = (props) => {
	const { className, data } = props;

	return (
		<li className={`cardItem ${className}`}>
			<img className="cardItem__img" src={data.src} alt={data.text} />
			<p className="cardItem__text">{data.text}</p>
		</li>
	);
};

// import React from 'react';
import { cardProductData } from '../../shared/consts/cardProductData';
import { CardProduct } from '../../entities/CardProduct';
import './Card.scss';

export const Card = () => {
	return (
		<div className="cart">
			<h2 className="cart__title">Популярные вещи</h2>
			<ul className="cart__items">
				{cardProductData.map((item) => (
					<CardProduct key={item.id} data={item} />
				))}
			</ul>
		</div>
	);
};

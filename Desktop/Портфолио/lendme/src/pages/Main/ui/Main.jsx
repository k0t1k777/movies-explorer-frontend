// import React from 'react';
import { Card } from '../../../widgets/Card/Card';
import { Categories } from '../../../widgets/Categories/Categories';
import { MainPageInfo } from '../../../widgets/MainPageInfo/MainPageInfo';
import './Main.scss';
export const Main = () => {
	return (
		<main className="main">
			<MainPageInfo />
			<Categories />
			<Card />
		</main>
	);
};

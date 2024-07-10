// import React from 'react';
import './MainPageInfo.scss';
import img from './img/main-img.png';

export const MainPageInfo = () => {
	return (
		<section className="mainPage">
			<div className="mainPage__box">
				<h1 className="mainPage__title">Используйте, не покупайте</h1>
				<p className="mainPage__subtitle">
					<span>LendMe</span> — cервис аренды вещей
				</p>
			</div>
			<img src={img} alt="изображение на главной странице" />
		</section>
	);
};

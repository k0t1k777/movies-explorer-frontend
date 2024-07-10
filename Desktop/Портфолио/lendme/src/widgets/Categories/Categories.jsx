import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import './Categories.scss';
import { cardItemsData } from '../../shared/consts/cardItemsData';
import { CardItem } from '../../entities/CardItem/';
import { Icon } from '../../shared/ui/Icon/Icon';
import { Button } from '../../shared/ui/Button/Button';

export const Categories = () => {
	const [statusBtnSlide, setStatusBtnSlide] = useState({
		start: true,
		end: false,
	});
	const swiper = React.useRef(null);

	const handleDisBtn = () => {
		if (swiper.current && swiper.current.swiper) {
			setStatusBtnSlide({
				start: swiper.current.swiper.isBeginning,
				end: swiper.current.swiper.isEnd,
			});
		}
	};

	const changeSlideBtn = (side) => {
		if (swiper.current && swiper.current.swiper) {
			side === 'prev'
				? swiper.current.swiper.slidePrev()
				: side === 'next'
					? swiper.current.swiper.slideNext()
					: console.log('Слайд не найден');
		}
	};

	return (
		<section className="categories">
			<h2 className="categories__title">Выберите категорию</h2>
			<div className="categories__inner">
				<Button
					className="button__coral button__coral_slider"
					onClick={() => changeSlideBtn('prev')}
					disabled={statusBtnSlide.start}
				>
					<Icon className="svg-slider" id="left-btn" />
				</Button>
				<Swiper
					// slidesPerView={5}
					// spaceBetween={48}
					onSlideChange={() => {
						handleDisBtn();
					}}
					tag="ul"
					freeMode={true}
					pagination={{
						clickable: true,
					}}
					modules={[FreeMode]}
					breakpoints={{
						640: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
						1624: {
							slidesPerView: 5,
							spaceBetween: 48,
						},
					}}
					ref={swiper}
					className="categories__items"
				>
					{cardItemsData.map((item) => (
						<SwiperSlide key={item.id} className="categories__items">
							<CardItem
								// key={item.id}
								data={item}
								className="cardItem__categories"
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<Button
					className="button__coral button__coral_slider"
					onClick={() => changeSlideBtn('next')}
					disabled={statusBtnSlide.end}
				>
					<Icon className="svg-slider" id="right-btn" />
				</Button>
			</div>
		</section>
	);
};

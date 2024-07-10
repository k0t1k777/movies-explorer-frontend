import './SwiperSubtitle.scss';

const SwiperSubtitle = (props) => {
	const { titles, activeIndex, OnTitleClick } = props;

	return (
		<div className="swiper-subtitle">
			{titles.map((title, index) => (
				<div
					key={index}
					className={`subtitle-item ${index === activeIndex || titles.length === 1 ? 'active' : ''}`}
					onClick={() => OnTitleClick(index)}
				>
					{title}
				</div>
			))}
		</div>
	);
};

export default SwiperSubtitle;

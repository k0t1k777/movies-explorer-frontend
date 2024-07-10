// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button/Button';
import image from '../images/404_img.png';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
	const navigate = useNavigate();

	const goToHomePage = () => {
		navigate('/');
	};

	return (
		<section className="not-found" aria-label="Страница не найдена">
			<div className="not-found__inner">
				<div className="not-found__box">
					<h2 className="not-found__header">404</h2>
					<p className="not-found__description">
						Кажется, вы заблудились! Запрашиваемая вами страница не найдена.
					</p>
					<Button className="button__coral" onClick={goToHomePage}>
						На главную
					</Button>
				</div>

				<img
					className="not-found__img"
					src={image}
					alt="человек и бинокль, смотрит вдаль"
				/>
			</div>
		</section>
	);
};

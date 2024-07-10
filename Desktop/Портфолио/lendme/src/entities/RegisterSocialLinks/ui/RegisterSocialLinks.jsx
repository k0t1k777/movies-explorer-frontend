// import React from 'react';
import { Button } from '../../../shared/ui/Button/Button';
import { Icon } from '../../../shared/ui/Icon/Icon';
import './RegisterSocialLinks.scss';

export const RegisterSocialLinks = ({ data }) => {
	return (
		<div className="social-links">
			<p className="social-links__header">или войдите через VK ID</p>
			<div className="social-links__list">
				{data.map((item) => (
					<Button className="button__blue" key={item.id}>
						<Icon className="svg-social_link" id={item?.iconId} />
						{item.text && <span>{item.text}</span>}
					</Button>
				))}
			</div>
			<p className="social-links__info">
				Регистрируясь, вы принимаете{' '}
				<a href="" className="social-links__link social-links__link-rules">
					правила и условия
				</a>
			</p>
		</div>
	);
};

// import React from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import './Popup.scss';
export const Popup = (props) => {
	const { isOpen, children, onClosePopup, btnCls } = props;

	return (
		isOpen && (
			<section className="popup" aria-label="всплывающая форма">
				<div className="popup__container">
					{children}
					<Button className={btnCls} onClick={onClosePopup}>
						<Icon id="closeBtn" className="svg-close" />
					</Button>
				</div>
			</section>
		)
	);
};

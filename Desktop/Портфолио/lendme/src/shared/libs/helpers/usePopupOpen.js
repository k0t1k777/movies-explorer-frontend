import React from 'react';

// кастомный хук для отработки открытия попапа
// и его закрытие по овелею, иконке и кнопке esc
export default function usePopupOpen() {
	const [isOpenPopup, setIsOpenPopup] = React.useState(false);

	const handleOpenPopup = () => {
		setIsOpenPopup(true);
		document.body.style.overflow = 'hidden';
	};

	const handleClosePopup = React.useCallback(() => {
		setIsOpenPopup(false);
		document.body.style.overflow = 'auto';
	}, []);

	React.useEffect(() => {
		function closeByEscape(evt) {
			if (evt.key === 'Escape') {
				handleClosePopup();
			}
		}

		function closeByOverlayClick(evt) {
			if (
				evt.target.classList.contains('popup') ||
				evt.target.classList.contains('button__close') ||
				evt.target.classList.contains('svg-close')
			) {
				handleClosePopup();
			}
		}

		if (isOpenPopup) {
			document.addEventListener('keydown', closeByEscape);
			document.addEventListener('click', closeByOverlayClick);
		}

		return () => {
			document.removeEventListener('keydown', closeByEscape);
			document.removeEventListener('click', closeByOverlayClick);
		};
	}, [isOpenPopup, handleClosePopup]);

	return {
		isOpenPopup,
		handleOpenPopup,
		handleClosePopup,
	};
}

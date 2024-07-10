import { useState } from 'react';
import './GeneralForm.scss';
import { Popup } from '../../../shared/ui/Popup/Popup';
import SwiperSubtitle from '../../../shared/ui/SwiperSubtitle/SwiperSubtitle';
import {
	LoginForms,
	RegistrationForm,
	PasswordResetForm,
	ConfirmRegistration,
} from '../';
import { formTitles } from '../../../shared/consts/constants';

export const GeneralForm = (props) => {
	const { isOpenPopup, onClosePopup } = props;
	const [activeIndex, setActiveIndex] = useState(0);

	const handleTitleClick = (index) => {
		setActiveIndex(index);
	};

	const formsData = [
		{ titles: formTitles.login, component: LoginForms },
		{ titles: formTitles.login, component: RegistrationForm },
		{ titles: formTitles.password, component: PasswordResetForm },
		{ titles: formTitles.registerConfirm, component: ConfirmRegistration },
	];

	const { titles, component: FormComponent } = formsData[activeIndex];

	return (
		<Popup isOpen={isOpenPopup} btnCls="button__close">
			<SwiperSubtitle
				titles={titles}
				activeIndex={activeIndex}
				OnTitleClick={handleTitleClick}
			/>
			<FormComponent
				onTitleClick={handleTitleClick}
				onClosePopup={onClosePopup}
			/>
		</Popup>
	);
};

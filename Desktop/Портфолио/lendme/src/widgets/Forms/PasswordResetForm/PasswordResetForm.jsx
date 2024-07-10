// import React from 'react';

import { InitialForm } from '../../../entities/InitialForm';
import { validationSchemaAuthForms } from '../../../shared/consts/validationSchemas';
import useFormAndValidation from '../../../shared/libs/helpers/useFormAndValidation';
import { RegisterSocialLinks } from '../../../entities/RegisterSocialLinks';
import { Input } from '../../../shared/ui/Input/Input';
import { Button } from '../../../shared/ui/Button/Button';

export const PasswordResetForm = ({ onTitleClick, onClosePopup }) => {
	const { form, errors, inputType, isFormValid, handleInputChangeEmail } =
		useFormAndValidation(
			{
				emailOrPhone: '',
			},
			validationSchemaAuthForms
		);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
		onClosePopup();
	};

	return (
		<>
			<InitialForm formClass="forms" onSubmit={handleSubmit}>
				<Input
					inputClass="input__form"
					inputName="emailOrPhone"
					inputType={inputType}
					inputValue={form.emailOrPhone}
					placeholder="Телефон или адрес электронной почты"
					inputLabelText="Телефон или E-mail*"
					onChange={handleInputChangeEmail}
					inputInfo="Введите ваш E-mail указанный при регистрации. Мы отправим на него временный пароль"
					inputError={errors.emailOrPhone}
				/>

				<Button
					className="button__coral button__coral_forms"
					type="submit"
					disabled={!isFormValid}
				>
					Отправить пароль
				</Button>
				<a href="#" className="loginForm__link" onClick={() => onTitleClick(0)}>
					Назад
				</a>
			</InitialForm>
			<RegisterSocialLinks
				data={[
					{
						id: 1,
						iconId: 'vk',
						text: 'Войти с VK ID',
					},
				]}
			/>
		</>
	);
};

// import React from 'react';

import { InitialForm } from '../../../entities/InitialForm';
import { validationSchemaAuthForms } from '../../../shared/consts/validationSchemas';
import useFormAndValidation from '../../../shared/libs/helpers/useFormAndValidation';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/Input/Input';

export const ConfirmRegistration = ({
	onClosePopup,
	userNumber = '+7 (999) 999-99-99',
}) => {
	const { form, errors, isFormValid, handleChange } = useFormAndValidation(
		{
			confirmСode: '',
		},
		validationSchemaAuthForms
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
		onClosePopup();
	};

	return (
		<InitialForm formClass="forms" onSubmit={handleSubmit}>
			<p className="forms__info">
				Для завершения регистрации введите код, высланный на номер{' '}
				<span>{userNumber}</span>
			</p>
			<Input
				inputClass="input__form"
				inputName="confirmСode"
				inputType="confirmСode"
				inputValue={form.confirmСode}
				placeholder="Введите код"
				inputLabelText="Код подтверждения*"
				onChange={handleChange}
				inputError={errors.confirmСode}
			/>
			<p className="forms__timer-text">Отправить код повторно через 50 сек.</p>
			<Button
				className="button__coral button__coral_forms"
				type="submit"
				disabled={!isFormValid}
			>
				Отправить код
			</Button>
		</InitialForm>
	);
};

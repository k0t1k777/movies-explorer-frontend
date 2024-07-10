import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { EMAILREGEX } from '../../consts/constants';

// кастомный хук валидации
const useFormAndValidation = (initialState, validationSchema) => {
	const [form, setForm] = useState(initialState);
	const [errors, setErrors] = useState({});
	const [isFormValid, setIsFormValid] = useState(false);
	const [isActiveInput, setIsActiveInput] = useState({});
	const [inputType, setInputType] = useState('email');

	const handleFocus = (evt) => {
		setIsActiveInput(evt.target);
		const input = evt.target;
		setForm({
			...form,
			activeInput: input.name,
		});
	};

	const handleBlur = () => {
		setForm({
			...form,
			activeInput: '',
		});
	};

	// обновляет значения полей формы
	const updateFormInput = (data) => {
		setForm((prevForm) => ({
			...prevForm,
			...data,
		}));
	};

	// сброс формы
	const resetForm = () => {
		setForm(initialState);
		setErrors(null);
	};

	const handleValidation = async (
		input,
		form,
		setErrors,
		setIsFormValid,
		validationSchema
	) => {
		try {
			await validationSchema.validateAt(input.name, form);
			setErrors((prevErrors) => ({ ...prevErrors, [input.name]: '' }));
		} catch (error) {
			setIsFormValid(false);
			setErrors((prevErrors) => ({
				...prevErrors,
				[input.name]: error.message,
			}));
		}
	};

	const handleChange = async (evt) => {
		const input = evt.target;
		const updatedForm = { ...form, [input.name]: input.value };
		setForm(updatedForm);

		await handleValidation(
			input,
			updatedForm,
			setErrors,
			setIsFormValid,
			validationSchema
		);
	};

	const handleInputChangeEmail = (e) => {
		const { value } = e.target;
		setInputType(EMAILREGEX.test(value) ? 'email' : 'tel');
		handleChange(e);
	};

	const handleSelectChange = (selectedObj) => {
		setForm((prevState) => ({
			...prevState,
			...selectedObj,
		}));
	};

	useEffect(() => {
		const isValid =
			Object.values(form).every((value) => value !== '') &&
			!Object.values(errors).some((value) => value !== '');
		setIsFormValid(isValid);
	}, [form, errors]);

	return {
		form,
		setForm,
		errors,
		isFormValid,
		inputType,
		handleChange,
		handleInputChangeEmail,
		handleSelectChange,
		resetForm,
		handleFocus,
		handleBlur,
		updateFormInput,
		isActiveInput,
	};
};

export default useFormAndValidation;

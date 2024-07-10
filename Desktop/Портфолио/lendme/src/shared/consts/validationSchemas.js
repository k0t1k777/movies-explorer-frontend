import * as Yup from 'yup';
import {
	MINLENGTHNAME,
	MINLENGTPASSWORD,
	MAX_LENGT_CONFIRM_CODE,
	NAMEREGEX,
	PHONEREGEX,
	validationMessages,
	CODEREGEX,
} from './constants';

const validationSchemaAuthForms = Yup.object().shape({
	username: Yup.string()
		.min(MINLENGTHNAME, validationMessages.name_min)
		.matches(NAMEREGEX, validationMessages.name)
		.required(validationMessages.required),
	phone: Yup.string()
		.trim()
		.matches(PHONEREGEX, validationMessages.phone)
		.required(validationMessages.required),
	email: Yup.string()
		.trim()
		.email(validationMessages.email)
		.required(validationMessages.required),

	emailOrPhone: Yup.string()
		.required(validationMessages.required)
		.test('is-email-or-phone', validationMessages.emailOrPhone, (value) => {
			if (!value) return false;

			if (Yup.string().email().isValidSync(value)) return true;

			if (PHONEREGEX.test(value)) return true;

			return false;
		})
		.trim(),

	password: Yup.string()
		.min(MINLENGTPASSWORD, validationMessages.current_password)
		.required(validationMessages.required),
	confirmPass: Yup.string()
		.oneOf([Yup.ref('password'), null], validationMessages.re_password) // проверка на совпадение с паролем
		.required(validationMessages.required),
	confirmСode: Yup.string()
		.max(MAX_LENGT_CONFIRM_CODE, validationMessages.confirmation_code_max)
		.matches(CODEREGEX, validationMessages.confirmation_code)
		.required(validationMessages.required),
});

const validationSchemaSearch = Yup.object().shape({
	search: Yup.string()
		.matches(NAMEREGEX, validationMessages.search)
		.required(validationMessages.required),
});
export { validationSchemaAuthForms, validationSchemaSearch };

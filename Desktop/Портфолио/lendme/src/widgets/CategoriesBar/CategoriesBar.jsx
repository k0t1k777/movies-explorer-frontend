// import React from 'react';
import './CategoriesBar.scss';
import { Button } from '../../shared/ui/Button/Button';
import { LinkIcons } from '../../shared/ui/Links/LinksIcons/LinkIcons';
import { Input } from '../../shared/ui/Input/Input';
import { Icon } from '../../shared/ui/Icon/Icon';
import { validationSchemaSearch } from '../../shared/consts/validationSchemas';
import useFormAndValidation from '../../shared/libs/helpers/useFormAndValidation';

export const CategoriesBar = () => {
	const { form, errors, handleChange } = useFormAndValidation(
		{
			search: '',
		},
		validationSchemaSearch
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
	};

	return (
		<section
			className="categories-bar"
			aria-label="панель выбора категорий и поиска"
		>
			<Button className="button__coral button__coral_categories">
				<Icon id="list-btn" className="svg" />
				Все категории
			</Button>
			<div className="categories-bar__inner">
				<form className="categories-bar__input-box" onSubmit={handleSubmit}>
					<Input
						inputClass="input__search"
						onChange={handleChange}
						inputName="search"
						inputValue={form.search}
						inputError={errors.search}
					/>
					<Button
						className="button__coral button__coral_search"
						type="submit"
						// disabled={!isFormValid}
					>
						Найти
					</Button>
				</form>
				<LinkIcons
					title="Город"
					className="linkIconCategories"
					iconId="map-city"
					classIcon="svg"
				/>
			</div>
		</section>
	);
};

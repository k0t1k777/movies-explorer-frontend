// import React from 'react';
import './InitialForm.scss';

export const InitialForm = (props) => {
	const { title, formClass, onSubmit, children } = props;

	return (
		<section className={`initial-form ${formClass}`} aria-label={title}>
			<div className="initial-form__container">
				<form
					className="initial-form__inner"
					name="form"
					onSubmit={onSubmit}
					autoComplete="off"
				>
					<fieldset className="initial-form__box">{children}</fieldset>
				</form>
			</div>
		</section>
	);
};

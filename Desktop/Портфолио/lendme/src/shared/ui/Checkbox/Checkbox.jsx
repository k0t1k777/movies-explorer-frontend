import { useState } from 'react';
import './Checkbox.scss'; // Подключаем файл стилей для компонента

const Checkbox = ({ label }) => {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<div className="checkbox-container">
			<input
				className="checkbox-input"
				type="checkbox"
				checked={isChecked}
				onChange={handleCheckboxChange}
				id="customCheckbox"
			/>
			<label htmlFor="customCheckbox" className="checkbox-label">
				{label}
			</label>
		</div>
	);
};

export default Checkbox;

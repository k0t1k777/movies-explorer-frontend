import {useState} from 'react';

export default function useValidate() {
  const [isValid, setIsValid] = useState(false)
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const {name, value} = event.target
    setIsValid(event.target.closest('form').checkValidity());
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: event.target.validationMessage})
  };

  const resetForm = () => {
    setIsValid(false);
    setValues({});
    setErrors({});
  }

  return {
    isValid,
    values,
    errors,
    setIsValid,
    handleChange,
    setValues,
    resetForm,
    setErrors,
  }
}
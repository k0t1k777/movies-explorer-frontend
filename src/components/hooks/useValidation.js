import {useState} from 'react';

export default function useValidate() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false)

  const handleChange = (event) => {
    const {name, value} = event.target
    setIsValid(event.target.closest('form').checkValidity());
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: event.target.validationMessage})
  };

  const resetForm = () => {
    setValues({});
    setErrors({});
    setIsValid(false)
  }

  return {
    values,
    errors,
    isValid,
    setValues,
    setErrors,
    setIsValid,
    handleChange,
    resetForm
  }
}
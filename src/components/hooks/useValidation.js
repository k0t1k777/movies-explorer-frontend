import {useCallback, useState} from 'react';

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

  const reset = useCallback((data = {}) => {
    setValues(data)
    setErrors({})
    setIsValid({})
    setIsValid(false)
  },[])

  return {
    isValid,
    values,
    errors,
    setIsValid,
    handleChange,
    setValues,
    reset,
    resetForm,
    setErrors,
  }
}
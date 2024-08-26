import * as Yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const loginSchema = Yup.object({
  email: Yup.string().matches(emailRegex, 'Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const registerSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().matches(emailRegex, 'Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[\p{Ll}\p{Lu}])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>/?]).+$/u,
      'Password must contain at least 1 letter, 1 number, and 1 special character'
    )
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

/* eslint-disable prettier/prettier */

import * as Yup from 'yup';

  export const emailSchema = Yup.string().required('field is required') .email('Invalid email address');

  export const passwordSchema = Yup.string() .required('field is required') .min(6, 'Password must be at least 6 characters');
 
  export const fullNameSchema =  Yup.string().required('field is required').min(1,'Name must be have at least one letter');
 
  export const carNumberSchema = Yup.string().required('field is required').matches(/^[0-9]{7,8}$/, 'Invalid Car number');

  export const phoneNumberSchema = Yup.string().required('field is required').matches(/^05[0-5][0-9]{7}$/, 'Invalid phone number');
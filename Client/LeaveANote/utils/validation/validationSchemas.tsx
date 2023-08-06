/* eslint-disable prettier/prettier */

import * as Yup from 'yup';

/**
 * Schema for validating an email address.
 */
export const emailSchema = Yup.string()
  .required('Field is required')
  .email('Invalid email address');

/**
 * Schema for validating a password.
 */
export const passwordSchema = Yup.string()
  .required('Field is required')
  .min(6, 'Password must be at least 6 characters');

/**
 * Schema for validating a name.
 */
export const nameSchema = Yup.string()
  .required('Field is required')
  .min(1, 'Name must have at least one letter');

/**
 * Schema for validating a car number.
 */
export const carNumberSchema = Yup.string()
  .required('Field is required')
  .matches(/^[0-9]{7,8}$/, 'Invalid Car number');

/**
 * Schema for validating a phone number.
 */
export const phoneNumberSchema = Yup.string()
  .required('Field is required')
  .matches(/^05[0-5][0-9]{7}$/, 'Invalid phone number');

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@apollo/client';
import {
  Formik, Field, Form, FormikHelpers,
} from 'formik';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Head from 'next/head';
import { ADD_USER } from '../graphql/queries';

import { useAuth } from '../context/state';

import { ISignUpFromProps } from '../interfaces';

import { SignupSchema } from '../utils/validationSchemas';

function SignUpForm() {
  const router = useRouter();
  const { user } = useAuth();
  if (user) {
    router.push('/dashboard');
  }
  const [AddUser] = useMutation(ADD_USER);
  const [error, setError] = useState('');

  const signUp = async (
    values: ISignUpFromProps,
    { setSubmitting }: FormikHelpers<ISignUpFromProps>,
  ) => {
    try {
      await localStorage.removeItem('token');
      const { data } = await AddUser({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
        },
      });

      if (data) {
        localStorage.setItem('token', data.createUser.token);
        window.location.href = '/dashboard';
      }
      setSubmitting(false);
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  const FormContainer = styled.div`
    z-index: 1;
    position: relative;
    border-radius: 15px;
    background: white;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.15);
    padding: 30px;
    margin: auto;
    max-width: 100%;
    width: 540px;
  `;

  const FormHeading = styled.h1`
    font-family: 'zenon', 'serif';
    color: #5acee8;
    font-weight: 500;
    font-size: 36px;
    margin-bottom: 15px;
  `;
  const FormLabel = styled.label`
    color: #8c96a3;
    font-size: 14px;
    font-weight: 700;
  `;
  const FormInput = styled.div`
    margin-bottom: 15px;
  `;

  const FormSubmit = styled.button`
    background-color: #ffcc01;
    border-radius: 15px;
    height: 40px;
    color: #fff;
    font-weight: 700;
  `;

  const Container = styled.div`
    padding: 50px 0px;
    background: #5acee8;
  `;

  const FormError = styled.div`
    color: red;
    font-size: 12px;
    margin-top: 5px;
  `;

  const FormLabelCheckbox = styled.div`
    color: #616b77;
    font-size: 14px;
  `;

  return (

    <Container id="signUp-form">
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <FormContainer>
        <FormHeading>Sign Up Form</FormHeading>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            accept: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={signUp}
        >
          {({ errors, touched }) => (
            <Form>
              <FormInput>
                <FormLabel>Email</FormLabel>
                <Field
                  id="email"
                  name="email"
                  placeholder="Email"
                  aria-describedby="emailHelp"
                  className="form-control inputField"
                />
                {errors.email && touched.email ? (
                  <FormError id="errors-email" data-testid="errors-email">
                    {errors.email}
                  </FormError>
                ) : null}
              </FormInput>

              <FormInput>
                <FormLabel>Password</FormLabel>
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="form-control inputField"
                />
                {errors.password && touched.password ? (
                  <FormError data-testid="errors-password" id="errors-password">
                    {errors.password}
                  </FormError>
                ) : null}
              </FormInput>

              <FormInput>
                <FormLabel>Confirm Password</FormLabel>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  className="form-control inputField"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <FormError
                    data-testid="errors-confirmPassword"
                    id="errors-confirmPassword"
                  >
                    {errors.confirmPassword}
                  </FormError>
                ) : null}
              </FormInput>

              <FormInput>
                <FormLabel>First Name</FormLabel>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  className="form-control inputField"
                />
                {errors.firstName && touched.firstName ? (
                  <FormError
                    data-testid="errors-firstName"
                    id="errors-firstName"
                  >
                    {errors.firstName}
                  </FormError>
                ) : null}
              </FormInput>

              <FormInput>
                <FormLabel>Last Name</FormLabel>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  className="form-control inputField"
                />
                {errors.lastName && touched.lastName ? (
                  <FormError data-testid="errors-lastName" id="errors-lastName">
                    {errors.lastName}
                  </FormError>
                ) : null}
              </FormInput>

              <FormInput>
                <FormLabel>Phone Number</FormLabel>
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  type="text"
                  className="form-control inputField"
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <FormError
                    data-testid="errors-phoneNumber"
                    id="errors-phoneNumber"
                  >
                    {errors.phoneNumber}
                  </FormError>
                ) : null}
              </FormInput>

              <FormLabelCheckbox className="form-group position-relative">
                <Field
                  id="accepted"
                  data-testid="accepted"
                  type="checkbox"
                  name="accept"
                  className="mr-2"
                />
                <label aria-controls="accepted" htmlFor="accepted">
                  Accepted terms & conditions
                </label>
                {errors.accept && touched.accept ? (
                  <FormError data-testid="errors-accepted" id="errors-accepted">
                    {errors.accept}
                  </FormError>
                ) : null}
              </FormLabelCheckbox>

              <FormSubmit
                id="submit"
                data-testid="signUpSubmit"
                className="w-100 border-0 mt-3"
              >
                Sign Up
              </FormSubmit>
            </Form>
          )}
        </Formik>
        {error && <FormError className="text-danger">{error}</FormError>}
      </FormContainer>
    </Container>
  );
}

export default SignUpForm;

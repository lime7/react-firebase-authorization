import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { Formik } from 'formik';
import * as yup from 'yup';

import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '../firebase';
import { setUser } from '../redux/slices/userSlice';

export default function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);

  const schema = yup.object().shape({
    name: yup.string().trim().required('Name is a required field'),
    email: yup.string().trim().required('Email is a required field'),
    password: yup.string().required('Password is a required field'),
  });

  const handleSubmit = useCallback(async (values) => {
    const { name, email, password } = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, {
          displayName: name,
          emailVerified: true,
        });
        dispatch(setUser({ user }));
        console.log('Registration');
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log('An error occured: ', errorCode, errorMessage);

        if (error.code === 'auth/email-already-in-use') {
          console.log('Email Already in Use');
          setStatus('Email Already in Use');
        }
      });
  }, []);

  return (
    <>
      <h2>Registration</h2>
      <Formik
        validateOnChange
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          dirty,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            {status && <Alert variant="danger">{status}</Alert>}
            <Form.Group className="position-relative mb-3">
              <div className="position-relative">
                <Form.Control
                  type="text"
                  name="name"
                  className={`${
                    errors.name && touched.name ? ' is-invalid' : ''
                  } ${!errors.name && touched.name ? ' is-valid' : ''}`}
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
              {errors.name && (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.name}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="position-relative mb-3">
              <div className="position-relative">
                <Form.Control
                  type="text"
                  name="email"
                  className={`${
                    errors.email && touched.email ? ' is-invalid' : ''
                  } ${!errors.email && touched.email ? ' is-valid' : ''}`}
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              {errors.email && (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="position-relative mb-3">
              <Form.Control
                className={`${
                  errors.password && touched.password ? ' is-invalid' : ''
                } ${!errors.password && touched.password ? ' is-valid' : ''}`}
                type="password"
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Password"
              />

              {errors.password && (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <div className="d-flex align-items-center">
              <Button
                variant="primary"
                type="submit"
                disabled={!(isValid && dirty)}
              >
                Submit
              </Button>
              <span className="px-4">or</span>
              <Link className="btn btn-link" to="/login">
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { Formik } from 'formik';
import * as yup from 'yup';

import { auth, signInWithEmailAndPassword } from '../firebase';
import { setUser } from '../redux/slices/userSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);

  const schema = yup.object().shape({
    email: yup.string().trim().required('Email is a required field'),
    password: yup.string().required('Password is a required field'),
  });

  const handleSubmit = useCallback(async (values) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUser({ user }));
        console.log('Success');
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;

        if (error.code === 'auth/wrong-password') {
          console.log('Please check the Password');
          setStatus('Please check the Password');
        }
        if (error.code === 'auth/user-not-found') {
          console.log('Please check the Email');
          setStatus('Please check the Email');
        }
      });
  }, []);
  return (
    <>
      <h2>Log In</h2>

      <Formik
        validateOnChange
        initialValues={{ email: '', password: '' }}
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
          status,
        }) => (
          <Form onSubmit={handleSubmit}>
            {status && <Alert variant="danger">{status}</Alert>}
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
              <Link className="btn btn-link" to="/registration">
                Registration
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

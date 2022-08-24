import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { auth, signOut, onAuthStateChanged } from '../firebase';
import { logout } from '../redux/slices/userSlice';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    userStore: { user },
  } = useSelector((state) => ({ userStore: state.userStore }));

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // dispatch(setUser(user.refreshToken));
        // console.log(user.refreshToken);
      } else {
        // dispatch(setUser(undefined));
      }
    });
  }, [auth, dispatch]);

  const handleSubmit = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        console.log('LogOut');
        navigate('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('An error occured: ', errorCode, errorMessage);
      });
  };

  return (
    <>
      <h1>Hello, {user.user.displayName}</h1>

      <div className="d-flex pt-5">
        <Link className="btn btn-link" to="/login">
          Login
        </Link>

        <Button variant="secondary" onClick={handleSubmit}>
          Logout
        </Button>
      </div>
    </>
  );
}

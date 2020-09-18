import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }

    history.push(ROUTES.HOME);
  };

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.png" alt="iPhone profile" />
      </div>
      <div className="flex justify-center items-center flex-col w-2/5">
        <img
          src="/images/logo.png"
          alt="Instagram"
          className="mt-2 w-6/12 mb-4"
        />
        {error && <p>{error}</p>}

        <form
          onSubmit={handleLogin}
          method="POST"
          className="bg-white p-4 border border-gray-primary"
        >
          <input
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary bg-gray-background rounded mb-2"
            type="text"
            placeholder="Email address"
            onChange={({ target }) => setEmailAddress(target.value)}
          />
          <input
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary bg-gray-background rounded mb-2"
            type="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            disabled={isInvalid}
            type="submit"
            className="bg-blue-medium text-white w-full rounded h-8 font-bold"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

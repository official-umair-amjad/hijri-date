// components/SignupForm.tsx
import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabaseClient';

type SignupFormProps = {
  location: string;
};

const SignupForm: React.FC<SignupFormProps> = ({ location }) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Using Supabase magic link for passwordless authentication
    const { error } = await supabase.auth.signUp({
      email,
      password: 'AsalamAlikum'
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setEmail('')
      setMessage('Verify your email, Check your email for the verification link!');
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <center>

        <h2 className='text-teal-900 text-lg  drop-shadow'>Signup for Islamic Events Notification</h2>
      {message && <p className='text-yellow-800 mb-2 animate-pulse'>{message}</p>}
      </center>
      <form onSubmit={handleSignup} className='shadow-xl rounded-full border mt-2'>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='p-2 px-4 bg-gray-50/75 text-gray-700 rounded-l-full w-3/4'
        />
        <button type="submit" className='w-1/4 px-2 cursor-pointer py-2 rounded-r-full hover:bg-teal-700/75 bg-teal-700'>Subscribe</button>
      </form>
    </div>
  );
};

export default SignupForm;

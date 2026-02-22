import { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const { login } = useAuth();
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
    console.log(inputs)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = inputs; // Destructure from inputs state
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email: email,
        password: password
      });
      

      const { access, refresh } = response.data;
      login(access);  // Call login from context to store user and token
      localStorage.setItem('refresh_token', refresh);
      
      // const { access, refresh } = response.data;
      // localStorage.setItem('access_token', access);
      console.log("access: ", access)

      // localStorage.setItem('refresh_token', refresh);
      // console.log("refresh: ", refresh)
      
      // Redirect to the profile page after successful login
      navigate("/")

      // Redirect or update UI as needed
      console.log('Login successful');
      alert(JSON.stringify(inputs, null, 2));
    }
    catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const messages = Object.values(errorData).flat().join('\n');
        setError(messages);  // Show detailed validation messages
        console.error(messages);
      } else {
        setError('An unexpected error occurred.');
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <label>Username:
        <input
          type="text"
          name="username" 
          value={inputs.username || ""}
          onChange={handleChange} 
        />
      </label> */}

      <label>Email:
        <input
          type="email"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>Password:
        <input
          type="password"
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
        />
      </label>
      <br />
      <input type="submit" />

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error.split('\n').map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      )}
    </form>
  )
}

export default LoginForm
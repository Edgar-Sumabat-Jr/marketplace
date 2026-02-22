import { useState } from 'react'
import axios from 'axios';

function RegisterForm() {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        console.log(inputs)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password, password2 } = inputs; // Destructure from inputs state
        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username: username,
                email: email,
                password: password,
                password2: password2,
            });
            console.log("response data: ", response.data)
            console.log("username: ", username)
            console.log("email: ", email)
            console.log("password: ", password)
            console.log("password2: ", password2)

            setError('');

            // Redirect or update UI as needed
            console.log('Registration successful');
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
            <label>Username:
                <input
                    type='text'
                    name='username'
                    value={inputs.username || ''}
                    onChange={handleChange}
                />
            </label>
    <br />
            <label>Email:
                <input
                    type='email'
                    name='email'
                    value={inputs.email || ''}
                    onChange={handleChange}
                />
            </label>
    <br />
            <label>Password:
                <input
                    type='password'
                    name='password'
                    value={inputs.password || ''}
                    onChange={handleChange}
                />
            </label>
    <br />
            <label>Confirm Password:
                <input
                    type='password'
                    name='password2'
                    value={inputs.password2 || ''}
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

export default RegisterForm

// {
//     "username": "asd",
//     "email": "asd@gmail.com",
//     "password": "123asd@123",
//     "password2": "123asd@123"
// }
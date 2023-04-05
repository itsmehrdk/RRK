import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Login =()=>{
    const navigate = useNavigate();
    const [data, setData] = useState({
      email: '',
      pass: '',
    });
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
  
    const fun1 = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
  
      // Email validation
      if (name === 'email') {
        if (!value.trim()) {
          setEmailError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          setEmailError('Email is invalid');
        } else {
          setEmailError('');
        }
      }
  
      // Password validation
      if (name === 'pass') {
        if (!value.trim()) {
          setPassError('Password is required');
        } else if (value.length < 6) {
          setPassError('Password should be at least 6 characters');
        } else {
          setPassError('');
        }
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(data);
  
      // Check for errors
      if (emailError !== '' || passError !== '') {
        console.log('Wrong Email ID');
        return;
      }
  
      fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.status === 401) {
            throw new Error('Unauthorized');
          }
          return res.json();
        })
        .then((resData) => {
          localStorage.setItem('myInfo', JSON.stringify(resData.data));
          navigate('/home');
        })
        .catch((err) => {
          console.log('err', err);
        });
    };

      
    return(
        <div className="auth-form-container">
            
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Email ID* :<input required type='text' onChange={fun1} name='email' value={data.email} placeholder='Enter your EMAIL ID'/><br/></label>
                <label>Password* : <input required type='password' onChange={fun1} name='pass' value={data.pass} placeholder='Enter your password'/><br/></label>
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </form>
            <p>Don't have an account? <Link style={{color: 'black'}} to='/'>SignUp here.</Link></p>
        </div>
    )
}
export default Login

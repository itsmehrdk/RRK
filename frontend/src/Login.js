import React,{useState} from 'react'
import { Link,useNavigate,NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const Login =()=>{
    const navigate = useNavigate();
    const [data, setData] = useState({
      email: '',
      pass: '',
    });
    const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
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
                <label>Email ID* :<input required type='text' onChange={fun1} name='email' value={data.email} placeholder='Enter your EMAIL ID'/></label>
                <label>Password* : <div className="input-group">
             <input required type={showPassword ? 'text' : 'password'} onChange={fun1} id="pass" name="pass" value={data.pass} placeholder="Enter your Password"/>
             <div className="input-group-append">
              <span className="input-group-text1" type="password" onClick={togglePasswordVisibility}>
               <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
             </div>
            </div></label>
                <button type='submit' onClick={handleSubmit}>Submit</button>
                <p style={{color:"black",fontWeight:"bold"}}>Forgot Password?  <NavLink to="/forgot-password">Click Here</NavLink> </p>
            </form>
            <p>Don't have an account? <Link style={{color: 'black'}} to='/'>SignUp here.</Link></p>
        </div>
    )
}
export default Login

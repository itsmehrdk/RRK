import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
const SignUp =(props)=>{
    const navigate=useNavigate()
    const [input,setInput]=useState({
        fName:"",
        lName:"",
        email:"",
        pass:"",
        cpass:""
    })
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInput()) {
          console.log(input);
          }
          
    }
    
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const [showCpassword, setShowCpassword] = useState(false);

  const toggleCpasswordVisibility = () => {
    setShowCpassword((prevState) => !prevState);
  };

    const fun1=(e)=>{
        const {name,value}=e.target
        setInput({...input,[name]:value})
        console.log(input,'rrrrrrrrrrrr')
    }
    const validateInput = () => {
        var isValid = true;
      
        // Check first name
        if (!input.fName) {
          isValid = false;
         
        }
      
        // Check email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.email || !emailRegex.test(input.email)) {
          isValid = false;
          
        }
      
        // Check password
        const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Check password
         if (!input.pass || !strongPasswordRegex.test(input.pass)) {
          isValid = false;
          // Show error message
        }

      
        // Check confirm password
        if (input.pass !== input.cpass) {
          setIsPasswordMatch(false);
          return;
          
        }
      
        return isValid;
      }
      
    
    const fun2=()=>{
        if (validateInput()) {
            fetch('http://localhost:3001/register', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(input)
            }).then(() => {
              console.log('chal gya')
              navigate('/login')
            }).catch((err) => {
              console.log(err, 'errr')
            });
          }
    }
    return(
        <div >
            <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit} >
            
            <h2 >Create Your account</h2>    
            
            <label>First Name*:<input required id="fName" type='text' onChange={fun1} name='fName' value={input.fName} placeholder='Enter your first name'/></label>                        
            <label>Last Name: <input type='text' onChange={fun1} id="lName" name='lName' value={input.lName} placeholder='Enter your last name'/></label>
            <label>Email ID*:  <input required type='text' onChange={fun1} id="email" name='email' value={input.email} placeholder='Enter your EMAIL ID'/></label>
            <label> New Password*:
            <div className="input-group">
             <input required type={showPassword ? 'text' : 'password'} onChange={fun1} id="pass" name="pass" value={input.pass} placeholder="Enter your Password"/>
             <div className="input-group-append">
              <span className="input-group-text1" type="password" onClick={togglePasswordVisibility}>
               <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
             </div>
            </div>
           </label>
            <label>Confirm Password*:
            <div className="input-group"><input required type='password' onChange={fun1} id="cpass" name='cpass' value={input.cpass} placeholder='Confirm your Password'/>
            <div className="input-group-append">
              <span className="input-group-text1" type="password" onClick={toggleCpasswordVisibility}>
               <FontAwesomeIcon icon={showCpassword ? faEyeSlash : faEye} />
              </span>
             </div>
             </div>
             </label>
            {!isPasswordMatch && (
        <div className="error-message">Passwords do not match</div>
      )}
             < button className='submit' type='submit'  onClick={fun2}>Submit</button>
            </form>
            <p>  Already have an account?<Link style={{color: 'black'}} to='/login'> Login here.</Link></p>
            </div> 
        </div>
    )
}
export default SignUp
import { useContext, useState } from 'react';
import * as Component from '../sign/component';
import '../sign/sign.css';
import { useNavigate } from 'react-router-dom';
import { Datacontext } from '../../Context/userContext';

function SignInUpForm() {
  const {userName} =useContext(Datacontext);
  const {setName} =useContext(Datacontext);
  const [signin, toggle] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [preferences, setPreference] = useState('');
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://ed-tech-backend-t5i5.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, email, password,role,preferences}),
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful:", data);
        toggle(true);
      } else {
        console.error("Signup failed:", data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://ed-tech-backend-t5i5.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signinEmail, password: signinPassword }),
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log("Sign-in successful:", data);
        const setItem = localStorage.setItem("userID",JSON.stringify(data.user._id))
        localStorage.setItem("userID", JSON.stringify(data.user._id));
        localStorage.setItem("userName", data.user.userName);
        setName(data.user.userName);
        console.log(setItem)
        navigate('/Home');
        console.log(data.user.userName)
        setName(data  .user.userName)
      } else {
        console.error("Sign-in failed:", data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };


  return (
    <div className='body'>
      <Component.Container className='container'>
        <Component.SignUpContainer signinIn={signin}>
          <Component.Form onSubmit={handleSignUp}>
            <Component.Title>Create Account</Component.Title>
            <Component.Input type='text' placeholder='Name' value={userName} onChange={(e) => setName(e.target.value)} />
            <Component.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Component.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Component.Select
                 className="custom-select"
                 value={role}
                 onChange={(e) => setRole(e.target.value)}
            >
          <option value="" disabled>Select your role</option>
           <option value="undergraduate">Undergraduate</option>
          <option value="master">Master</option>
            </Component.Select>
            <Component.Select
                 className="custom-select"
                 value={preferences}
                 onChange={(e) => setPreference(e.target.value)}
            >
          <option value="" disabled>Select your Preference</option>
           <option value="undergraduate">JEE</option>
          <option value="master">NEET</option>
          <option value="master">UPSC</option>
            </Component.Select>
            <Component.Button type="submit">Sign Up</Component.Button>
          </Component.Form>
        </Component.SignUpContainer>

        <Component.SignInContainer signinIn={signin}>
          <Component.Form onSubmit={handleSignIn}>
            <Component.Title>Sign in</Component.Title>
            <Component.Input type='email' placeholder='Email' value={signinEmail} onChange={(e) => setSigninEmail(e.target.value)} />
            <Component.Input type='password' placeholder='Password' value={signinPassword} onChange={(e) => setSigninPassword(e.target.value)} />
            <Component.Button type="submit" className='signin'>Sign In</Component.Button>
            <Component.chotabutton>Forget Password</Component.chotabutton>
          </Component.Form>
        </Component.SignInContainer>

        <Component.OverlayContainer signinIn={signin}>
          <Component.Overlay signinIn={signin}>
            <Component.LeftOverlayPanel signinIn={signin}>
              <Component.Title>Welcome Back!</Component.Title>
              <Component.Paragraph>
                To keep connected with us please login with your personal info
              </Component.Paragraph>
              <Component.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Component.GhostButton>
              
            </Component.LeftOverlayPanel>

            <Component.RightOverlayPanel signinIn={signin}>
              <Component.Title>Hello, Friend!</Component.Title>
              <Component.Paragraph>
                Enter Your personal details and start your journey with us
              </Component.Paragraph>
              <Component.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Component.GhostButton> 
              
            </Component.RightOverlayPanel>
          </Component.Overlay>
        </Component.OverlayContainer>
      </Component.Container>
    </div>
  );
}

export default SignInUpForm;

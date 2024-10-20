import {useRef, useState, useEffect,} from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.[a-z])(?=[A-Z])(?=.[0-9])(?=.[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect (() => {
        userRef.current.focus();
    }, []);

    useEffect (() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect (() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect (() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handlesubmit = async (e) =>{
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid Entr');
            return;
        }
        console.log(user, pwd);
        setSuccess(true)
    }

  return (
    <>
    {success ? (
            <section>
                <h1>Success</h1>
                <p>
                    <a href='#'>Sign In</a>
                </p>
            </section>
    ) : (
    <section className="  ">
        <p ref={errRef} className={errMsg ? "errmsg" :"offscreen"} aria-live='assertive'>{errMsg}</p>
      <h1 className="text-3xl font-bold underline">Register</h1>
      <form onSubmit={handlesubmit} className='mt-10 text-left'>
          <label htmlFor='username'>
            Username:
            <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} color='blue'/>
            </span>
            <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} color='red'/>
            </span>
          </label>

          <input
          type='text'
          id='username'
          ref={userRef}
          autoComplete='off'
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? 'false' :'true'}
          aria-describedby='uidnote'
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          placeholder='username'
          className=' w-full border'
          />

          <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
            <fontAwesomeIcon icon={faInfoCircle}/>
            4 to 24 characters.<br/>
            Must begin with a letter.<br/>
            Letters, numbers, underscores, hyphens are allowed.
          </p>

          <label htmlFor='password'>
            Password
            <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>

          <input
          type='password'
          id='password'
          onChange={(e) => setPwd(e.target.value)}
          required
          aria-invalid={validPwd ? 'false' :'true'}
          aria-describedby='pwdnote'
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          placeholder='username'
          className=' w-full border'
          />

          <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
            <fontAwesomeIcon icon={faInfoCircle}/>
            8 to 24 characters.<br/>
            Must include uppercase and lowercase letters, a number and special characters.<br/>
            Allowed special characters.<span aria-label='exclamation'>!</span>
            <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span> <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
          </p>

          <label htmlFor='confirm_pwd'>
            confirm Password:
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>

          <input
          type='password'
          id='confirm_pwd'
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          aria-invalid={validMatch ? 'false' :'true'}
          aria-describedby='confirmnote'
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          placeholder='username'
          className=' w-full border'
          />

          <p id='confirmnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
            <fontAwesomeIcon icon={faInfoCircle}/>
            Must match the first password input field.
          </p>
      
          <button disabled={!validName || !validPwd || !validMatch ? true : false}
          className='bg-red-600 h-5 rounded text-white '>Sign Up</button>
    </form>
    <p>
        Already Registered?<br/>
        <span>
            {/* router link here*/}
            <a href='#'>Sign In</a>
        </span>
    </p>
    </section>
    )}
  </>
  );
}

export default Register
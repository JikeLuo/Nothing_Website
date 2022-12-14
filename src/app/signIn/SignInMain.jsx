import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import login from '../../image/login.webp'
import {Link, useNavigate} from "react-router-dom";
import {selectAccount, addNewUserToLocalStorage, getNothingUserData} from "../../redux/slice/AccountReducer";


import CheckBox from '../globalComponent/checkbox'
import TextInput from '../globalComponent/textInput'
import Button from '../globalComponent/button'


const LoginMain = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f4f4f2;
    display: flex;

    #poster {
        height: 100%;
        width: 65%;
        overflow: hidden;
        > img {
            height: 100%;
            object-fit: cover;
            transform: translateX(-10vw);
        }
    }
    > .login {
        height: 100%;
        width: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        > .container * {
            font-family: N82;
            font-weight: lighter;
        }
        > .container {
            font-family: N82;
            display: flex;
            flex-direction: column;
            overflow: visible;
            > h1 {
                margin: 1.5rem 0;
            }
            > .notice {
                color: red;
                margin-left: 2%;
                font-family: N55;
            }
            > span {
                > a {
                    color: #3f5779;
                    border-bottom: 2px dotted #3f5779;
                    margin-left: 0.5rem;
                } 
            }
            .checkbox {
                display: flex;
                align-items: center;
                > span {
                    letter-spacing: 0.05rem;
                    > a {
                        color: #3f5779;
                        border-bottom: 2px dotted #3f5779;
                        margin-left: 0.2rem;
                    }
                } 
            }
        }   
    }`

export default function App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {cartItems} = useSelector(selectAccount)

    const [policyState, setPolicyState] = useState(false)
    const [clickPolicyState, setClickPolicyState] = useState(false)
    const [blankState, setBlankState] = useState(false)
    const [exitState, setExitState] = useState(false)
    const [blankPasswordState, setBlankPasswordState] = useState(false)
    const [checkPasswordState, setCheckPasswordState] = useState(false)
    const [blankUserNameState, setBlankUserNameState] = useState(false)
    const emailRef = useRef(undefined)
    const passwordRef = useRef(undefined)
    const checkPasswordRef = useRef(undefined)
    const userNameRef = useRef(undefined)


    /* ???????????????????????????????????????????????? */
    const checked = (attr) => void setPolicyState(attr)


    /* ????????????????????????????????? */
    const checkEmailExit = () => emailRef.current.value in getNothingUserData ? setExitState(true) : setExitState(false)


    /* ???????????????????????? localStorage ??? ????????????????????? */
    const addNewUser = () => {
        dispatch(addNewUserToLocalStorage({
            userName: userNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            cart: cartItems,
        }))
        navigate('/login')
    }

    /* ??????????????????????????????????????? checkbox */
    const submit = () => {
        setBlankState(false)
        setClickPolicyState(false)
        setBlankPasswordState(false)
        setCheckPasswordState(false)
        setBlankUserNameState(false)

        if (!emailRef.current.value) return setBlankState(true)
        else if (!policyState) return setClickPolicyState(true)
        else if (!passwordRef.current.value) return setBlankPasswordState(true)
        else if (passwordRef.current.value !== checkPasswordRef.current.value) return setCheckPasswordState(true)
        else if (!userNameRef.current.value) return setBlankUserNameState(true)
        else if (!blankState && !clickPolicyState && !blankPasswordState && !checkPasswordState && !blankUserNameState) addNewUser()
    }


    return (
        <LoginMain>

            <div id='poster'>
                <img src={login} alt=''/>
            </div>

            <div className='login'>
                <div className='container'>

                    <h1>??????</h1>

                    {blankState && <span className='notice'>Email ??? ??????????????????</span>}
                    {exitState && <span className='notice'>Email ????????????</span>}
                    {blankPasswordState && <span className='notice'>??????????????????</span>}
                    {checkPasswordState && <span className='notice'>????????????????????????</span>}
                    {blankUserNameState && <span className='notice'>?????????????????????</span>}

                    <TextInput type={'text'} placeholder={'????????????'} textref={userNameRef}/>
                    <TextInput type={'text'} placeholder={'??????????????????'} textref={emailRef} onChange={checkEmailExit}/>
                    <TextInput type={'password'} placeholder={'??????'} textref={passwordRef}/>
                    <TextInput type={'password'} placeholder={'????????????'} textref={checkPasswordRef}/>

                    <div className='checkbox'>
                        <CheckBox id={'policy'} isCheck={(attr) => checked(attr)}/>
                        <span>?????????????????????Nothing???<a href="https://tw.nothing.tech/pages/privacy-policy">????????????</a></span>
                    </div>

                    {clickPolicyState && <span className='notice'>????????????????????? Nothing ????????????</span>}

                    <div className='checkbox'>
                        <CheckBox id={'communication'}/>
                        <span>??????????????? Nothing ?????????</span>
                    </div>

                    <Button onClick={submit} innerHTML={'(??????)'}/>
                    <span>??????????????? <Link to='/login'>??????</Link></span>
                </div>
            </div>
        </LoginMain>
    );
}
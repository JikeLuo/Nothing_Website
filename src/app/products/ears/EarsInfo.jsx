import React, {useState, useRef} from 'react';
import styled from "styled-components";
import {globalVar} from "../../../asset/globalVar";
import {useDispatch} from "react-redux";
import {addSetEarsColor} from "../../../redux/slice/ProductReducer";
import {addChangeTotalPrice, addIsShowCart, addToCart} from "../../../redux/slice/AccountReducer";
import Button from '../../globalComponent/button'

const {transition, primaryColor} = globalVar

const Info = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    background-color: ${primaryColor};
    width: 100%;
    padding: 10% 20px 0;
    font-family: N82;
    overflow: visible;
    
    .innerInfo {
        display: flex;
        justify-content: space-between;
        span {
            display: block;
            letter-spacing: 2px;
        }
    }
    h1 {
        margin-top: 10%;
        margin-bottom: 5%;
        font-size: 60px;
        font-weight: lighter;
        letter-spacing: 3px;
    }
    p {
        font-size: 18px;
        width: 80%;
        letter-spacing: 1.5px;
        line-height: 130%;
        margin: 1px 0;
    }
    legend {
        font-size: 17px;
        margin: 5% 0;
        letter-spacing: 2px;
    }`
const BtnBox = styled.div`
    width: 120%;
    display: flex;
    input[type='radio'] {
        opacity: 0;
    }
    input[type='radio']:checked + label {
        color: white;
        background-color: black;
    }
    label {
        position: relative;
        width: 150px;
        height: 25px;
        border-radius: 12.5px;
        border: 1px solid #b1b3b3;
        margin: 0 2%;
        overflow: hidden;
        ${transition}
        > i {
            position: absolute;
            top: 50%;
            left: 5%;
            display: block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            transform: translateY(-50%)
        }
        span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
        }
        &:hover {
            transform: scaleX(1.05);
        }
    }`
const Price = styled.div`
    margin-top: 10%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .priceItem {
        font-size: 17px;
        letter-spacing: 2px;
    }
`
const EmailBox = styled.div`
    overflow: visible;
    width: 80%;
    p {
        width: 150%;
        margin: 10% 0;
    }
    > .email {
        width: 160%;
        height: 40px;
        font-size: 18px;
        > input[type='text'] {
            width: 60%;
            background-color: transparent;
            border: none;
            outline: none;
            color: #002f6c;
            padding-left: 3%;
            font-family: N82;
            font-size: 18px;
            letter-spacing: 2px;
        }
        > input[type='submit'] {
            width: 25%;
            border: none;
            background-color: transparent;
            font-family: N82;
            font-size: 17px;
            letter-spacing: 1.5px;
            cursor: pointer;
        }
    }`


export default function App() {
    const [colorState, setColorState] = useState(3);
    const dispatch = useDispatch()
    const emailRef = useRef()

    const selectEarsColor = (props) => {
        setColorState(props === 'white' ? 3 : 4)
        dispatch(addSetEarsColor(props))
    }

    const addIntoCart = () => {
        dispatch(addToCart(colorState))
        dispatch(addChangeTotalPrice())
        dispatch(addIsShowCart({mask: 'show'}))
        setTimeout(() => dispatch(addIsShowCart({cart: 'show'})), 0)
    }


    return (
        <Info>
            <div className="innerInfo"><span>001.</span><span>Introducing Ear (1).</span></div>
            <h1>ear ( 1 )</h1>
            <p>??????11.6mm????????????</p>
            <p>Teenage Engineering???????????????</p>
            <p>ANC???????????????</p>
            <p>????????????34??????????????????</p>
            <p>iOS???Android????????????</p>
            <legend>Select ??????</legend>

            <BtnBox onChange={(e) => addToCart(e)}>
                <input type="radio" id='white' name='color' onChange={() => selectEarsColor('white')}/>

                <label htmlFor="white">
                    <i style={{backgroundColor: 'white'}}/>
                    <span>??????</span>
                </label>

                <input type="radio" id='black' name='color' onChange={() => selectEarsColor('black')}/>

                <label htmlFor="black">
                    <i style={{backgroundColor: 'black'}}/>
                    <span>??????</span>
                </label>
            </BtnBox>

            <Price>
                <div className='priceItem'>Price</div>
                <span className='priceItem'>NT$3,190.00</span>
            </Price>

            <EmailBox>
                <p>???????????????????????????</p>
                <form target='#' method='get' className='email'>
                    (<input type="text" placeholder='????????????????????????' ref={emailRef}/>
                    <input type='submit' value='?????????'/>)
                </form>
            </EmailBox>

            <Button innerHTML={'(???????????????)'} backgroundColor={'#002f6c'} onClick={() => addIntoCart()}/>

        </Info>
    );
}
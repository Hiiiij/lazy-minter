// import './OutlineButton.css'

// const ExtendedComponent = Component.extend`
//   color: green;
// `

import React from 'react'
import styled from 'styled-components'

const OutlineButton = styled.button`
border-outline: white;
  color: white;
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: .6rem;
  border: solid 0.0625rem white;
  background: transparent;
`

const CTAButton = styled.button`
border-outline: white;
  color: black;;
  font-size: 1.5rem;
  padding: 8px 16px;
  border-radius: 1.5rem;
  border: solid 0.0625rem white;
  background: transparent;
  padding:24px, 32px;
  background-color:white;
  font-weight:600;
  &:active {
    background: linear-gradient(to right, #DF25E2, #33D4DF, #413EDC);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ${'' /* max-width:clamp(3rem,50rem,75%) */}
`


// export default function Button({ onClick, text, btnType }) {
//   if (btnType === 'outline') {
//     return <OutlineButton onClick={onClick}>
// //       {text}
// //     </OutlineButton>
//   } else {

//     return <CTAButton onClick={onClick}> {text} </CTAButton>
//   }

// }



// export default function Button({ onClick, text, btnType }) {
//   return (btnType === 'outline') ? <OutlineButton onClick={onClick}> {text}</OutlineButton> :
//     <CTAButton onClick={onClick}> {text} </CTAButton>
// }

// const Button = ({ onClick, text, btnType })=> {
//   return (btnType === 'outline') ? <OutlineButton onClick={onClick}> {text}</OutlineButton> :
//     <CTAButton onClick={onClick}> {text} </CTAButton>
// }

export const Button = ({ onClick, text, btnType, className }) => (btnType === 'outline') ? <OutlineButton onClick={onClick} className={className}> {text}</OutlineButton> : <CTAButton onClick={onClick} className={className}> {text} </CTAButton>

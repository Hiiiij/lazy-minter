import React from 'react'
import styled from 'styled-components'

const EmphasizedH2 = styled.h2`
  font-size: calc(32/16)rem;
  font-family: "Sofia Black";
  background: linear-gradient(to right, #DF25E2, #33D4DF, #413EDC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent
`

const DefaultH2 = styled.h2`
  font-size: calc(40/16)rem;
  font-family: "Sofia SemiBlack";
  color: white;
`

/*
;*/


export default function Subheader({ text, mode }) {
  // const props = { text: 'hellp'}
  // 1. const { text } = props
  // 2. const text = props.text
  // 3. const text = props['text']
  return mode === 'emphasized' ?
    <EmphasizedH2>  {text}</EmphasizedH2> :
    <DefaultH2>  {text}</DefaultH2>
}

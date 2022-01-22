import React from 'react'
import styled from 'styled-components'

const H1 = styled.h1`
font-size: calc(40/16)rem;
color:white;
`


export default function Header({ text }) {
  // const props = { text: 'hellp'}
  // 1. const { text } = props
  // 2. const text = props.text
  // 3. const text = props['text']
  return (
    <H1>
      {text}
    </H1>
  )
}
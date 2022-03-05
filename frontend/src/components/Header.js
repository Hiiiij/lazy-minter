import React from 'react'
import styled from 'styled-components'

const H1 = styled.h1`
font-size: calc(40/16)rem;
color:white;
text-align: center;
  margin-bottom: 18px;
`
export default function Header({ text, className }) {
  // const props = { text: 'hellp'}
  // 1. const { text } = props
  // 2. const text = props.text
  // 3. const text = props['text']
  return (
    <H1 className={className}>
      {text}
    </H1>
  )
}

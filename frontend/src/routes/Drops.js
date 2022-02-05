import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button'
import Minter from '../components/Minter'
import { mintNFT } from '../util/interact'

const MinterWrapper = styled.div`
  max-height: 80%;
  overflow: hidden;
  flex: 1;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`

const MintButtonWrapper = styled.div`
  ${'' /* display: grid;
    place-content: center; */}

  text-align: center;
  display: flex;
  justify-content: center;
`
const MintButton = styled(Button)`
width:100%;
  ${'' /* flex: 1; */}
`

export default function Drops({ status, onStatusChanged }) {
  const [url, setURL] = useState('')

  const onMintPressed = async () => {
    onStatusChanged('getting random nft')
    const BACKEND_URL = process.env.NODE_ENV === 'production' ? 'https://lazyminter.herokuapp.com' : 'http://localhost:8000'
    const response = await axios.get(`${BACKEND_URL}/getRandomNFT`)
    console.log(response)
    const { secure_url: secureURL } = response.data

    onStatusChanged('minting NFT...')

    const { success, status: statusResponse } = await mintNFT(secureURL)
    onStatusChanged(statusResponse)
    if (success) {
      setURL(secureURL)
    }
  }

  return (
    <>
      <MinterWrapper>
        <Minter
          url={url}
        />
      </MinterWrapper>
      <p style={{ 'text-align': 'center', wordWrap: 'break-word' }}>{status}</p>
      <MintButtonWrapper>
        <MintButton
          onClick={onMintPressed}
          text='Mint NFT'
        />
      </MintButtonWrapper>
    </>
  )
}

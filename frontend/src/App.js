// import './App.css';
import Minter from './components/Minter'
import styled, { ThemeProvider } from 'styled-components'
import { BREAKPOINTS, QUERIES } from './util/constans'
import axios from 'axios'

import {
  connectWallet,
  getCurrentWalletConnected, mintNFT
} from './util/interact'
import { useState, useEffect } from 'react'
import { Button } from './components/Button'
const AppWrapper = styled.div`
  /* max-width: 80vh;
  max-height: 80vh; */
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content: space-around;
  padding: 60px 100px;
  margin: 0 auto;
  text-align: left;
  width: clamp(300px, 70%, 600px);
  padding: min(32px, 5vw);
`

const Header = styled.header`
display: flex;
position:sticky;
height:3rem;
`

const Nav = styled.nav`
text-decoration:none;
flex: 1;
display:flex;
width: 100%;
max-height: 3rem;
justify-content:space evenly;
display: ${prop => prop.top ? 'none' : 'initial'};
@media ${QUERIES.tabletAndUp} {
    display: ${prop => prop.top ? 'initial' : 'none'}
  }
  ${'' /* @media ${QUERIES.desktopAndUp} {
    display: ${prop => !prop.top ? 'none' : 'initial'}
  } */}

`

const MinterWrapper = styled.div`
  max-height: 80%;
  overflow: scroll;
  flex: 1;
  /* Hide scrollbar for Chrome, Safari and Opera */
&::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

`

const ConnectButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  flex: 1;
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

function App() {
  const [status, setStatus] = useState('')
  const [url, setURL] = useState('')

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
  }

  const [walletAddress, setWallet] = useState('')
  useEffect(() => {
    async function initialiseWallet() {
      const { address, status: statusResponse } = await getCurrentWalletConnected()

      setWallet(address)
      setStatus(statusResponse)

      addWalletListener()
    }
    initialiseWallet()
  }, [])

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0])
          // setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet('')
          setStatus('🦊 Connect to Metamask using the top right button.')
        }
      })
    } else {
      setStatus(
        <p>
          {' '}
          🦊{' '}
          <a target='_blank' rel='noreferrer' href='https://metamask.io/download.html'>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      )
    }
  }
  const onMintPressed = async () => {
    setStatus('getting random nft')
    const BACKEND_URL = process.env.NODE_ENV === 'production' ? 'https://lazyminter.herokuapp.com' : 'http://localhost:8000'
    const response = await axios.get(`${BACKEND_URL}/getRandomNFT`)
    console.log(response)
    const { secure_url: secureURL } = response.data

    setStatus('minting NFT...')

    const { success, status: statusResponse } = await mintNFT(secureURL)
    setStatus(statusResponse)
    if (success) {
      setURL(secureURL)
    }
  }

  return (
    <ThemeProvider theme={{ queries: QUERIES, breakpoints: BREAKPOINTS }}>
      <AppWrapper>
        <Header>
          <Nav top>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '30px' }}>
              <li>Drops</li>
              <li>About</li>
              <li>Community</li>
            </ul>
          </Nav>
          <ConnectButtonWrapper>
            <Button
              onClick={connectWalletPressed}
              btnType='outline'
              text={
                walletAddress.length > 0
                  ? 'Connected: ' +
                  String(walletAddress).substring(0, 6) +
                  '...' +
                  String(walletAddress).substring(38)
                  : 'Connect Wallet'
              }
            />
          </ConnectButtonWrapper>
        </Header>
        <MinterWrapper>
          <Minter
            url={url}
          />
        </MinterWrapper>
        <p style={{ color: 'red', 'text-align': 'center', wordWrap: 'break-word' }}>{status}</p>
        <MintButtonWrapper>
          <MintButton onClick={onMintPressed}
            text='Mint NFT'
          />
        </MintButtonWrapper>
        <Nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '30px', position: 'fixed' }}>
            <li>Drops</li>
            <li>About</li>
            <li>Community</li>
          </ul>
        </Nav>
      </AppWrapper>
    </ThemeProvider>

  )
}

export default App

import ImageFlasher from './ImageFlasher.js'
import Title from './Title.js'
import Subheader from './Subheader.js'
import styled, { useTheme } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`

const Minter = ({ url }) => {
  const { queries } = useTheme()
  console.log(queries)

  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  const title = 'Meta Cowboy'

  return (
    <Wrapper className='Minter'>

      <br />
      {url && <img style={{ width: '100%' }} alt='minted nft' src={url} />}
      {!url &&
        <>
          <Title text={title} />
          <ImageFlasher images={['https://res.cloudinary.com/daqgugk5f/image/upload/v1641987238/ynwl59gj6gtgdateob2t.png', 'https://res.cloudinary.com/daqgugk5f/image/upload/v1641984304/bvdpqso5rhhtnogez2r4.png', 'https://res.cloudinary.com/daqgugk5f/image/upload/v1641735603/wjvvtebcm9uh1ah1pltx.png']} />
          <Subheader mode='emphasized' text={'This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. "'} />
          <Subheader text={'You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting."'} />
        </>}

    </Wrapper>
  )
}

export default Minter

import ImageFlasher from './ImageFlasher.js'
import Header from './Header.js'
import Subheader from './Subheader.js'
import styled, { useTheme } from 'styled-components'
import Paragraph from './Paragraph.js'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  width:100%;  
`

const StyledSubheader = styled(Subheader)`
  margin-bottom: 8px;
`
const ImageWrapper = styled.div`
  width: clamp(60%, 70%,90vw);
  margin-bottom: 24px;

`

const ParagraphWrapper = styled(Paragraph)`
 overflow-y: scroll;
  ${'' /* border: solid 1px pink; */}
  max-height: 20vh;
    /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; 
  scrollbar-width: none;  
`

const Minter = ({ url, isSuccess }) => {
  const { queries } = useTheme()
  console.log(queries)

  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  const title = 'Meta Cowboy'
  const text = `This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.s revealed to you after miniting.
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.s revealed to you after miniting.
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.s revealed to you after miniting.You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.s revealed to you after miniting.
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.s revealed to you after miniting.
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.s revealed to you after miniting.You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.s revealed to you after miniting.
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.s revealed to you after miniting.
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.This is a special edition of artwork avaliable exclusively for fans as a  suprise drop. 
You have a chance to get 1 of 1000 unique collection pieces revealed to you after miniting.s revealed to you after miniting.
`

  return (
    <Wrapper className='Minter'>
      {isSuccess && <ImageWrapper><img style={{ width: '100%' }} alt='minted nft' src={url} /></ImageWrapper>}
      {!isSuccess &&
        <>
          <Header text={title} />
          <StyledSubheader mode='emphasized' size='small' text='You are welcome to join' />
          <StyledSubheader text='Fan Based Secret Drop' />
          <ImageFlasher images={['https://res.cloudinary.com/daqgugk5f/image/upload/v1641987238/ynwl59gj6gtgdateob2t.png', 'https://res.cloudinary.com/daqgugk5f/image/upload/v1641984304/bvdpqso5rhhtnogez2r4.png', 'https://res.cloudinary.com/daqgugk5f/image/upload/v1641735603/wjvvtebcm9uh1ah1pltx.png']} />
          <ParagraphWrapper text={text} />
        </>}

    </Wrapper>
  )
}

export default Minter

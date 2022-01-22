import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ImageWrapper = styled.div`
  ${'' /* width: clamp(200px, 50%, 500px);
  border-radius: 50%;
  overflow: hidden; */}
    width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
`
const Image = styled.img`
${'' /*
      background-clip: padding-box;
  width: 100%;
  object-fit: contain; */}
   display: inline;
  margin: 0 auto;
    object-fit: cover;

  height: 100%;
  width: auto;
`

// const preloadImage = url => {
//   return new window.Image().src = url
// }

export default function ImageFlasher({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // const newIndex = currentIndex < images.length ? currentIndex + 1 : 0
      setCurrentIndex((oldIndex) => {
        const newIndex = oldIndex + 1 < images.length ? oldIndex + 1 : 0
        return newIndex
      })
      return () => {
        clearInterval(interval)
      }
    }, 2000)
  }, [images.length])

  // useEffect(() => {
  //   const newIndex = currentIndex + 1 < images.length ? currentIndex + 1 : 0
  //   preloadImage(newIndex)
  // }, [currentIndex, images])

  return (
    <ImageWrapper>
      {images.map(image => <img src={image} key={image} alt='potato' style={{ display: 'none' }} />)}
      <Image src={images[currentIndex]} key={currentIndex} alt='loop' />
    </ImageWrapper>
  )
}

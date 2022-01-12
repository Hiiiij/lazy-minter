import React, { useEffect, useState } from 'react'


export default function ImageFlasher({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log({
        currentIndex,
        length: images.length
      })

      // const newIndex = currentIndex < images.length ? currentIndex + 1 : 0
      setCurrentIndex((oldIndex) => oldIndex < images.length ? oldIndex + 1 : 0)

      return () => {
        clearInterval(interval)
      }
    }, 2000)

  }, [images])
  return (
    <img src={images[currentIndex]} key={currentIndex} alt="loop">

    </img>
  )
}

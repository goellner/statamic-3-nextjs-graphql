import React from 'react'
import Image from 'next/image'
import { ImageFragmentFragment } from '@typedefs/gql'
interface Props {
  youtubeVideoId: string
  posterImage: ImageFragmentFragment
}

const BardYoutubeVideo: React.FC<Props> = ({ youtubeVideoId, posterImage }) => {
  return (
    <div className="youtube-bard">
      <div className="image">
        <Image src={posterImage.permalink} width="1920" height="1080" />
      </div>
    </div>
  )
}

export default BardYoutubeVideo

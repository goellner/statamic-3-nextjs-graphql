import React from 'react'

interface Props {
  text: string
}

const BardText: React.FC<Props> = ({ text }) => {
  return <div className="prose" dangerouslySetInnerHTML={{ __html: text }} />
}

export default BardText

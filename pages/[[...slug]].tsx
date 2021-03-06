import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import BardText from '@components/BardText'
import BardYoutubeVideo from '@components/BardYoutubeVideo'

import { fetchData } from '@utils/api'
import { PAGE_DATA_QUERY, PAGE_SLUGS_QUERY } from '@gql/Page.query'
import { PageDataQuery, PageSlugsQuery } from '@typedefs/gql'

interface Props {
  pageData: PageDataQuery['entry']
}

const Page: NextPage<Props> = ({ pageData }) => {
  return (
    <div className="container">
      <h1 className="text-2xl mb-4">{pageData.title}</h1>
      {pageData.bard.map((bardItem) => {
        if (bardItem.blockType === 'BardText') {
          return <BardText text={bardItem.text} />
        } else if (bardItem.blockType === 'Set_Bard_YoutubeVideo') {
          return <BardYoutubeVideo youtubeVideoId={bardItem.youtube_id} posterImage={bardItem.poster_image} />
        }
      })}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params: { slug } = {} }) => {
  let pageSlug
  if (!slug) {
    pageSlug = '/'
  } else if (typeof slug === 'string') {
    pageSlug = `/${slug}`
  } else {
    pageSlug = slug.join('/')
    pageSlug = `/${pageSlug}`
  }

  const queryResult = await fetchData<PageDataQuery>(PAGE_DATA_QUERY, {
    uri: pageSlug,
  })

  const pageData = queryResult.entry

  return {
    revalidate: 60,
    props: {
      pageData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const queryResult = await fetchData<PageSlugsQuery>(PAGE_SLUGS_QUERY)
  const entriesData = queryResult?.entries?.data
  let paths
  if (entriesData !== undefined) {
    paths = entriesData.filter((entry) => !!entry?.uri).map((entry) => entry?.uri)
  }
  return {
    paths,
    fallback: false,
  }
}

export default Page

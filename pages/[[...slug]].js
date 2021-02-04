import Head from 'next/head'
import { fetchData } from '../utils/api'
import { PAGE_DATA_QUERY, PAGE_SLUGS_QUERY } from '../gql/Page.query'

const HOME_PAGE_SLUG = 'home'

const Page = ({ pageData }) => {
  console.log(pageData)
  return <div className="container">{pageData.title}</div>
}

export const getStaticProps = async ({ params: { slug } = {} }) => {
  let pageSlug

  if (!slug) {
    pageSlug = HOME_PAGE_SLUG
  } else if (typeof slug === 'string') {
    pageSlug = slug
  } else {
    pageSlug = slug.join('/')
  }

  const queryResult = await fetchData(PAGE_DATA_QUERY, {
    slug: pageSlug,
  })

  const pageData = queryResult.entries.data[0]
  console.log({ pageData })

  return {
    revalidate: 60,
    props: {
      pageData,
    },
  }
}

export const getStaticPaths = async () => {
  const queryResult = await fetchData(PAGE_SLUGS_QUERY)
  const entriesData = queryResult?.entries?.data
  let paths
  if (entriesData !== undefined) {
    paths = entriesData
      .filter((entry) => !!entry?.slug)
      .map((entry) => (entry?.slug === HOME_PAGE_SLUG ? '/' : `/${entry?.slug}`))
  }

  console.log(paths)
  return {
    paths,
    fallback: false,
  }
}

export default Page

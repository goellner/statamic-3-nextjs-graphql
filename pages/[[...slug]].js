import { fetchData } from '../utils/api'
import { PAGE_DATA_QUERY, PAGE_SLUGS_QUERY } from '../gql/Page.query'

const Page = ({ pageData }) => {
  return (
    <div className="container">
      <h1 className="text-2xl mb-4">{pageData.title}</h1>
    </div>
  )
}

export const getStaticProps = async ({ params: { slug } = {} }) => {
  let pageSlug
  if (!slug) {
    pageSlug = '/'
  } else if (typeof slug === 'string') {
    pageSlug = `/${slug}`
  } else {
    pageSlug = slug.join('/')
    pageSlug = `/${pageSlug}`
  }

  const queryResult = await fetchData(PAGE_DATA_QUERY, {
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

export const getStaticPaths = async () => {
  const queryResult = await fetchData(PAGE_SLUGS_QUERY)
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

import gql from 'graphql-tag'

export const PAGE_SLUGS_QUERY = gql`
  query PageSlugs {
    entries(collection: "pages") {
      data {
        ... on Entry_Pages_Pages {
          slug
          id
        }
      }
    }
  }
`

export const PAGE_DATA_QUERY = gql`
  query PageData($slug: String) {
    entries(filter: { slug: $slug }) {
      data {
        title
        ... on Entry_Pages_Pages {
          bard {
            ... on Set_Bard_YoutubeVideo {
              type
              youtube_id
              poster_image {
                url
              }
            }
            ... on BardText {
              type
              text
            }
          }
        }
      }
    }
  }
`

import gql from 'graphql-tag'

export const PAGE_SLUGS_QUERY = gql`
  query PageSlugs {
    entries(collection: "pages") {
      data {
        uri
      }
    }
  }
`

export const PAGE_DATA_QUERY = gql`
  query PageData($uri: String) {
    entry(uri: $uri) {
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
`

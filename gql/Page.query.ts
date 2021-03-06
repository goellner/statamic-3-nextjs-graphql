import gql from 'graphql-tag'
import { IMAGE_FRAGMENT } from "@root/gql/Image.fragment";

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
      ... on Entry_Pages_Pages {
        title
        bard {
          ... on Set_Bard_YoutubeVideo {
            blockType: __typename
            youtube_id
            poster_image {
              ...ImageFragment
            }
          }
          ... on BardText {
            blockType: __typename
            text
          }
        }
      }
    }
  }
  ${IMAGE_FRAGMENT}
`

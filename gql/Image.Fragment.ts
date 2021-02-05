import gql from "graphql-tag";

export const IMAGE_FRAGMENT = gql`
  fragment ImageFragment on Asset_Assets {
    url
    width
    height
    ratio
    orientation
    focus_css
    is_audio
    is_image
    is_video
    size_kb
  }
`;
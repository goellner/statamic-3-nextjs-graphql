require('dotenv').config()
// Note: we are not using the apollo client.
// This config file is used solely for the VSCode extension `apollographql.vscode-apollo`.
module.exports = {
  client: {
    includes: ['src/gql/*.ts', 'src/components/blocks/**/*.ts'],
    service: {
      name: 'statamic-apollo-service',
      url: process.env.API_URL,
    },
  },
}

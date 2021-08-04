import {gql} from 'apollo-angular';


export const GET_CHANNELS = gql`
    query GetChannels {
        channels {
          id
          token
          code
          defaultShippingZone {
            id
            name
          }
          customFields  {
            nombre
            description
            imgPortada {
              id
              name
              type
              preview
              source
            }
          }
        }
    }
`;

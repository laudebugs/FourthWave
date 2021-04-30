import { gql } from 'apollo-angular'

export const SIGN_IN = gql`
  mutation SignIn($password: String!, $username: String!) {
    signin(password: $password, username: $username) {
      firstname
      lastname
      username
      email
      contributions
      LikedPodcasts {
        title
      }
      subscribedPodcasts {
        title
      }
      likedEpisodes {
        title
      }
      bookmarkedEpisodes {
        title
      }
      plays {
        episode
      }
      playingSpeed
      volume
      authtoken
      admin
    }
  }
`

export const SIGN_UP = gql`
  mutation SignUp($user: NewUser!) {
    signUp(user: $user) {
      firstname
      lastname
      username
      email
      password
      contributions
      LikedPodcasts {
        title
      }
      subscribedPodcasts {
        title
      }
      likedEpisodes {
        title
      }
      bookmarkedEpisodes {
        title
      }
      plays {
        episode
      }
      playingSpeed
      volume
      authtoken
    }
  }
`
export const SIGN_OUT = gql`
  mutation {
    signOut
  }
`

export const SIGN_IN_WITH_TOKEN = gql`
  mutation {
    signInWithToken {
      firstname
      lastname
      username
      email
      password
      contributions
      LikedPodcasts {
        title
      }
      subscribedPodcasts {
        title
      }
      likedEpisodes {
        title
      }
      bookmarkedEpisodes {
        title
      }
      plays {
        episode
      }
      playingSpeed
      volume
      authtoken
    }
  }
`

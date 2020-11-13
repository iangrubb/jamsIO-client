import React from 'react'

import { gql, useQuery } from '@apollo/client';

import UserInfo from '../../components/display/UserInfo'

const DISPLAY_USER_FRAGMENT = gql`
    fragment DisplayUser on User {
        id
        username
        followerCount
        followeeCount
        followedByUser(userId: $currentUserId)
        followsUser(userId: $currentUserId)
    }
`

const USER_FOLLOWING = gql`
    query getFollowing($userId: ID!, $currentUserId: ID!) {
        findUser(userId: $userId) {
            id
            username
            followees {
                ...DisplayUser
            }
        }
    }
    ${DISPLAY_USER_FRAGMENT}
`

const USER_FOLLOWERS = gql`
    query getFollowers($userId: ID!, $currentUserId: ID!) {
        findUser(userId: $userId) {
            id
            username
            followers {
                ...DisplayUser
            }
        }
    }
    ${DISPLAY_USER_FRAGMENT}
`

// Modes "followers" and "following"

const UserSocial = ({id, mode, currentUser}) => {

    const { data, loading } = useQuery(mode === "followers" ? USER_FOLLOWERS : USER_FOLLOWING , {variables: {userId: id, currentUserId: currentUser.id}})

    if (loading) return <div>Loading...</div>

    const {findUser: {followees, followers, username}} = data

    const users = mode === "followers" ? followers : followees

    const renderMessage = () => {
        if (users.length === 0) {
            if (mode === "followers") {
                return "doesn't have any followers right now."
            } else {
                return "isn't following anyone right now."
            }
        } else {
            if (mode === "followers") {
                return "is followed by:"
            } else {
                return "is following:"
            }
        }
    }

    return (
        <div>
            <h2>{username} {renderMessage()}</h2>
            
            {users.map(user => <UserInfo key={user.id} {...user} /> )}
        </div>
    )
}

export default UserSocial

import React, { useState } from 'react'

import { StyledLink } from '../../styles/components'

import SearchForm from '../../components/forms/SearchForm'

import { gql, useQuery, useMutation } from '@apollo/client';

import UserInfo from '../../components/display/UserInfo'

const BROWSE_USERS = gql`
    query BrowseUsers($searchTerm: String, $currentUserId: ID!) {
        browseUsers(searchTerm: $searchTerm) {
            id
            username
            followerCount
            followeeCount
            followedByUser(userId: $currentUserId)
            followsUser(userId: $currentUserId)
        }
        findUser(userId: $currentUserId) {
            followerCount
            followeeCount
        }
    }
`

const UserSearch = ({ currentUser }) => {

    const { data, loading, refetch } = useQuery(BROWSE_USERS, {variables: {currentUserId: currentUser.id}})

    const refetchUsers = searchTerm => refetch({ searchTerm, currentUserId: currentUser.id })



    const users = data?.browseUsers

    if (loading) return <div>Loading...</div>

    const {findUser: { followeeCount, followerCount }} = data

    return (
        <div>
            <h2>Your Network</h2>

            <StyledLink to={`/users/${currentUser.id}/following`}>You're following {followeeCount} users</StyledLink>

            <StyledLink to={`/users/${currentUser.id}/followers`}>You're followed by {followerCount} users</StyledLink>

            <h2>Browse Users</h2>
            <SearchForm submitData={refetchUsers} />
            {data ? users.map(user => <UserInfo key={user.id} {...user} /> ) : null}
        </div>
    )
}

export default UserSearch
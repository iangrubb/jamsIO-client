import React, { useState } from 'react'

import SearchForm from '../../components/forms/SearchForm'

import { gql, useQuery } from '@apollo/client';

import UserInfo from '../../components/display/UserInfo'

const BROWSE_USERS = gql`
    query BrowseUsers($searchTerm: String) {
        browseUsers(searchTerm: $searchTerm) {
            id
            username
            followerCount
            followeeCount
        }
    }
`

const UserSearch = () => {

    const { data, refetch } = useQuery(BROWSE_USERS)

    const refetchUsers = searchTerm => refetch({ searchTerm })

    const users = data?.browseUsers

    return (
        <div>
            <SearchForm submitData={refetchUsers} />
            {data ?
            users.map(user => <UserInfo key={user.id} {...user}/>)
            : null}
        </div>
    )
}

export default UserSearch

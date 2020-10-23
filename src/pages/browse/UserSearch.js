import React, { useState } from 'react'

import SearchForm from '../../components/forms/SearchForm'

import { gql, useQuery } from '@apollo/client';

const BROWSE_USERS = gql`
    query BrowseUsers($searchTerm: String) {
        browseUsers(searchTerm: $searchTerm) {
            id
            username
        }
    }
`

const UserSearch = () => {

    const { data, loading, error, refetch } = useQuery(BROWSE_USERS)

    const refetchUsers = searchTerm => refetch({ searchTerm })

    console.log(data)

    return (
        <div>
            <SearchForm submitData={refetchUsers} />
        </div>
    )
}

export default UserSearch

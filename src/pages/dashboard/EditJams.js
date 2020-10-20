import React from 'react'

import styled from 'styled-components'

import { gql, useLazyQuery } from '@apollo/client';

import SearchForm from '../../components/forms/SearchForm'
import TrackListing from '../../components/display/TrackListing'

const SEARCH_SONGS = gql`
    query SearchTracks($searchTerm: String!) {
        searchTracks(searchTerm: $searchTerm) {
            id
            name
            album {
                id
                mediumImageUrl
            }
            artists {
                id
                name
            }
        }
    }
`

const EditJams = () => {

    // Load up the current jams at the start
    // Have a save button to confirm everything

    const [songsQuery, { data }] = useLazyQuery(SEARCH_SONGS, {
        onCompleted: console.log
    })

    const searchSongs = searchTerm => songsQuery({variables: { searchTerm}})

    const tracks = data?.searchTracks

    console.log(tracks)

    const renderTrack = track => <TrackListing key={track.id} {...track} />

    return (
        <div>
            <Columns>
                
                <Column>
                    <h3>Current Jams</h3>
                    <p>(No changes)</p>
                </Column>
                <Column>
                    <h3>Search for New Jams</h3>
                    <SearchForm submitData={searchSongs} />
                    {tracks?.map(renderTrack)}
                </Column>
            </Columns>
            
        </div>
    )
}

export default EditJams

const Columns = styled.div`
    display: flex;
`

const Column = styled.div`
    max-width: 400px;
    width: 45vw;

    margin: 0.4rem;
    padding: 0.4rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    border: 2px solid black;

`

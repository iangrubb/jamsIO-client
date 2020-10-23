import React, { useState } from 'react'

import styled from 'styled-components'

import { Button } from '../../styles/components'

import { gql, useQuery, useLazyQuery, useMutation, useApolloClient } from '@apollo/client';

import SearchForm from '../../components/forms/SearchForm'
import TrackListing from '../../components/display/TrackListing'


const TRACK_INFO = gql`
    fragment TrackInfo on Track {
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
`

const CURRENT_JAMS = gql`
    query {
        currentUser {
            currentJams {
                ...TrackInfo
            }
        }
    }
    ${TRACK_INFO}
`

const SEARCH_SONGS = gql`
    query SearchTracks($searchTerm: String!) {
        searchTracks(searchTerm: $searchTerm) {
            ...TrackInfo
        }
    }
    ${TRACK_INFO}
`

const UPDATE_JAMS = gql`
    mutation UpdateJams($additions: [String!], $removals: [String!]) {
        updateJams(additions: $additions, removals: $removals ) {
            id
            additions {
                ...TrackInfo
            }
            removals {
                ...TrackInfo
            }
        }
    }
    ${TRACK_INFO}
`


const EditJams = () => {

    // Modified Jam Update Logic

    const [ modifiedJams, setModifiedJams ] = useState(null)

    const addModifiedJam = track => setModifiedJams(oldJams => {
        return oldJams.length < 10 ? [...oldJams, track] : [...oldJams]
    })

    const removeJam = trackId => setModifiedJams(oldJams => {
        return oldJams.filter(track => track.id !== trackId)
    })


    // Initial Jam Fetching

    const jamsResponse = useQuery(CURRENT_JAMS, {
        onCompleted: ({currentUser: { currentJams }}) => setModifiedJams(currentJams),
        onError: console.log
    })

    const previousJams = jamsResponse.data?.currentUser?.currentJams

    const additions = modifiedJams?.filter(track => !previousJams.find(t => t.id === track.id))

    const remainingJams = modifiedJams?.filter(track => previousJams.find(t => t.id === track.id))

    const removals = previousJams?.filter(track => modifiedJams ? !modifiedJams.find(t => t.id === track.id) : false)
    

    // Search Logic

    const [searchQuery, searchQueryResponse] = useLazyQuery(SEARCH_SONGS)

    const searchSongs = searchTerm => searchQuery({variables: { searchTerm}})

    const searchedTracks = searchQueryResponse.data?.searchTracks



    // Submit Logic 


    const [ updateJams ] = useMutation(UPDATE_JAMS, {
        update: (cache, { data: { updateJams } }) => {

            const { additions, removals } = updateJams

            const { currentUser: { currentJams } } = cache.readQuery({ query: CURRENT_JAMS })

            const filteredJams = currentJams.filter(j => !removals.find(r => r.id === j.id))

            const updatedJams = [...filteredJams, ...additions]

            cache.writeQuery({
                query: CURRENT_JAMS,
                data: {
                    currentUser: {currentJams: updatedJams}
                }
            })
        }
    })

    const submitJamsUpdate = () => {
        if (additions.length > 0 || removals.length > 0) {
            updateJams({variables: {additions: additions.map(a => a.id), removals: removals.map(r => r.id)}})
        }
    }


    // Render Logic

    const renderSearchTrack = track => (
        <TrackListing
            key={track.id}
            buttons={[{
                label: "Add",
                inactive: modifiedJams.find(t => t.id === track.id),
                clickHandler: () => addModifiedJam(track)
            }]}
            {...track}
        />
    )

    const renderAddedTrack = track => (
        <TrackListing
            key={track.id}
            buttons={[{
                label: "Remove",
                clickHandler: () => removeJam(track.id)
            }]}
            {...track}
        />
    )

    const renderRemovedTrack = track => (
        <TrackListing
            key={track.id}
            buttons={[{
                label: "Restore",
                clickHandler: () => addModifiedJam(track)
            }]}
            {...track}
        />
    )

    const renderRemainingTrack = track => (
        <TrackListing
            key={track.id}
            buttons={[{
                label: "Remove",
                clickHandler: () => removeJam(track.id)
            }]}
            {...track}
        />
    )

    return (
        <Columns>
            {modifiedJams ?
            <>
            <Column>
                <h3>Your Jams</h3>

                <p>{`${modifiedJams.length}/10 Jams Selected`}</p>

                {additions.length === 0 && removals.length === 0 ?
                    <p>(No changes)</p> :
                    <Row>
                        {additions.length > 0 ? <p>{additions.length} addition{additions.length > 1 ? "s" : ""}</p> : null}
                        {removals.length > 0 ? <p>{removals.length} removal{removals.length > 1 ? "s" : ""}</p> : null}
                        <Button onClick={submitJamsUpdate}>Save</Button>
                    </Row>
                }

                    
                {remainingJams.map(renderRemainingTrack)}
                    
                <h3>Additions</h3>

                {additions.length > 0 ?
                    <>
                    {additions.map(renderAddedTrack)}
                    </>
                : <p>(none)</p>}

                <h3>Removals</h3>

                {removals.length > 0 ?
                    <>
                    {removals.map(renderRemovedTrack)}
                    </>
                : <p>(none)</p>}


            </Column>
            <Column>
                <h3>Search for New Jams</h3>
                <SearchForm submitData={searchSongs} />
                {searchedTracks?.map(renderSearchTrack)}
            </Column>
            </>
            : null }
        </Columns>
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

const Row = styled.div`
    display: flex;
    align-items: center;
`

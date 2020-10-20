import React from 'react'

import styled, { css } from 'styled-components'

const TrackListing = ({ name, album: { mediumImageUrl }, artists, buttons }) => {
    console.log(artists)
    const artistNames = artists.map(artist => artist.name).join(', ')
    return (
        <Container>
            <AlbumArt src={mediumImageUrl} alt={name}/>
            <ContentRegion>
                <SongTitle>{name}</SongTitle>
                <Artists>{artistNames}</Artists>
                
            </ContentRegion>
            <ButtonRegion>
                <button>first</button>
                <button>second</button>
            </ButtonRegion>
            
        </Container>
    )
}

export default TrackListing

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;

    border: 2px solid black;
`

const AlbumArt = styled.img`
    width: 80px;
    height: 80px;
`

const ContentRegion = styled.div`
    padding: 0.4rem;
    flex-grow: 1;
`

const ButtonRegion = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.4rem;
`

const lineLimit = css`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
`

const SongTitle = styled.h4`
    ${lineLimit}
    font-size: 18px;
    margin: 0 0 0.4rem 0;
`

const Artists = styled.p`
    ${lineLimit}
    font-size: 16px;
    font-style: italic;
    margin: 0;
`
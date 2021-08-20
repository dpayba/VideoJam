import { useState, useEffect } from "react"
import useAuth from './useAuth'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import SearchResult from './SearchResult'
import Player from './Player'
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
    clientId: 'YOUR CLIENT ID',
})

export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playTrack, setPlayTrack] = useState()
    const [lyrics, setLyrics] = useState("")


    function chooseTrack(track) {
        setPlayTrack(track)
        setSearch("")
        setLyrics("")
    }

    // Lyrics
    useEffect(() => {
        if (!playTrack) return

        axios.get("http://localhost:3001/lyrics", { 
            params: {
                track: playTrack.title, 
                artist: playTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })
    }, [playTrack])


    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])
    
    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return 

        let cancelRequest = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancelRequest) return
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestImage = track.album.images.reduce(
                    (smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                return {
                    artist: track.artists[0].name, 
                    title: track.name, 
                    uri: track.uri,
                    albumUrl: smallestImage.url
                }
            }))
        })

        return() => cancelRequest = true
    }, [search, accessToken])

    return (
        <Container className="d-flex flex-column py-2" style={{height: "100vh" }}>
            <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={e => setSearch(e.target.value)} />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}> 
                {searchResults.map(track => (
                    <SearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
                    ))}
                {searchResults.length === 0 && (
                    <div className="text-center" style={{ whiteSpace: "pre" }}>
                        {lyrics}
                        </div>
                )}
            </div>
            <div>
                <Player accessToken={accessToken} trackUri={playTrack?.uri} />
            </div>
        </Container>
    )
}


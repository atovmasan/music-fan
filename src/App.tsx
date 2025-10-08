import { useEffect, useState } from "react"


//const tracks = []
//const tracks = null
// const tracks = [
//   {
//     id: 1,
//     title: "Musicfun soundtrack",
//     url: "https://musicfun.it-incubator.app/api/samurai-way-soundtrack.mp3",
//   },
//   {
//     id: 2,
//     title: "Musicfun soundtrack instrumental",
//     url: " https://musicfun.it-incubator.app/api/samurai-way-soundtrack-instrumental.mp3",
//   },
// ]


function App() {
  const [selectedTrackId, setSelectedTrackId] = useState(null)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [tracks, setTracks] = useState(null)
 
  useEffect(() => {
    fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
      headers: {
        'api-key': '3163379c-5c41-4b1b-9b49-59f416c1a346'
      }
    }).then(res => res.json()).then(json => setTracks(json.data))
  }, [])



  if (tracks === null) {
     return (
      <div>
        <h1>Musicfun player</h1>
        <span>Loading...</span>
      </div>
    )
  }
  if (tracks.length === 0) { 
    return (
      <div>
        <h1>Musicfun player</h1>
        <span>No tracks</span>
      </div>
    )
  }
  
  return (
    <div>
      <h1>Musicfun</h1>
      <button onClick={() => setSelectedTrackId(null)}>Reset selection</button>
      <div style={{
      display: "flex",
      gap: "30px"
    }}>
      <ul>
        {tracks.map((track) => (
          <li key={track.id} style={{border: track.id === selectedTrackId ? '1px solid orange' : 'none'}}>
            <div onClick={() => {
              setSelectedTrackId(track.id)

               fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + track.id, {
      headers: {
        'api-key': '3163379c-5c41-4b1b-9b49-59f416c1a346'
      }
    }).then(res => res.json()).then(json => setSelectedTrack(json.data))
            }}>{track.attributes.title}</div>
            <audio src={track.attributes.attachments[0].url} controls={true}/>
          </li>
        ))}
      </ul>
      <div>
        <h3>Details</h3>
        {!selectedTrack && !selectedTrackId && 'Track is not selectd'}
        {!selectedTrack && selectedTrackId && 'Loading'}
        {selectedTrack && selectedTrack.id !== selectedTrackId && 'Loading...'}
        {selectedTrack && <div>
        <h4>{selectedTrack.attributes.title}</h4>
        <p>{selectedTrack.attributes.lyrics ?? 'no lyrics'}</p>
        </div>
        }
      </div>
    </div>
    </div>
  )
}

export default App
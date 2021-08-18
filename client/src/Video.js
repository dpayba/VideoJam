import { Container } from 'react-bootstrap'
import './style.css';

export default function Video() {
    return (
        <Container>
            <html>
                <body>
                    <h1>VideoJam</h1>
                    <h3>Join a Call</h3>

                    <input id="inputMeeting" placeholder="Meeting ID"/>

                    <button id="answerCall" disabled>Answer</button>

                    <div class="videos">
                        <span>
                            <h3>Host</h3>
                            <video id="userVideo" autoplay playsinline></video> 
                        </span>
                        <span>
                            <h3>Guest</h3>
                            <video id="guestVideo" autoplay playsinline></video>
                        </span>
                    </div>

                    <button id="videoButton">Turn on Video</button>

                    <button id="startMeeting" disabled>Create Video Call</button>

                    <br></br>
                    <br></br>

                    <button id="endCall" disabled>End Call</button>
                    <script type="module" src="VideoChat.js"></script>
                </body>
            </html>
        </Container>
    )
}

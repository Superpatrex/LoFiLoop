import React from 'react';
import ExampleComponent from './components/ExampleComponent';
import AnotherExampleComponent from './components/AnotherExampleComponent';
import jackImage from './literally_jack.webp';
import alsoJackImage from './jack_rizz.webp';
import sound from './rizz-sounds.mp3';
import AMONG_US from './AMONG_US.mp3';

function App() {
    return (
        <div>
            <h1>Welcome to a React App MADE BY JACK NO WAY....WOW! JACK IS SO COOL</h1>
            <ExampleComponent />
            <AnotherExampleComponent />
            <audio controls loop autoPlay>
                <source src={sound} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio controls loop autoPlay>
                <source src={AMONG_US} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={jackImage} alt="Jack" />
                <img src={alsoJackImage} alt="Jack" />
            </div>
        </div>
    );
}

export default App;
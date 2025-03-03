import React from 'react';
import ExampleComponent from './components/ExampleComponent';
import AnotherExampleComponent from './components/AnotherExampleComponent';
import jackImage from './literally_jack.webp';
import alsoJackImage from './jack_rizz.webp';
import sound from './rizz-sounds.mp3';
import AMONG_US from './AMONG_US.mp3';
import LogIn from './components/LogIn';
import PageTitle from './components/PageTitle';
import SignUp from '.components/SignUp';

function App() {
    return (
        <>
            <PageTitle />
            <LogIn />
            <SignUp />
        </>
    );
}

export default App;
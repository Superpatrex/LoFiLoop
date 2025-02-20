import React from 'react';
import { fetchDalleImage } from './api/dalle';

function App() {


    const [dalleImage, setDalleImage] = React.useState(null);

    const handle_click = () => {
        console.log("I was clicked");
        call_api();
    } 

    const call_api = async () => {
        const response = await fetchDalleImage("A lofi album cover");
        // console.log(response)
        setDalleImage(response.data[0].url);
    }





    return (
        <div>
            <button onClick={handle_click}>Click me</button>
            {dalleImage && <img src={dalleImage} alt="DALL·E" />}

        </div>
    );
}

export default App;
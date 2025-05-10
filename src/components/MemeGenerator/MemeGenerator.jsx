import { useEffect, useState } from "react";

export default function MemeGenerator() {

    const [allMemes, setAllMemes] = useState([]);

    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })

    function handleChange(event) {
        const { value, name } = event.currentTarget;
        setMeme({ ...meme, [name]: value });
    }

    function getMemeImage() {
        let index = Math.floor(Math.random() * (allMemes.length));
        setMeme({
            ...meme,
            imageUrl: allMemes[index].url
        });
    }

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes').then(res => res.json()).then((data) => setAllMemes(data.data.memes));
    }, []);
    return (
        <div className="meme-generator">
            <header>
                <h1>Meme Generator</h1>
                <p>Generate your favorite meme!!</p>
            </header>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </div>
    )
}
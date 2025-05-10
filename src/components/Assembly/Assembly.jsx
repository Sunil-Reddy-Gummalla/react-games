import { useState } from "react";
import { languages } from "./languages";
import clsx from "clsx";
import { getFarewellText } from "./utill";
import Confetti from 'react-confetti';


export default function Assembly() {

    //state values
    const [currentWord, setCurrentWord] = useState(() => getRandomLanguage());
    const [guessWord, setGuessWord] = useState([]);

    //derived values
    const wrongGuessedCount = guessWord.filter(l => !currentWord.includes(l)).length;
    const isGameWon = currentWord.split('').every((s) => guessWord.includes(s));
    const isGameLost = wrongGuessedCount === languages.length - 1;
    const isGameOver = isGameLost || isGameWon;
    function getRandomLanguage() {
        return languages[Math.floor(Math.random() * languages.length)]?.name.toLowerCase();
    }

    function addGuessWord(letter) {
        setGuessWord(
            prev => prev.includes(letter) ? prev : [...prev, letter]
        )
    }

    function setNewGame() {
        setCurrentWord(getRandomLanguage());
        setGuessWord([]);
    }

    const languageElements = languages.map((lang, index) => {
        const isLost = index < wrongGuessedCount;
        return (
            <span
                style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
                className={`chip ${isLost ? 'lost' : ''}`}
                key={lang.name}
            >
                {lang.name}
            </span>
        );
    });


    const letterElements = currentWord?.split('').map((l, i) => {
        const isGuessed = guessWord.includes(l);
        return (<span
            key={i}> {isGuessed ? l.toLocaleUpperCase() : ''}</span>)
    });

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    const keyboardElements = alphabet.split('').map((v) => {
        const isGuesed = guessWord.includes(v);
        const isCorrect = isGuesed && currentWord.includes(v);
        const isWrong = isGuesed && !currentWord.includes(v);
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        return (<button
            key={v}
            className={className}
            disabled={isGameOver}
            aria-disabled={guessWord.includes(v)}
            onClick={() => addGuessWord(v)}>
            {v.toLocaleUpperCase()}
        </button>)
    });


    return (
        <div className="assembly">
            {isGameWon && <Confetti />}
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the programming world safe from Assembly</p>
            </header>
            <section className={`game-status ${isGameOver ? `${isGameLost ? 'lost' : ''}` : 'farewell'}`}>
                {isGameOver ? (<div><h2>{isGameWon ? 'You Win!' : 'Game Over'}</h2>
                    <p>{isGameWon ? 'Well done! 🎉🎉' : 'Better luck next time'}</p></div>) : <span>
                    {wrongGuessedCount ? getFarewellText(languages[wrongGuessedCount - 1].name) : `${ guessWord.length ? 'You are on track Buddy!!': 'Lets Begin Buddy!!'}`}
                </span>}
            </section>
            <section className="language-chips">
                {languageElements}
            </section>

            <section className="word">
                {letterElements}
            </section>

            <section className="keyboard">
                {keyboardElements}
            </section>
            <section className="submit">
                {isGameOver ? <button className="new-game" onClick={setNewGame}>New Game</button> : ''}
            </section>
        </div>
    )
}
import { useEffect, useState } from "react";
import CardCompnent from "./cardComponent";

function Main() {
    const [cards, setCards] = useState([]);
    const [cardsInfo, setCardsInfo] = useState([]);
    const [cardClicked, setCardClicked] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore,setHighScore]=useState(0)

    async function getData() {
        try {
            const data = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
            );

            const dataObj = await data.json();

            setCards(getRandomCards(dataObj.results));
        } catch (e) {
            console.log(e);
        }
    }

    async function getCardsSprites() {
        const newCardsInfo = [];

        for (const card of cards) {
            const cardData = await fetch(card.url);
            const cardObj = await cardData.json();

            newCardsInfo.push(cardObj);
        }

        setCardsInfo(newCardsInfo);
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getCardsSprites();
    }, [cards]);

    function imageClick(cardId) {
        if (cardClicked.includes(cardId)) {
            if(score >=highScore){
                setHighScore(score)
                setScore(0)
            }
            alert("You clicked the same card twice. Game Over");

            setCardClicked([]);
            return;
        }

        setCardClicked([...cardClicked, cardId]);

        setScore(score + 1);
        getData();
    }

    return (
        <div>
            <CardCompnent
                cards={cardsInfo}
                clickHandler={imageClick}
                score={score}
                highScore={highScore}
            />
        </div>
    );
}

export default Main;


function getRandomCards(dataArray) {
    let index = 1;
    let pickedCards = [];

    while (index <= 6) {
        const randomCard = Math.floor(
            Math.random() * dataArray.length
        );

        pickedCards.push(dataArray[randomCard]);

        index++;
    }

    return pickedCards;
}
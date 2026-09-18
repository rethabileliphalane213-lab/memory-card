import { useEffect, useState } from "react";
import CardCompnent from "./cardComponent";

function Main() {
    const [cards, setCards] = useState([]);
    const [cardsInfo, setCardsInfo] = useState([]);
    const [cardClicked, setCardClicked] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore,setHighScore]=useState(0)
    const [display,setDisplay]=useState(false )

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
           
            setDisplay(true)
            setCardClicked([]);
            return;
        }

        setCardClicked([...cardClicked, cardId]);
 setDisplay(false)
        setScore(score + 1);
        getData();
    }
if(display){
      return (
        <div>
            <CardCompnent
                cards={cardsInfo}
                clickHandler={imageClick}
                score={score}
                highScore={highScore}
                msg={"GAME OVER"}
            />
        </div>
      )

}
else{
      return (
        <div>
            <CardCompnent
                cards={cardsInfo}
                clickHandler={imageClick}
                score={score}
                highScore={highScore}
                
            />
        </div>
      )
}
  
    
}

export default Main;

function getRandomCards(dataArray) {
    let pickedCards = [];

    while (pickedCards.length < 6) {
        const randomCard =
            dataArray[Math.floor(Math.random() * dataArray.length)];

        if (!pickedCards.includes(randomCard)) {
            pickedCards.push(randomCard);
        }
    }

    return pickedCards;
}
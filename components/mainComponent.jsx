import { useEffect, useState } from "react";
import CardCompnent from "./cardComponent";

function Main() {
    const [cards, setCards] = useState([]);
    const [cardsInfo, setCardsInfo] = useState([]);
    const [cardClicked, setCardClicked] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore,setHighScore]=useState(0)
    const [display,setDisplay]=useState(false )
    const [background,setBackground]=useState([255,255,255])
    const [green,setGreen]=useState(0)

    async function getData() {
        try {
            const data = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
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
             setBackground([255,255,255])
             setGreen(0)
            return;
        }

        setCardClicked([...cardClicked, cardId]);
 setDisplay(false)
        setScore(score + 1);
        getData();
       setBackground((array) => [
    Math.max(array[0] - 10, 0),
    Math.max(array[1] - 10, 0),
    Math.max(array[2] - 10, 0)
]);
setGreen((value) => Math.min(value + 10, 255));
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
                back={background}
                green={green}
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
                back={background}
                green={green}
                
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
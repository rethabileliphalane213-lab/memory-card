import { useEffect,useState } from "react";
import CardCompnent from "./cardComponent";


function Main(){
    const [cards,setCards]=useState([])
    const [cardsInfo,setCardsInfo]=useState([])
    useEffect(()=>{
      async function getData() {
        
           try{
const data=await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
const dataObj=await data.json()
setCards(getRandomCards(dataObj.results))
     }catch(e){
console.log(e)
     }   
      }
      getData()
    },[])

    useEffect(()=>{
        async function getCardsSprites(){
            const newCardsInfo=[]
            for(const card of cards){
                const cardData=await fetch(card.url)
                const cardObj=await cardData.json()
                newCardsInfo.push(cardObj)
            }
            setCardsInfo(newCardsInfo)
        }
        getCardsSprites()
    },[cards])

    return(
        <div>
            <CardCompnent cards={cardsInfo} />
        </div>
    )
}

export default Main

function getRandomCards(dataArray){
   
    let index=0
    let pickedCards=[]
    while(index <=6){
         const randomCard=Math.floor(Math.random()*dataArray.length)
        pickedCards.push(dataArray[randomCard])
        index++
    }
    return pickedCards
}
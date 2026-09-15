import { useEffect,useState } from "react";
import CardCompnent from "./cardComponent";


function Main(){
    const [cards,setCards]=useState([])
    useEffect(()=>{
      async function getData() {
        
           try{
const data=await fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
const dataObj=await data.json()
setCards(getRandomCards(dataObj))
     }catch(e){
console.log(e)
     }   
      }
      getData()
    },[])

    return(
        <div>
            <CardCompnent cards={cards} />
        </div>
    )
}

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
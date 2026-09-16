function CardCompnent({cards}){

    return(
        <div>
            {cards.map((card,index)=>{
                 return(
                      <div className="container" id={card.id}>
                   
                    <img src={card.sprites.font} />
                    <p>Card.name</p>
                </div>   
                    )
               
            })}
                
            
        </div>
    )
}


export default CardCompnent
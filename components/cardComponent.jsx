function CardCompnent({cards}){

    return(
        <div className="card-container">
         
            {cards.map((card,index)=>{
                 return(
                      <div className="container" id={card.id}>
                   
                   <img src={card.sprites.front_default} />
                  <p>{card.name}</p>
                </div>   
                    )
               
            })}
                
            
        </div>
    )
}


export default CardCompnent
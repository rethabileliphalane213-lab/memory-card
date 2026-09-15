function CardCompnent({cards}){

    return(
        <div>
            {cards.map((card,index)=>{
                <div class="container" id={card.id}>
                    <img src={card.url} />
                    <p>Card.name</p>
                </div>
            })}
                
            
        </div>
    )
}


export default CardCompnent
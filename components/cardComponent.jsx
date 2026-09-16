function CardCompnent({ cards, clickHandler, score, highScore }) {
    return (
        <div>
 <h2>Score: {score}</h2>
            <h2>highScore {highScore}</h2>
    <div className="card-container">
           
            {cards.map((card) => {
                return (
                    <div
                        className="container"
                        id={card.id}
                        onClick={() => clickHandler(card.id)}
                        key={card.id}
                    >
                        <img src={card.sprites.front_default} />

                        <p></p>

                        <button>{card.name}</button>
                    </div>
                );
            })}

        </div>
        </div>
    
    );
}

export default CardCompnent;
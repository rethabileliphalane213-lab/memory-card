function CardCompnent({ cards, clickHandler, score, highScore, msg="" ,back}) {
    return (
        <div style={{backgroundColor: `rgb(${back[0]}, ${back[1]}, ${back[2]})`}}>
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

                        <h4>{card.name}</h4>
                    </div>
                );
            })}

        </div>

        <h1>{msg}</h1>
        </div>
    
    );
}

export default CardCompnent;
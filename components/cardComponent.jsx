function CardCompnent({ cards, clickHandler }) {
    return (
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
    );
}

export default CardCompnent;
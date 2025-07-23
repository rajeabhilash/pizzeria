import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client"
import './index.css'

function App(params) {
    const [pizzaData, setPizzaData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/pizzas/');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPizzaData(data);
            } catch (error) {
                console.error("Failed to fetch pizzas:", error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPizzas();
    }, []);


    function Menu({ pizzaData }) {
        return error ? (<div>Error: {error.message}. Please try again later.</div>) : isLoading ?
            (<div>Loading pizzas...</div>) :
            (
                <main className="menu">
                    <h2>  Our Menu  </h2>
                    <p>Khaiye Desi khana, dudh, bhakri, chana! Khaoge Pizza shizza ho jaoge gobargazza!</p>
                    <div className="pizzas">
                        {pizzaData.map(
                            (pizza) => {
                                return (<Pizza pizza={pizza} key={pizza.id} />)
                            }
                        )}
                    </div>
                </main >
            )
    }

    return (
        <div className="container">
            <Header />
            <Menu pizzaData={pizzaData} />
            <Footer />
        </div>
    );
}

function Header(params) {
    return (
        <header className="header">
            <h1>Pizzeria & Co.</h1>
        </header>
    )
}

function Footer(params) {
    const hour = new Date().getHours()
    const openHour = 10;
    const closeHour = 22;
    let isOpen = hour >= openHour && hour <= closeHour
    return (
        <footer className="footer">
            {isOpen ? (
                <div className="order">
                    <p>
                        "Hurry, We're open until {closeHour}:00! Come visit us or order online."
                    </p><br></br>
                    <button className="btn">Order</button>
                </div>
            ) : "Sorry, We are closed now!"}
        </footer>
    );
}

function Pizza({ pizza }) {
    return (
        <div className="pizzaContainer">

            <div className={`pizza ${pizza.soldOut ? "sold-out" : ""}`}>
                <img src={pizza.photoName} alt={pizza.name} />
                <div>
                    <h3>{pizza.name}</h3>
                    <p>{pizza.ingredients}</p>
                    <span>{pizza.soldOut ? "Sold Out" : "Price -" + pizza.price}</span>
                </div>
            </div>
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<React.StrictMode>
    <App />
</React.StrictMode>
)
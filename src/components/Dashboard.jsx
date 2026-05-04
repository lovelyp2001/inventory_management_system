
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);

    const handleTotal = () => { axios.get("http://localhost:7000/product/countProduct")
            .then((res) => {

                console.log(res.data);
                const { totalProducts } = res.data;
                setTotalProducts(totalProducts);
            })

            .catch((err) => {
                console.log(err);
            })
    };

    const handleCount = () => { axios.get("http://localhost:7000/category/countCategory")
            .then((res) => {
                console.log(res.data);
                const { totalCategories } = res.data;
                setTotalCategories(totalCategories);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        handleTotal();
        handleCount();
    }, []);

    return (
        <div className="dashboard-page">
            <h1> Dashboard </h1>

        <div className="dashboard-cards">
            <Card>
                <Card.Title>Total Products</Card.Title>
                <h2>{totalProducts}</h2>
            </Card>

            <Card>
                <Card.Title>Total Categories</Card.Title>
                <h2>{totalCategories}</h2>
            </Card>

            </div>

        </div>
    );
}

export default Dashboard;

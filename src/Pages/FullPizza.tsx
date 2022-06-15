import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navidate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://629f37c8461f8173e4e44389.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("ошибка при получении данных");
        navidate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <h4>от {pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;

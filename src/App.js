import { useState } from "react";

const existingItems = [
  {
    item: "shampoo",
    quantity: 2,
  },
  {
    item: "toilet roll",
    quantity: 5,
  },
];

export default function App() {
  const [items, setItems] = useState(existingItems);
  const [newItem, setNewItem] = useState("");
  // const [totalItemCount, setTotalItemCount] = useState(0);

  return (
    <div className="App main-container">
      <SearchBar
        newItem={newItem}
        setNewItem={setNewItem}
        items={items}
        setItems={setItems}
      />
      <ItemList items={items} setItems={setItems} />
      <TotalItems items={items} />
    </div>
  );
}

function SearchBar({ newItem, setNewItem, items, setItems }) {
  function handleAddItem(e) {
    e.preventDefault();
    const item = {
      item: newItem,
      quantity: 1,
      isChecked: false,
    };

    setItems([...items, item]);
  }
  return (
    <div>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button>+</Button>
      </form>
    </div>
  );
}

function ItemList({ items, setItems }) {
  const [checked, setChecked] = useState(false);

  function handleIncreaseQty(index) {
    const newItems = [...items];
    newItems[index].quantity += 1;
    setItems(newItems);
  }

  function handleDecreaseQty(index) {
    const newItems = [...items];
    newItems[index].quantity -= 1;
    setItems(newItems);
  }

  function handleChecked(index) {
    const newItems = [...items];
    newItems[index].isChecked = !newItems[index].isChecked;
    setItems(newItems);
  }

  return (
    <ul>
      {items.map((item, index) => (
        <div className="item-container">
          <div className={`items ${item.isChecked ? "completed" : ""}`}>
            <input type="checkbox" onChange={() => handleChecked(index)} />
            <p>{item.item}</p>
          </div>
          <div>
            <Button onClick={() => handleDecreaseQty(index)}>⬅️</Button>
            {item.quantity}
            <Button onClick={() => handleIncreaseQty(index)}>➡️</Button>
          </div>
        </div>
      ))}
    </ul>
  );
}

function TotalItems({ items }) {
  const totalQuantity = items.map((item) => item.quantity);
  return (
    <div>
      The Total: {totalQuantity.reduce((acc, curValue) => acc + curValue)}
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

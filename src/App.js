import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDelete(id) {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDelete={handleDelete} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🧳Travel With Me ✈</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Apa aja yang dibawa? 🤔</h3>
      <h3>Buat Lah List Barang Anda 😁📝</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Barang yang mau dibawa" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>Bawa</button>
    </form>
  );
}

function PackingList({ items, onDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onDelete={() => onDelete(item.id)} />
        ))}
      </ul>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#3d3b40" fill-opacity="1" d="M0,128L120,149.3C240,171,480,213,720,213.3C960,213,1200,171,1320,149.3L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
      </svg>
    </div>
  );
}

function Item({ item, onDelete }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={onDelete}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentagePacked = totalItems > 0 ? ((packedItems / totalItems) * 100).toFixed(0) : 0;

  return (
    <footer className="stats">
      <em>
        💼 Kamu punya {totalItems} barang di daftar, dan sudah packing {packedItems} barang {totalItems > 0 ? `(${percentagePacked}%)` : ""}
      </em>
    </footer>
  );
}

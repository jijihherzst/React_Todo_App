import { useState, useEffect } from 'react';
import './style.css';

function MainDiv() {
  const [inputValue, setInputValue] = useState('');
  const localItems = localStorage.getItem('todos');
  const localCompleted = localStorage.getItem('completed');
  const storedItems = JSON.parse(localItems);
  const storedCompleted = JSON.parse(localCompleted);
  const [items, setItems] = useState(storedItems);
  const [completed, setCompleted] = useState(storedCompleted);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(items));
    localStorage.setItem('completed', JSON.stringify(completed));
  }, [items, completed]);

  const addItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      addItem();
    }
  };

  const markComplete = (index) => {
    setCompleted((prevCompleted) => [...prevCompleted, items[index]]);
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const markUncomplete = (index: number) => {
    setItems((prevItems) => [...prevItems, completed[index]]);
    setCompleted((prevCompleted) =>
      prevCompleted.filter((_, i) => i !== index)
    );
  };

  const deleteTodo = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const deleteCompleted = (index: number) => {
    setCompleted((prevCompleted) =>
      prevCompleted.filter((ele, i) => i !== index)
    );
  };

  return (
    <div className="todo-list">
      <div className="head">
        <input
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="New todo..."
        />
        <button onClick={addItem} className="add">
          Add
        </button>
      </div>
      {items.length > 0 && <h4>Tasks</h4>}
      <ul className="list">
        {items.map((item, index) => (
          <div className="item-wrapper" key={index}>
            <input
              onClick={() => markComplete(index)}
              type="checkbox"
              checked={false}
              name="item"
              readOnly
            />
            <li>{item}</li>
            <span onClick={() => deleteTodo(index)} className="material-icons">
              delete
            </span>
          </div>
        ))}
      </ul>
      {completed.length > 0 && <h4>Completed Tasks</h4>}
      <ul className="list-completed">
        {completed.map((item, index) => (
          <div className="item-wrapper" key={index}>
            <input
              onClick={() => markUncomplete(index)}
              type="checkbox"
              checked={true}
              name="item"
              readOnly
            />
            <li className="completed">{item}</li>
            <span
              onClick={() => deleteCompleted(index)}
              className="material-icons"
            >
              delete
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MainDiv;

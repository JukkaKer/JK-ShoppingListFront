import './App.css';
import {useState, useEffect} from "react";

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [items, setItems] = useState([]);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(()=> {
    fetch(URL + 'index.php')
    .then(response => response.json())
    .then(
      (response) => {
        setItems(response);
      }, (error) => {
        alert(error);
      }
    )
  }, []);

  function save(e) {
    e.preventDefault();
    let status = 0;
    fetch(URL+'add.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json', 
      },
      body: JSON.stringify({
        desc: desc,
        amount: amount
      })
    })
    .then(res => {
      status = parseInt(res.status);
      return res.json();
    })
    .then(
      (res) => {
        if(status == 200) {
          setItems(items => [...items, res]);
          setDesc('');
          setAmount('');
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
    )
  }

  return (
    <div className="App">
      <h3>Shopping List</h3>
      <form onSubmit={save}>
        <label>New item</label>
        <input value={desc} onChange={e => setDesc(e.target.value)} type='text' placeholder='type description' required/>
        <input value={amount} onChange={e => setAmount(e.target.value)} type='text' placeholder='type amount' required/>
        <button>Add</button>
      </form>
      

      <div>
        {items.map(item => (
          <p className="item" key={item.id}>
            <span>{item.description}</span>
            <span>{item.amount}</span>
            <a href='#'>Delete</a>
          </p>
        ))}
      </div>
    </div>
  );
}



export default App;

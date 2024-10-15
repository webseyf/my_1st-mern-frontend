import axios from 'axios';
import { useState, useEffect } from 'react';

export default function App() {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then(res => {
        setList(res.data);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
      });
  }, []);

  function posting() {
    axios.post("http://localhost:3000/create", { name, email, age })
      .then(res => {
        setList([...list, { name, email, age }]); // Update the list with the new user
      })
      .catch(err => {
        console.error("Error posting data:", err);
      });
  }

  return (
    <div>
      <div>
        {list.map(user => (
          <div key={user.id}> {/* Added key prop */}
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
            <h3>{user.age}</h3>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <input 
          type="text" 
          placeholder="your name" 
          name="name" 
          onChange={e => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="your email" 
          name="email" 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="your age" 
          name="age" 
          onChange={e => setAge(e.target.value)} 
        />

        <button onClick={posting}>Create User</button>
      </div>
    </div>
  );
}

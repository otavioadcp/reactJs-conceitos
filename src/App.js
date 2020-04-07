import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    });
  }, []);

  function handleAddRepository() {
    api.post("repositories", {
      title: `Novo Repositório ${Date.now()}`,
      url: "http://github.com/...",
      techs: []
    }).then(response => {
      setRepositories([...repositories, response.data])
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`, );

    const index = repositories.findIndex(data => data.id === id);

    repositories.splice(index, 1)

    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

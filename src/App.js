import React, {useState} from 'react';
import UserTable from './componentes/UserTable';
import { v4 as uuidv4 } from 'uuid';
import AddUserForm from './componentes/AddUserForm';
import EditUserForm from './componentes/EditUserForm';

function App() {

  const usersData = [
    { id: uuidv4(), name: 'Tania', username: 'floppydiskette' },
    { id: uuidv4(), name: 'Craig', username: 'siliconeidolon' },
    { id: uuidv4(), name: 'Ben', username: 'benisphere' },
    { id: uuidv4(), name: 'Lupita', username: 'lupita_00'}
  ]

  //Nota simpre que usemos useState hay que ver que se este agregando en la lib de react
  const [users, setUsers] = useState(usersData);
  
  //Agregar usuarios
  const addUser = (user) => {
    user.id = uuidv4()
    setUsers([
      ...users,
      user
    ])
  }

  //Eliminar usuarios
  const deleteUser = (id) => {
    console.log(id)
    //Condicion para sobre escribir el arreglo
    setUsers(users.filter(user => user.id != id))
  }

  //Editar usuario
  const [bandera, setbandera] = useState(false);
  const [currentUser, setcurrentUser] = useState({
    id: null,
    name: '',
    username: ''
  });

  const editRow = (user) =>{
    setbandera(true);
    setcurrentUser({
      id: user.id, name: user.name, username: user.username
    })
  }

  const updateUser = (id, updateUser) => {
    setbandera(false);
    setUsers(users.map(user => (user.id === id ? updateUser : user)))
  }

  return (
    <div className="container">
      <h1>Proyecto unidad 2 DS CRUD</h1>
      <div className="flex-row">
      <div className="flex-large">
          {
            bandera ? (
            <div>
              <h2>Editar usuario</h2>
              <EditUserForm currentUser={currentUser} updateUser={updateUser}/>
            </div>
            ) : (
              <div>
                <h2>Agregar usuarios</h2>
                <AddUserForm addUser={addUser}/>
              </div>
            )
          }
        </div>
        <div className="flex-large">
          <h2>Visualizar</h2>
          <UserTable 
          users={users} 
          deleteUser={deleteUser} 
          editRow={editRow}/>
        </div>
      </div>
    </div>
  );
}

export default App;

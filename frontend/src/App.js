import React, {useState, useEffect} from "react";
import { MdAssignmentTurnedIn } from "react-icons/md";

import api from "./services/api";

//Imports CSS
import './css/global.css'
import './css/sidebar.css'
import './css/app.css'
import './css/main.css'

//Imports Components
import Notes from "./Components/Notes";
import RadioButton from "./Components/RadioButton";

export default function App() {

  //useState variables
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [allNotes, setAllNotes] = useState([])
  const [selectedValue, setSelectedValue] = useState('all')

  //UseEffect
  //Popula a tela com os dados retornados do banco
  useEffect(() => {
    getAllNotes()
  }, [])

  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById('btn_submit')
      btn.style.background = "#b07fff"
      btn.style.color = "#c1c1c1"

      if(title && notes) {
        btn.style.background = "#8940ff"
        btn.style.color = "#fff"
      }
    }
    enableSubmitButton()
  }, [title, notes])

  //Functions
  async function getAllNotes() {
    const response = await api.get('annotations',);

    setAllNotes(response.data)
  }

  async function loadNotes(option) {
    const params = {priority: option};
    //Mesma função do query do insomnia 
    const response = await api.get('./priorities', {params});

    if(response) {
      setAllNotes(response.data);
    }
  }

  function handleChange(e) {
    setSelectedValue(e.value);

    if(e.checked && e.value != 'all') {
      loadNotes(e.value);
    }
    else {
      getAllNotes();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/annotations', {
      title,
      notes,
      priority: false
    })

    setTitle('')
    setNotes('')

    if(selectedValue != 'all') {
      getAllNotes();
      setSelectedValue('all')
    } else {
      setAllNotes([...allNotes, response.data])
    }
  }

  async function handleDelete(id) {
    const deletedNote = await api.delete(`/annotations/${id}`);

    if(deletedNote) {
      //Se o id que foi passado for diferente do que foi encontrado
      setAllNotes(allNotes.filter(note => note._id != id))
    }
  }

  async function handleChangePriority(id) {
    const note = await api.post(`/priorities/${id}`);

    if(note && selectedValue != 'all') {
      loadNotes(selectedValue);
    } else if (note) {
      getAllNotes();
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>My Notes <MdAssignmentTurnedIn size={30}/></strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">Título</label>
            <input 
              required
              maxLength={30}
              value={title}
              onChange = {e => setTitle(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="nota">Anotação</label>
            <textarea
              required
              maxLength={380}
              value={notes}
              onChange = {e => setNotes(e.target.value)}
            />
          </div>
          <button id="btn_submit" type="submit">Salvar</button>
        </form>
        <RadioButton 
          selectedValue = {selectedValue}
          handleChange = {handleChange}
        />
      </aside>
      <main>
        <ul>
          {allNotes.map(data => (
            <Notes
              key={data._id} 
              data={data}
              handleDelete={handleDelete}
              handleChangePriority = {handleChangePriority}
              />
          ))}
        </ul>
      </main>
    </div>
  );
}


import React, {useState, useEffect} from 'react'

import './styles.css'
import './styles-priority.css'

import { MdDelete, MdError } from "react-icons/md";
import api from '../../services/api';

export default function Notes({ data, handleDelete, handleChangePriority }) {

  const [changedNotes, setChangedNotes] = useState('')

  async function handleSave(e, notes) {

    e.style.cursor = 'default'

    //Se o atributo sofrer alteração, ele manda esse novo valor para o banco
    if(changedNotes && changedNotes != notes) {
      await api.post(`/contents/${data._id}`, {
        notes: changedNotes,
      })
    }
  }

  async function handleEdit(e, priority) {
    e.style.cursor = 'text'
  }

  return (
    <>
        <li className={data.priority ? "notepad-infos-priority" : "notepad-infos"}>
            <div>
              <strong>{data.title}</strong>
              <div><MdDelete size={20} onClick={() => handleDelete(data._id)}/></div>
            </div>
            <textarea 
              defaultValue={data.notes}
              onClick = {e => handleEdit(e.target, data.priority)}
              onChange = {e => setChangedNotes(e.target.value)}
              onBlur = {e => handleSave(e.target, data.notes)}
            />
            <span><MdError size={20} onClick={() => handleChangePriority(data._id)}/></span>
        </li>   
    </>
  )
}

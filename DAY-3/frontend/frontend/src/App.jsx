import React, { useEffect, useState } from 'react'
import axios from "axios"


const App = () => {

  const [notes , setNotes] = useState([])

  // get request

function fetchData (){
  axios.get("http://localhost:3000/api/notes").then((res)=>{

   
    setNotes(res.data.notes)
    
  })
}

useEffect(()=>{
fetchData()
console.log("runs");

},[])


// post request 

function submitHandler(e){
  
  e.preventDefault()
  // console.log(e.target.elements)

  const {title , desc} = e.target.elements

  axios.post("http://localhost:3000/api/notes",{
    title : title.value,
    description :  desc.value
  }).then((res)=>{


    
    fetchData()

  })


  
}


// delete request

function deleteNote(id){
 axios.delete("http://localhost:3000/api/notes/"+id).then((res)=>{

  fetchData()

  

 })


 

  

  
}


// update request


function updateNote(id) {

  axios.patch("http://localhost:3000/api/notes/" + id, {

    
    description: "Updated Description"
  })
  .then((res) => {


    fetchData();

  })

}




  return (
    <div>
<form onSubmit={submitHandler}>



    <input  type="text" name='title' placeholder='enter title here' />
    <input type="text" name='desc' placeholder='enter description here' />

    <button>create note</button>


</form>


<div className="container">

{
  notes.map((note,key)=>{
  return <div key={key} className="notes">

  <h1>{note.title}</h1>
  <p>{note.description} </p>
  <button onClick={()=>{
    deleteNote(note._id)

  }}>delete</button>

  <button onClick={() => {
  updateNote(note._id)
}}>
  update
</button>
</div>


  })
}

</div>



    </div>
  )
}

export default App
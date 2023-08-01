import React, { useState, useEffect } from 'react'
import './App.css'
import Auth from './components/auth'
import { auth, db,storage } from './config/firebase'
import {  collection, getDocs,addDoc, deleteDoc, doc, updateDoc  } from "firebase/firestore"
import {ref , uploadBytes , listAll ,getDownloadURL} from 'firebase/storage'
function App() {
  //exisiting list or reading
  const [movielist, setmovielist] = useState([])

 //adding into list new collection
  const [moviename, setmoviename] = useState("")
  const [moviedate, setmoviedate] = useState(0)
  const [movieoscar, setmovieoscar] = useState(false)

  //new title update
const [updatetitle , setupdatetitle] = useState("")

//file upload
const [fileupload , setfileupload] = React.useState(null)
//display file
const[imagelist , setimagelist] = useState([])


  //providing reference 
  const moviecollection = collection(db, "movies")
  const imglistref = ref(storage)

  const getmovielist = async () =>{
    try{
      const data = await getDocs(moviecollection)
      const filteredData = data.docs.map((doc)=>({
        ...doc.data(), 
        id : doc.id
      }));
      setmovielist(filteredData)
    }
    catch(err)
    {
      console.error(err)
    }
  }


  useEffect(() => {
    listAll(imglistref)
      .then((response) => {
        const uniqueURLs = new Set();
        const promises = response.items.map((item) =>
          getDownloadURL(item).then((url) => uniqueURLs.add(url))
        );
  
        // Wait for all promises to resolve and then update the state
        Promise.all(promises).then(() => setimagelist([...uniqueURLs]));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  

  React.useEffect (()=>{
    getmovielist();
  },[])
  
  
      const SubmitMovie = async() => {
        try{
          await addDoc (moviecollection, 
            {
              title: moviename , releasedate : moviedate ,
              recievedoscar: movieoscar,
          })
          getmovielist() 
        }
        catch(Err){
          console.error(Err)
        }
      }
      console.log(SubmitMovie)

      const deletemovie = async (id) => {
        try {
          const deldoc = doc(db, "movies", id);
          await deleteDoc(deldoc);
          // Update the movielist state after successful deletion
          setmovielist((prevList) => prevList.filter((movie) => movie.id !== id)); 
        } catch (err) {
          console.log(err);
        }
      };
      
      const updatemovie = async (id) => {
        try {
          const updatedoc = doc(db, "movies", id);
          await updateDoc(updatedoc, { title: updatetitle });
      
          // Update the movielist state with the new title
          setmovielist((prevList) =>
            prevList.map((movie) => (movie.id === id ? { ...movie, title: updatetitle } : movie))
          );
        } catch (err) {
          console.log(err);
        }
      };


      const uploadFile = async ()=>{
        if(!fileupload)
          return;
          const file = ref(storage, `${fileupload.name}`);
          try{
            await uploadBytes(file ,fileupload).then(
              (snapshot)=>{
                getDownloadURL(snapshot.ref).then((url)=>{
                  setimagelist((prev)=> [...prev, url])
                })
              }
            )
          }
          catch(err){
            console.log(err)
          }
      }
      
  
  return (
    <div>
      <h1>Firebase Practice bro</h1>
      <Auth />

        <div className='movielistinput'>
          <input type="text"
              placeholder='Enter Movie Name'
              onChange={(e)=> setmoviename(e.target.value)}
            />
          <input type="number"
            placeholder='Release Year'
            onChange={(e)=> setmoviedate(Number(e.target.value))}
          />

          <div>
          <input type="checkbox"
            checked = {movieoscar}
            onChange={(e)=> setmovieoscar(e.target.checked)}
          />
          <label > Recieved an oscar</label>
          </div>

          <button onClick={SubmitMovie}>Submit</button>
        </div>

        <div>
          {movielist.map((movie)=>(
            <div>
              <h1 
                style={{color: movie.recievedoscar ? "green" : "blue"}}
              >{movie.title}</h1>
              <p> Release Date: {movie.releasedate}</p>
              <button onClick={()=> (deletemovie(movie.id))}>Delete Movie</button>
              <input type="text"
                placeholder='update title'
                onChange={(e)=>(setupdatetitle(e.target.value))}
              />
              <button onClick={()=>updatemovie(movie.id)}>Update Title</button>
            </div>
        ))}
        </div>

        <div>
          <input type="file"
          onChange={(e) => setfileupload(e.target.files[0])}
          />
          <button onClick={uploadFile}>Upload File</button>

        </div>
        <div className='imgd'>
          {imagelist.map((url)=>{
              return <img src={url} />;
            })}
        </div>
          
    </div>
  )
}

export default App

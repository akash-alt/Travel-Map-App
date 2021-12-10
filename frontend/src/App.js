import React, { useEffect, useState } from "react"
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from "@material-ui/icons"
import "./app.css"
import axios from "axios"
import { format } from 'timeago.js';
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
    // const currentUser = "sanam"; // we have assign value as current user
    const myStorage = window.localStorage;
    const [currentUser,setCurrentUser] = useState(myStorage.getItem("user"));
    const [currentUsername,setCurrentUsername] = useState();
    const [pins,setPins] = useState([]);
    const [currentPlaceId,setCurrentPlaceId] = useState(null);
    const [newPlace,setNewPlace] = useState();
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [star, setStar] = useState(0);
    const [showRegister,setShowRegister] = useState(false);
    const [showLogin,setShowLogin] = useState(false);
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 21,
        longitude: 78,
        zoom: 4
    });

    useEffect(()=>{
        const getPins = async()=>{
            try{
                const res = await axios.get("/pins")
                setPins(res.data)
            }catch(err){
                console.log(err)
            }
        }
       getPins()
    },[])

    // here we have set current place id
    const handleMarkerClick = (id,lat,long)=>{
        setCurrentPlaceId(id);
        setViewport({...viewport,latitude:lat,longitude:long})
    }

    // adding new place
    const handleAddClick = (e)=>{
        const [long,lat] = e.lngLat;
        setNewPlace({
            lat,
            long,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPin = {
          username: currentUser,
          title,
          desc,
          rating: star,
          lat: newPlace.lat,
          long: newPlace.long,
        };  
        try {
          const res = await axios.post("/pins", newPin);
          setPins([...pins, res.data]);
          setNewPlace(null);
        } catch (err) {
          console.log(err);
        }
      };

      const handleLogout = () => {
        setCurrentUsername(null);
        myStorage.removeItem("user");
      };

    return (
        <div className="App">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
                onDblClick={handleAddClick}
                transitionDuration= "100" // this is used for the responding the action
            >
                {
                    pins.map(p=>(
               <>                       
                <Marker
                    latitude={p.lat}//27.17
                    longitude={p.long}//78.04
                    offsetLeft={-viewport.zoom * 3.5}//-20
                    offsetTop={-viewport.zoom * 7}//-10
                >
                    {/* <div>You are here</div> */}
                    <Room style={{ fontSize: viewport.zoom * 7, cursor:"pointer",
                    color:p.username === currentUser ? "tomato": "blue",
                     }}
                        onClick={()=>handleMarkerClick(p._id,p.lat,p.long)}
                    />
                </Marker>
                        {
                            p._id === currentPlaceId && (      
                 <Popup
                    latitude={p.lat}//27.17
                    longitude={p.long}//78.04
                    closeButton={true}
                    closeOnClick={false}                  
                    anchor="left" 
                    onClose= {()=>setCurrentPlaceId(null)} // this is used for the closing tab 
                    >
                    
                    <div className="card">
                        <label>Place</label>
                        <h4 className="place">{p.title}</h4>
                        <label>Review</label>
                        <p className="desc">{p.desc}</p>
                        <label>Rating</label>
                        <div className="star">
                            {Array(p.rating).fill(<Star className="star"/>)}                          
                        </div>
                        <label>Information</label>
                        <span className="username"> Created by <b>{p.username}</b></span>
                        <span className="date">{format(p.createdAt)}</span>
                    </div>
                </Popup> 
                            )}
                </>                  
                ))}
                { newPlace && (
                 <Popup
                    latitude={newPlace.lat}//27.17
                    longitude={newPlace.long}//78.04
                    closeButton={true}
                    closeOnClick={false}                  
                    anchor="left" 
                    onClose= {()=>setNewPlace(null)} // this is used for the closing tab 
                    > 
                        <div>
                            <form onSubmit={handleSubmit} className="newform">
                                <label>Title</label>
                                <input 
                                placeholder="Enter a title"
                                onChange={(e)=>setTitle(e.target.value)}
                                />
                                <label>Review</label>
                                <textarea 
                                placeholder="Say us someting about this place" 
                                onChange={(e)=>setDesc(e.target.value)}
                                />
                                <label>Rating</label>
                                <select onChange={(e) => setStar(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <button type="submit" className="submitbutton">Add Pin</button>
                            </form>
                        </div>

                    </Popup>
                    )}
                    {/* here mentioning logic fro users */}
                    {currentUser?( 
                    <button className="logout" 
                    onClick={handleLogout}>Logout</button>)
                    : (<div className="buttons">
                            <button 
                            className="login" 
                            onClick={()=>setShowLogin(true)}
                            >LogIn</button>
                            <button 
                            className="register" 
                            onClick={()=>setShowRegister(true)}
                            >Register</button>
                        </div>)}

                {showRegister &&  <Register setShowRegister={setShowRegister}/>}             
                {showLogin && 
                <Login 
                    setShowLogin={setShowLogin} 
                    myStorage={myStorage} 
                    setCurrentUser={setCurrentUser}
                />}
            </ReactMapGL>
        </div>
    )
}

export default App;
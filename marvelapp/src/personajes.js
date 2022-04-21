import Personaje from "./personaje"
import React, { useEffect,useState } from "react";

function Personajes(props) {

    let [personajes, setPersonajes] = useState([]);
    useEffect(()=>{
        if(!navigator.onLine){
            if(JSON.parse(localStorage.getItem("personajes")) === null) {
                setPersonajes("Loading...")
            } else {
                setPersonajes(JSON.parse(localStorage.getItem("personajes")));
            }
        } else {
            fetch('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=7f9022ea313024551d395be6ce641b64&hash=2532facc565c33ecbc10c2d104c3c30f')
            .then(resp=>resp.json())
            .then(data => data['data']['results'])
            .then(personajes=>{ 
            setPersonajes(personajes);
            localStorage.setItem("personajes", JSON.stringify(personajes))
            });
        }      
    }, ([]));

    return(
        <div className="row">
        {personajes.map((item) => (
            <div className="col-3" key={item['id']}>
                <Personaje data={item}/>
             </div>
        ))}
        </div>
    );
}

export default Personajes;
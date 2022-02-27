const allPlayers = () =>{
    document.getElementById('spinner').style.display = 'block';
    const searchValue = document.getElementById('search-box').value;
    document.getElementById('search-box').value = '';
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPlayerDetails(data.player))
    // document.getElementById('spinner').style.display = 'none';
    // console.log(searchValue);
}

const displayPlayerDetails = players => {
    document.getElementById('player-container').textContent= '';
    if(players){
        document.getElementById('spinner').style.display = 'none';
    }
    else{
        document.getElementById('spinner').style.display = 'block';
    }
    for(const player of players){
        const parent = document.getElementById('player-container');
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card mt-3 rounded p-5 text-center border">
                    <div class="pro-pic">
                        <img class="w-50 " src="${player.strThumb}" alt="">
                    </div>
                    <h2>Name:${player.strPlayer}</h2>
                    <h5>Country: ${player.strNationality}</h5>
                    <h5>Position: ${player.strPosition}</h5>
                    <h6>Strong Foot: ${player.strSide}</h6>
                    <h6>Last Signing: ${player.strSigning}</h6>
                    <h6>Current Club: ${player.strTeam}</h6>
                    <h6>Jersey No: ${player.strNumber}</h6>
                    <h6>Natonal Team: ${player.strTeam2}</h6>
                    <p></p>
                    <div class="allbutton">
                        <button class="btn-danger btn">Delete</button>
                        <button onclick ="details('${player.idPlayer}')" class="btn-primary btn">Details</button>
                    </div>
                </div>
    `;
    parent.appendChild(div)
    // console.log(player.dateBorn);
    }  
}

// details

const details = (id) =>{
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => setDetails(data.players[0]))
}

const setDetails = info =>{
    if(info.strGender === 'Male'){
        document.getElementById('male').style.display = 'block';
        document.getElementById('female').style.display = 'none';
    }
    else{
        document.getElementById('male').style.display = 'none';
        document.getElementById('female').style.display = 'block';
    }
    const playerDetails = document.getElementById('details-container');
    playerDetails.innerHTML = `
    <div class="card mt-3 rounded p-5 text-center border">
    <div class="pro-pic">
        <img class="w-50 rounded" src="${info.strThumb}" alt="">
    </div>
    <h2>Name:${info.strPlayer}</h2>
    <h5>Country: ${info.strNationality}</h5>
    <h5>Position: ${info.strPosition}</h5>
    <h6>Strong Foot: ${info.strSide}</h6>
    <h6>Last Signing: ${info.strSigning}</h6>
    <h6>Current Club: ${info.strTeam}</h6>
    <h6>Jersey No: ${info.strNumber}</h6>
    <h6>Natonal Team: ${info.strTeam2}</h6>
    <p>${info.strDescriptionEN.slice(0, 150)}</p>
    `;
}
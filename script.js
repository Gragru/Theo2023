setInterval(updateDistance, 2000)
let playerLat, playerLon, playerDistance, tLat, tLon
let distanceTolerance = 5
let gamePosition = 0;
let counter = 0;
let points = 0;

nextPlace()

function savepos()
{
    let desc = document.getElementById("description").value;
    let url = "http://primat.se/services/sendform.aspx?xid=place_" +desc + "&xmail=micke@abc.se&lat=" + playerLat + "&lon=" + playerLon
    document.getElementById("sendlink").src=url
    
    
    //fetch("https://cors-anywhere.herokuapp.com/" + url)
    console.log(url)
}




function nextPlace() {
    tLat = adventure[gamePosition].lat
    tLon = adventure[gamePosition].lon
    console.log(tLat, tLon)
}

function incrementPlace()
{
    gamePosition++
}

function showclue()
{
    document.getElementById("clue").innerHTML = adventure[gamePosition].clue
}

function updateDistance() {

    let d = document.getElementById("distance")

    if (navigator.geolocation) {

        // Den här metoden returnerar ett Position-objekt
        // Sedan körs getPostion, som tar med sig Postion som inparameter
        navigator.geolocation.getCurrentPosition(getPosition)
    }
    else {
        d.innerHTML = "Supportas inte"
    }




    d.innerHTML = playerDistance
    let game = document.getElementById("game")
    console.log(playerDistance, distanceTolerance)
    
    if (playerDistance <= distanceTolerance) {
        // Hittat platsen
        game.innerHTML = ""
        
        if (adventure[gamePosition].type === "ok") {

            let name = document.createElement("h3")
            name.innerHTML = adventure[gamePosition].name
            game.appendChild(name)

            let text = document.createElement("h4")
            text.innerHTML = adventure[gamePosition].text
            game.appendChild(text)

            let okButton = document.createElement("input")
            okButton.type = "button"
            okButton.value = "Nästa plats"
            okButton.setAttribute("onclick", "incrementPlace(); showclue()")
            game.appendChild(okButton)




            // game.innerHTML = adventure[gamePosition].text
            
        }
    }
    else {
        
    }

    document.getElementById("lat").innerHTML = playerLat
    document.getElementById("lon").innerHTML = playerLon
}


let places = ""



function getPosition(position) {
    playerLat = position.coords.latitude
    playerLon = position.coords.longitude
    playerDistance = getDistance(playerLat, playerLon, tLat, tLon, "M")
    counter++;
    document.getElementById("counter").innerHTML = counter
}


function getDistance(lat1, lon1, lat2, lon2, unit) {

    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    if (unit == "M") { dist = dist * 1609.344; dist = Math.round(dist) }
    console.log(dist)
    return dist
}
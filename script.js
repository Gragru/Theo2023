setInterval(updateDistance, 1000)
let playerLat, playerLon, playerDistance, tLat, tLon
let distanceTolerance = 4
let gamePosition = 0;

nextPlace()

function nextPlace()
{
    tLat = adventure[gamePosition].lat
    tLon = adventure[gamePosition].lon
    console.log(tLat, tLon)
}


function updateDistance()
{



    let d = document.getElementById("distance")


    if (navigator.geolocation) {

    // Den här metoden returnerar ett Position-objekt
    // Sedan körs getPostion, som tar med sig Postion som inparameter
    navigator.geolocation.getCurrentPosition(getPosition)
    }
    else
    {
        d.innerHTML = "Supportas inte"
    }




    d.innerHTML = playerDistance
    let game = document.getElementById("game")
    if(distance < distanceTolerance)
    {
        // Hittat platsen
        if(adventure[gamePosition].type === "ok")
        {
            game.innerHTML = adventure[gamePosition].text
        }
    }
    else
    {
        game.innerHTML = "Inte framme än"
    }

    document.getElementById("lat").innerHTML = playerLat
    document.getElementById("lon").innerHTML = playerLon
}


let places = ""



function getPosition(position)
{
    playerLat = position.coords.latitude
    playerLon =  position.coords.longitude
    playerDistance = distance(playerLat, playerLon, tLat, tLon, "M")
}


function distance(lat1, lon1, lat2, lon2, unit) {
    
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    if (unit=="M") { dist = dist * 1609.344; dist = Math.round(dist)}
    console.log(dist)
    return dist
}
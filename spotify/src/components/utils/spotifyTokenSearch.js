export const spotifyTokenSearch = (info) => dispatch => {
    const clientId = "ff48ca622ed54e64810d10967a33b4ba"
    const clientSecret = "e15cd38ce23c4abf988215663194bfad"

    const options = {
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Authorization" : "Basic" + btoa(clientId + ":" + clientSecret)
        }
    }
}
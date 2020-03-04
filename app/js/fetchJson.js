export default function fetchJSON(url) {
    return fetch(url)
        .then(function(resp) {
            return resp.json()
        })
        .catch(function(err) {
            throw err
        })
}

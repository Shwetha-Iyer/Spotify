async function getToken() {
    try {
      const clientId = "f7ad4e2b25084a1daa232f35e6b3f63a";
      const clientSecret = "2939b6dbf0d6499799b91ea75404b90b";
      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
      });
      const data = await result.json();
      const accessToken = data.access_token;
      getPlaylist(accessToken);
      getTrack(accessToken);
    } catch (error) {
      console.log(error);
    }
}

async function getPlaylist(token){
    try{
        var resp = await fetch(
            "https://api.spotify.com/v1/users/qu9lafkb0qhg5caw8wnyt4x0d/playlists",
            {
                method: "GET",
                headers: { Authorization: "Bearer " + token },
            }
        );
        var data = await resp.json();
        console.log(data);
        var url = data.items[0].tracks.href;
        var res = await fetch(
            url,
            {
                method: "GET",
                headers: { Authorization: "Bearer " + token },
            }
        );
        var data1 = await res.json();
        console.log(data1);

        var res2 = await fetch(
            "https://api.spotify.com/v1/playlists/4touATv6V0obw6vXG7Ww3T/tracks",
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token 
                },
            }
        );
        var data2 = await res2.json();
        console.log(data2);

        
    }
    catch(error){
        console.log(error);
    }
}



async function getTrack(token) {
    try {
      const result = await fetch(
        `https://api.spotify.com/v1/albums/1fOJ6SHLXOLnsuuwiLyzft/tracks`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );
      const data = await result.json();
      console.log(data);
      var audio = document.getElementById("audio");
      data.items.forEach((songs) => {
        var src = document.createElement("source");
        src.setAttribute("src", songs.preview_url);
        audio.appendChild(src);
      });
    } catch (error) {
      console.log(error);
    }
}

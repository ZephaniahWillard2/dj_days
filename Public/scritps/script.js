      // album array
    let albums = [
      { id: 1, title: "When We All Fall Asleep Where Do We Go", artist: "Billie Eilish", genre: "Pop", coverArt: "/Users/htgparticipant/Documents/FrontEndDev/dj_days/imgs/pexels-wanshan-luo-18428987.jpg" },
      { id: 2, title: "The Click", artist: "AJR", genre: "Alt Pop", coverArt: "/Users/htgparticipant/Documents/FrontEndDev/dj_days/imgs/pexels-padli-pradana-772478.jpg" },
      { id: 3, title: "Album 3", artist: "Artist 3", genre: "Genre 3", coverArt: "https://example.com/album3-cover.jpg" }
    ];

    let nowPlayingAlbum = null;

    
// Function to display playing album
function displayNowPlaying() {
    const nowPlayingInfo = document.getElementById('nowPlayingInfo');
    nowPlayingInfo.innerHTML = '';
    if (nowPlayingAlbum) {
      const img = document.createElement('img');
      img.src = nowPlayingAlbum.coverArt;
      img.classList.add('responsive-image'); // Add class for responsive images
      nowPlayingInfo.appendChild(img);
      nowPlayingInfo.innerHTML += `
        <div id="now-Playing-Album-title"> Tittle: ${nowPlayingAlbum.title}</div>
        <div id="now-Playing-Album-artist"> By: ${nowPlayingAlbum.artist} </div>
        <div id="now-Playing-Album-genre"> Genre: ${nowPlayingAlbum.genre}</div>`
    } else {
      nowPlayingInfo.innerHTML = "";
    }
  }
  



    // Function to display album list
    function displayAlbums() {
      const albumListElement = document.getElementById('album-list');
      albumListElement.innerHTML = '';
      albums.forEach(album => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = album.coverArt;
        img.classList.add('responsive-image'); // Add class for responsive images
        li.appendChild(img);
        li.innerHTML += `
                      <p id="album-scroll-title">${album.title}</p>
                      <p id="album-scroll-artist">${album.artist}</p>
                      <p id="album-scroll-genre">${album.genre}</p>
                        `;
        li.addEventListener('click', () => {
          playAlbum(album);
        });
        albumListElement.appendChild(li);
      });
    }

    // Function for adding album
    function addAlbum() {
      const newAlbumTitle = document.getElementById('album-title-input').value;
      const newArtistName = document.getElementById('album-artist-input').value;
      const newAlbumGenre = document.getElementById('album-genre-input').value;
      const coverArtURL = document.getElementById('album-art-input').value;
      if (newAlbumTitle.trim() !== '' && newArtistName.trim() !== '' && newAlbumGenre.trim() !=='' && coverArtURL.trim() !== '') {
        const newAlbum = {
          id: albums.length + 1,
          title: newAlbumTitle,
          artist: newArtistName,
          genre: newAlbumGenre,
          coverArt: coverArtURL
        };
        albums.push(newAlbum);
        displayAlbums();
      }
    }

    // Function to play album
    function playAlbum(album) {
      nowPlayingAlbum = album;
      displayNowPlaying();
    }

    // Display
    displayNowPlaying();
    displayAlbums();
  
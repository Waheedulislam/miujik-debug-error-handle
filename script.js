const elementById = (id) => {
  return document.getElementById(id);
};

const handleaSerch = () => {
  const keyword = elementById('keyword');
  const artistsContainer = elementById('artists');
  const albumContainer = elementById('albums');

  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showArtist(data));

  keyword.value = '';
  artistsContainer.innerHTML = '';
  albumContainer.innerHTML = '';
};
const showArtist = ({ artists }) => {
  const artistsContainer = elementById('artists')
  artists.forEach((artist) => {
    const div = document.createElement('div');
    div.classList.add('artist-card');

    div.innerHTML = `<div class="image-container">
        <div class="image-container-inner">
          <img
            src="${artist.strArtistThumb ? artist.strArtistThumb : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=20&m=1214428300&s=612x612&w=0&h=MOvSM2M1l_beQ4UzfSU2pfv4sRjm0zkpeBtIV-P71JE='}"
            alt=""
          />
        </div>
      </div>
      <div class="info-container">
        <h1>${artist.strArtist ? artist.strArtist : 'Not Available'}</h1>
        <p>Country: ${artist.strCountry ? artist.strCountry : 'Not Available'}</p>
        <p>Style: ${artist.strGenre ? artist.strGenre : 'Not Available'}</p>
      </div>
      <button class="album-button">
        <i class="fa-solid fa-compact-disc"></i>
        <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
      </button>`;
    artistsContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const albumContainer = elementById('albums');
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showAlbum(data.album));
  albumContainer.innerHTML = '';
};

const showAlbum = (data) => {
  const albumContainer = elementById('albums');
  data.forEach((album) => {
    const div = document.createElement('div');
    div.classList.add('album');
    div.innerHTML = `<div class="album-image-container">
        <img
          src="${album.strAlbumThumb ? album.strAlbumThumb : 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWMlMjBhcHB8ZW58MHx8MHx8&w=1000&q=80'}"
          alt=""
        />
      </div>
      <div class="album-name">
          <h3>${album.strAlbum}</h3>
        </div>`

    albumContainer.appendChild(div);
  });
};
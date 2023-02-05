// Search Button
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const inputVal = document.querySelector(".input-keyword");
  fetch("http://www.omdbapi.com/?apikey=69247038&s=" + inputVal.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let card = "";
      movies.forEach((m) => (card += showCards(m)));
      const movieContainer = document.querySelector(".container-movies");
      movieContainer.innerHTML = card;

      // Detail Button
      const modalDetail = document.querySelectorAll(".modal-detail-button");
      modalDetail.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbid = this.dataset.imdbid;
          fetch("http://www.omdbapi.com/?apikey=69247038&i=" + imdbid)
            .then((response) => response.json())
            .then((m) => {
              const movieDetail = showMovieDetails(m);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = movieDetail;
            });
        });
      });
    });
});

function showCards(m) {
  return `<div class="col-md-4 my-3">
                <div class="card bg-secondary">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-imdbid= "${m.imdbID}" data-toggle="modal" data-target="#detailMovieModal">Show Detail</a>
                    </div>
                </div>
             </div>`;
}

function showMovieDetails(m) {
  return `<div class="container-fluid">
               <div class="row">
                   <div class="col-md3">
                       <div class="row">
                           <img src="${m.Poster}" class="img-fluid">
                       </div>
                   </div>
                   <div class="col-md">
                       <ul class="list-group">
                           <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                           <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
                           <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
                           <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
                           <li class="list-group-item"><h4>Plot: </h4>${m.Plot}</li>
                           <li class="list-group-item"><h4>Awards: </h4>${m.Awards}</li>
                         </ul>
                   </div>
               </div>
             </div>`;
}

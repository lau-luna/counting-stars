function getLastMusicReview(qEntries) {
  if (qEntries == null) {
    fetch("./music/reviews.html")
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const getLastMusicReviewDiv = doc.getElementById("latest-music-review");

        const reviewTitle = getLastMusicReviewDiv.querySelector("#music-title")?.innerText || "";
        const reviewAuthor = getLastMusicReviewDiv.querySelector("#music-author")?.innerText || "";

        const datos = [];

        datos.push(reviewTitle, reviewAuthor);

        console.log(datos);

        let lastMusicReviewDiv = document.getElementById("lastMusicReview");

        let author = document.createElement("p");
        author.textContent = reviewAuthor;

        let lastMusicReview = document.createElement("a");
        lastMusicReview.href = "./music/reviews.html#latest-music-review";
        lastMusicReview.textContent = reviewTitle;

        lastMusicReviewDiv.appendChild(author); 
        lastMusicReviewDiv.appendChild(lastMusicReview);
      });
  } 
}
getLastMusicReview();

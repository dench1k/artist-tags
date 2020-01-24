const app = () => {
  // cached DOM
  const tracklistInput = document.querySelector(".js-tracklist-input");
  const tracklistSubmit = document.querySelector(".js-tracklist-submit");

  //functions
  const submitTracklist = () => {
    const tracklistInputValue = tracklistInput.value;
    console.log(tracklistInputValue);
  };

  tracklistSubmit.addEventListener("click", submitTracklist, false);
};
app();

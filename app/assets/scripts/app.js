const app = () => {
  // cached DOM
  const tracklistInput = document.querySelector(".js-tracklist-input");
  const tracklistOutput = document.querySelector(".js-tracklist-output");
  const tracklistSubmit = document.querySelector(".js-tracklist-submit");

  //functions
  const submitTracklist = () => {
    const tracklistInputValue = tracklistInput.value;
    const tracklistInputArray = tracklistInputValue.split("-");

    const getUniqueArray = arr => {
      return [...new Set(arr.sort((a, b) => a - b))];
    };

    const tracklistInputArrayUnique = getUniqueArray(tracklistInputArray);
    console.log(tracklistInputArrayUnique);
  };

  tracklistSubmit.addEventListener("click", submitTracklist, false);
};
app();

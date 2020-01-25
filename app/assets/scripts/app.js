const app = () => {
  // cached DOM
  const tracklistInput = document.querySelector(".js-tracklist-input");
  const tracklistOutput = document.querySelector(".js-tracklist-output");
  const tracklistSubmit = document.querySelector(".js-tracklist-submit");

  //functions
  const submitTracklist = () => {
    const tracklistInputValue = tracklistInput.value;
    const tracklistInputArray = tracklistInputValue.split("\n");

    const removeNumbersArray = arr => {
      return arr.map(item => {
        return item.split(/\d\d-/);
      });
    };
    const removeSpacesArray = arr => {
      return arr.flatMap(item => {
        return item[1];
      });
    };
    const getUniqueArray = arr => {
      return [...new Set(arr)];
    };

    const splittedByNumbersArray = removeNumbersArray(tracklistInputArray);
    const flattedBySpacesArray = removeSpacesArray(splittedByNumbersArray);
    const tracklistInputArrayUnique = getUniqueArray(tracklistInputArray);

    console.log(egz);
  };

  tracklistSubmit.addEventListener("click", submitTracklist, false);
};
app();

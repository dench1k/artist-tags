const app = () => {
  // cached DOM
  const tracklistInput = document.querySelector(".js-tracklist-input");
  const tracklistOutput = document.querySelector(".js-tracklist-output");
  const tracklistSubmit = document.querySelector(".js-tracklist-submit");

  //functions
  const submitTracklist = () => {
    const tracklistInputValue = tracklistInput.value.trim();
    const tracklistInputArray = tracklistInputValue.split("\n");

    const removeNumbersArray = arr => {
      return arr.map(item => {
        return item.split(/\d\d-/);
      });
    };

    const removeDashesArray = arr => {
      return arr.map(item => {
        return item.split(" - ");
      });
    };

    const removeAmpersandArray = arr => {
      return arr.map(item => {
        return item.split(" & ");
      });
    };

    const splitBySpaceArray = arr => {
      return arr.map(item => {
        return item.split(" ");
      });
    };

    const removeSpacesArray = arr => {
      return arr.map(item => {
        return item
          .split(" ")
          .join("")
          .toLowerCase();
      });
    };

    const getParenthesisArray = arr => {
      return arr.map(item => {
        const regExp = /\(([^)]+)\)/g;
        return item.split(regExp);
      });
    };

    const filterParenthesisArray = arr => {
      return arr.filter(item => {
        return item[1];
      });
    };

    const getFlatArray = arr => {
      return arr.flatMap(item => {
        return item;
      });
    };

    const getFlatArrayByIndex = (arr, index = 0) => {
      return arr.flatMap(item => {
        return item[index];
      });
    };

    const getUniqueArray = arr => {
      return [...new Set(arr)];
    };

    const splittedByNumbersArray = removeNumbersArray(tracklistInputArray);
    const flattedBySpacesArray = getFlatArrayByIndex(splittedByNumbersArray, 1);
    const splittedByDashesArray = removeDashesArray(flattedBySpacesArray);
    const flattedByArtistArray = getFlatArrayByIndex(splittedByDashesArray);
    const splittedByAmpersandArray = removeAmpersandArray(flattedByArtistArray);
    const flattedByAmpersandArray = getFlatArray(splittedByAmpersandArray);
    const combinedByArtistArray = removeSpacesArray(flattedByAmpersandArray);

    const flattedBySongArray = getFlatArrayByIndex(splittedByDashesArray, 1);
    const splittedByAdditionalInfoArray = getParenthesisArray(
      flattedBySongArray
    );
    const filteredByParenthesisArray = filterParenthesisArray(
      splittedByAdditionalInfoArray
    );
    const flattedByParenthesisArray = getFlatArrayByIndex(
      filteredByParenthesisArray,
      1
    );
    const splittedBySubAddInfo = getFlatArray(
      splitBySpaceArray(flattedByParenthesisArray)
    );
    const tracklistInputArrayUnique = getUniqueArray(tracklistInputArray);

    console.log(combinedByArtistArray);
    console.log(splittedBySubAddInfo);
  };

  tracklistSubmit.addEventListener("click", submitTracklist, false);
};
app();

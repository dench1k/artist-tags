const app = () => {
  // data
  const DEFAULT_TAGS = [
    "liquidxd",
    "liquidxd004",
    "liquid",
    "liquiddnb",
    "dnb",
    "xd",
    "xd004",
    "drumandbass",
    "drum&bass",
    "liquiddrumandbass",
    "liquiddrum&bass",
    "music",
    "dench1k",
    "denchke"
  ];
  const BAN_WORDLIST = ["mix", "original", "remix", "edit", "&"];

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
        return item.toLowerCase().split(" ");
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

    const filterByWordlist = (arr, wordlist) => {
      return arr.filter(item => {
        return !wordlist.includes(item);
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

    console.log(combinedByArtistArray);
    console.log(splittedBySubAddInfo);
    const processedArray = getUniqueArray([
      ...DEFAULT_TAGS,
      ...combinedByArtistArray,
      ...splittedBySubAddInfo
    ]);

    const filteredProcessedArray = filterByWordlist(
      processedArray,
      BAN_WORDLIST
    );

    console.log(filteredProcessedArray);
  };

  tracklistSubmit.addEventListener("click", submitTracklist, false);
};
app();

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
    "vocaldrumandbass",
    "vocaldrumandbass2020",
    "music",
    "dench1k",
    "denchke"
  ];
  const BAN_WORDLIST = [
    "mix",
    "original",
    "remix",
    "edit",
    "&",
    "vip",
    "feat",
    "feat.",
    "ft",
    "ft.",
    "bootleg"
  ];

  // cached DOM
  const tracklistInput = document.querySelector(".js-tracklist-input");
  const tracklistOutput = document.querySelector(".js-tracklist-output");
  const tracklistSubmit = document.querySelector(".js-tracklist-submit");
  const tagsLengthOutput = document.querySelector(".js-tags-length");

  //functions
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

  const copyToClipboard = el => {
    el.select();
    document.execCommand("copy");
  };

  const getTagsLength = str => {
    return str.split(",").length;
  };

  const onChangeOutput = () => {
    const tags = tracklistOutput.value;
    if (tags.length > 1) {
      tagsLengthOutput.innerHTML = getTagsLength(tags);
    }
  };

  /**
   * Process input data and return a formatted string as output
   * @param {string} inputData - A string with input data
   * @return {string}
   */
  const processData = inputData => {
    const tracklistInputArray = inputData.trim().split("\n");
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

    const outputData = filteredProcessedArray.join(", ");

    console.log(outputData);

    return outputData;
  };

  const submitTracklist = () => {
    // Get tags string
    const tags = processData(tracklistInput.value);
    // Paste to the output textarea
    tracklistOutput.value = tags;
    // Show tags length
    tagsLengthOutput.innerHTML = getTagsLength(tags);
    // Copy it the the clipboard
    copyToClipboard(tracklistOutput);
  };

  tracklistSubmit.addEventListener("click", submitTracklist, false);
  tracklistOutput.addEventListener("input", onChangeOutput, false);
};
app();

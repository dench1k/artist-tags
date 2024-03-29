"use strict";

const app = (() => {
  // data
  let dynamicTags = [];
  const DEFAULT_TAGS = [
    "liquidxd",
    "liquid",
    "liquiddnb",
    "dnb",
    "xd",
    "drumandbass",
    "drum&bass",
    "liquiddrumandbass",
    "liquiddrum&bass",
    "vocaldrumandbass",
    "vocaldrumandbass2024",
    "music",
    "dench1k",
    "denchke",
  ];
  const BAN_WORDLIST = [
    "mix",
    "original",
    "remix",
    "Remix",
    "edit",
    "&",
    "vip",
    "feat",
    "feat.",
    "ft",
    "ft.",
    "bootleg",
    "VIP",
    " x ",
    "vs",
    "vs.",
  ];
  const MAX_TAGS_NUM = 50;

  //functions
  const removeNumbersArray = (arr) => {
    return arr.map((item) => {
      return item.split(/\d\d-/);
    });
  };

  const removeDashesArray = (arr) => {
    return arr.map((item) => {
      return item.split(" - ");
    });
  };

  const removeAmpersandArray = (arr) => {
    return arr.map((item) => {
      return item.split(" & ");
    });
  };

  const splitBySpaceArray = (arr) => {
    return arr.map((item) => {
      return item.split(" ");
    });
  };

  const getParenthesisArray = (arr) => {
    return arr.map((item) => {
      const regExp = /\(([^)]+)\)/g;
      return item.split(regExp);
    });
  };

  const filterParenthesisArray = (arr) => {
    return arr.filter((item) => {
      return item[1];
    });
  };

  const lowerArray = (arr) => arr.map((element) => element.toLowerCase());

  const filterByWordlist = (arr, wordlist) => {
    return arr.filter((item) => {
      return !wordlist.includes(item);
    });
  };

  const getFlatArray = (arr) => {
    return arr.flatMap((item) => {
      return item;
    });
  };

  const getFlatArrayByIndex = (arr, index = 0) => {
    return arr.flatMap((item) => {
      return item[index];
    });
  };

  const getUniqueArray = (arr) => {
    return [...new Set(arr)];
  };

  /**
   * Process input data and return a formatted string as output
   * @param {string} inputData - A string with input data
   * @return {string}
   */
  const processData = (inputData) => {
    const tracklistInputArray = inputData.trim().split("\n");
    const splittedByNumbersArray = removeNumbersArray(tracklistInputArray);
    const flattedBySpacesArray = getFlatArrayByIndex(splittedByNumbersArray, 1);
    const splittedByDashesArray = removeDashesArray(flattedBySpacesArray);
    const flattedByArtistArray = getFlatArrayByIndex(splittedByDashesArray);
    const splittedByAmpersandArray = removeAmpersandArray(flattedByArtistArray);
    const flattedByAmpersandArray = getFlatArray(splittedByAmpersandArray);
    const flattedBySongArray = getFlatArrayByIndex(splittedByDashesArray, 1);
    const splittedByAdditionalInfoArray =
      getParenthesisArray(flattedBySongArray);
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

    const processedArray = getUniqueArray([
      ...DEFAULT_TAGS,
      ...dynamicTags,
      ...flattedByAmpersandArray,
      ...splittedBySubAddInfo,
    ]);

    const filteredProcessedArray = filterByWordlist(
      processedArray,
      BAN_WORDLIST
    );

    // Final output data
    const outputData = filteredProcessedArray.join(", ");

    return outputData;
  };

  const clientInit = () => {
    // cached DOM
    const tracklistInput = document.querySelector(".js-tracklist-input");
    const tracklistOutput = document.querySelector(".js-tracklist-output");
    const tracklistSubmit = document.querySelector(".js-tracklist-submit");
    const tagsLengthOutput = document.querySelector(".js-tags-length");
    const validationBox = document.querySelector(".js-validation");
    const validationBoxSuccess = document.querySelector(
      ".js-validation-success"
    );
    const validationBoxError = document.querySelector(".js-validation-error");
    const numberForm = document.querySelector(".js-number-form");
    const numberInput = document.querySelector(".js-number-input");
    // functions
    /**
     * Use localStorage to save data
     * @param {*} number
     */
    const saveData = (number) => {
      localStorage.setItem("xdNumber", number);
      console.log(`xdNumber ${number} is saved`);
    };

    /**
     * Use localStorage to get data
     * @return {string}
     */
    const getData = () => {
      return localStorage.getItem("xdNumber");
    };

    const addDynamicTags = (number) => {
      dynamicTags = [`liquidxd${number}`, `xd${number}`];
    };

    const copyToClipboard = (el) => {
      el.select();
      document.execCommand("copy");
    };

    const getTagsLength = (str) => {
      return str.split(",").length;
    };

    const validate = () => {
      const tags = tracklistOutput.value;
      const tagsNum = getTagsLength(tags);
      tagsLengthOutput.innerHTML = tagsNum;
      validationBox.classList.remove("is-hidden");
      validationBoxSuccess.classList.remove("is-hidden");
      validationBoxError.classList.remove("is-hidden");
      if (tagsNum <= MAX_TAGS_NUM) {
        validationBoxError.classList.add("is-hidden");
      } else {
        validationBoxSuccess.classList.add("is-hidden");
      }
    };

    const onChangeOutput = () => {
      const tags = tracklistOutput.value;
      if (tags.length > 1) {
        validate();
        tagsLengthOutput.innerHTML = getTagsLength(tags);
      }
    };

    const submitTracklist = () => {
      // Get tags string
      const tags = processData(tracklistInput.value);
      // Paste to the output textarea
      tracklistOutput.value = tags;
      // Validate
      validate();
      // Copy it the the clipboard
      copyToClipboard(tracklistOutput);
    };

    const onSubmitNumberForm = (e) => {
      const value = numberInput.value;
      e.preventDefault();
      saveData(value);
      addDynamicTags(value);
    };

    const setNumberFromStorage = () => {
      const number = getData();
      if (number) {
        numberInput.value = number;
        addDynamicTags(number);
      }
    };

    setNumberFromStorage();
    // events
    tracklistSubmit.addEventListener("click", submitTracklist, false);
    tracklistOutput.addEventListener("input", onChangeOutput, false);
    numberForm.addEventListener("submit", onSubmitNumberForm, false);
    numberInput.addEventListener("blur", onSubmitNumberForm, false);
  };

  const init = () => {
    clientInit();
  };

  return {
    init,
  };
})();

app.init();

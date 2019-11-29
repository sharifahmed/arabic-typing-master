var APP = (function($) {
  "use strict";

  var WHITESPACE = 32;
  var BACKSPACE = 8;
  var ENTER = 13;

  var init = function(options) {
    $(window).on("load", function() {
      $("#keyboardModal").modal("show");
      $("#userInput")
        .attr("unselectable", "on")
        .css("user-select", "none")
        .on("selectstart dragstart", false);

      registerServiceWorker();
    });

    var lesson = options.lesson;
    var totalWords = lesson.length;

    var wordCount = 0;
    var inputWordLen = 0;
    var index = 0;
    var noOfWordsMatched = 0;

    var timer = true;
    var start = 0;
    var stop = 0;

    var $lessonBlock = $("#lessonBlock");
    $.each(lesson, function(index, value) {
      var id = "word" + index;
      $("<label>", { id: id, text: value }).appendTo($lessonBlock);
    });

    $("#wordsMatched").html("Score: " + noOfWordsMatched + "/" + totalWords);
    $("#timer").html("Speed: 0 w/s");

    $("#userInput").keydown(function(e) {
      if (timer) {
        start = new Date().getTime();
        timer = false;
      }

      if (
        wordCount >= totalWords ||
        e.which < 32 ||
        (e.which > 32 && e.which < 48)
      ) {
        e.preventDefault();
        return false;
      } else if (e.which === WHITESPACE) {
        var wordId = "#word" + wordCount;
        var color = "red";

        var value = $("#userInput")
          .val()
          .substr(index, index + inputWordLen);

        if (value === lesson[wordCount]) {
          color = "green";
          noOfWordsMatched++;
        }

        $(wordId).css("border-bottom", "6px solid " + color);
        $(wordId).css("color", "#ccc");

        $("#wordsMatched").html(
          "Score: " + noOfWordsMatched + "/" + totalWords
        );

        index += inputWordLen + 1;
        inputWordLen = 0;
        wordCount++;

        if (wordCount >= totalWords) {
          stop = new Date().getTime();
          var diff = stop - start;
          var wordPerSecond = Math.round((noOfWordsMatched / diff) * 6000, 2);
          $("#timer").html("Speed: " + wordPerSecond + " w/s");
        }
      } else {
        inputWordLen++;
      }
    });

    $("#reset").click(function() {
      index = 0;
      wordCount = 0;
      inputWordLen = 0;
      noOfWordsMatched = 0;
      timer = true;

      $("#wordsMatched").html("Score: " + noOfWordsMatched + "/" + totalWords);
      $("#timer").html("Speed: 0 w/s");
      $("#userInput").val("");
      $("#lessonBlock label").css("border-bottom", "6px solid #ccc");
      $("#lessonBlock label").css("color", "black");
      $("#userInput").focus();
    });

    $("#keyboardModal").on("hide.bs.modal", function(e) {
      $("#userInput").focus();
    });
  };

  return {
    init: init
  };
})(jQuery);
window.addEventListener("load", function() {
  registerServiceWorker();
});
async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (e) {
      console.log(`SW registration failed`);
    }
  }
}

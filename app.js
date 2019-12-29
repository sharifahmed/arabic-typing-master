var APP = (function($) {
  "use strict";

  var WHITESPACE = 32;

  var init = function(options) {
    $(window).on("load", function() {
      $("#keyboardModal").modal("show");
      $("#userInput")
        .attr("unselectable", "on")
        .css("user-select", "none")
        .on("selectstart dragstart", false);
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

    var os = navigator.appVersion.includes('Mac') ? "mac" : "other";
    var keyboard = "arabic-keyboard-" + os + '.svg';
    $('#keyboardLayout').attr('src', '../' + keyboard);

    var $lessonBlock = $("#lessonBlock");
    $.each(lesson, function(index, value) {
      var id = "word" + index;
      $("<label>", { id: id, text: value }).appendTo($lessonBlock);
    });

    if (lesson.length != 0) {
      $("#word0").addClass("currentWord");
    }

    var lessonNumber = options.lessonNumber;
    var $buttonBlock = $("#buttonBlock");

    var $buttonLeft = $("<div>", { class: "col" });

    if (lessonNumber != 1) {
      var $prev = $("<a>", {
        href: "lesson" + (lessonNumber - 1) + ".html",
        class: "btn btn-light"
      }).append($("<img>", { src: "../prev.svg", title: "Prev Lesson" }));

      $prev.appendTo($buttonLeft);
    }

    var $reset = $("<button>", { id: "reset", class: "btn btn-light" }).append(
      $("<img>", { src: "../reset.svg", title: "Reset" })
    );
    $reset.appendTo($buttonLeft);

    var $showKeyboard = $("<button>", {
      id: "showKeyboard",
      class: "btn btn-light"
    })
      .attr("data-toggle", "modal")
      .attr("data-target", "#keyboardModal");

    var $keyboardImage = $("<img>", {
      src: "../keyboard.svg",
      title: "Show Keyboard"
    });

    $keyboardImage.appendTo($showKeyboard);

    $showKeyboard.appendTo($buttonLeft);

    $buttonLeft.appendTo($buttonBlock);

    if (!options.isFinalLesson) {
      var $next = $("<div>", { class: "col text-right" }).append(
        $("<a>", {
          class: "btn btn-light",
          href: "lesson" + (lessonNumber + 1) + ".html"
        }).append($("<img>", { src: "../next.svg", title: "Next Lesson" }))
      );

      $next.appendTo($buttonBlock);
    }

    $("#wordsMatched").html("Score: " + noOfWordsMatched + "/" + totalWords);
    $("#timer").html("Speed: 0 w/s");

    $("#userInput").keyup(function(e) {
      var spaceTriggered = $("#userInput")
        .val()
        .includes(" ");

      if (timer) {
        start = new Date().getTime();
        timer = false;
      }

      if (
        wordCount >= totalWords ||
        (e.which < 32 && e.which != BACKSPACE) ||
        (e.which > 32 && e.which < 37) ||
        (e.which > 40 && e.which < 48)
      ) {
        e.preventDefault();
        return false;
      } else if (e.which === WHITESPACE || spaceTriggered) {
        e.preventDefault();
        var wordId = "#word" + wordCount;
        var color = "red";

        var value = $("#userInput")
          .val()
          .trim();
        $("#userInput").val("");
        if (value === lesson[wordCount]) {
          color = "green";
          noOfWordsMatched++;
        }

        $(wordId).css("border-bottom", "6px solid " + color);
        $(wordId).css("color", "#ccc");

        $("#wordsMatched").html(
          "Score: " + noOfWordsMatched + "/" + totalWords
        );

        $(wordId).removeClass("currentWord");
        if (wordCount < totalWords) {
          $("#word" + (wordCount + 1)).addClass("currentWord");
        }
        index += inputWordLen + 1;
        inputWordLen = 0;
        wordCount++;

        if (wordCount >= totalWords) {
          stop = new Date().getTime();
          var diff = stop - start;
          var wordPerSecond = Math.round((noOfWordsMatched / diff) * 6000, 2);
          $("#timer").html("Speed: " + wordPerSecond + " w/s");
        }
      } else if (e.which === BACKSPACE) {
        if (inputWordLen != 0) {
          inputWordLen--;
        }
      } else {
        inputWordLen++;
      }
    });

    $("#reset").click(function() {
      $("#word" + wordCount).removeClass("currentWord");
      $("#word0").addClass("currentWord");
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

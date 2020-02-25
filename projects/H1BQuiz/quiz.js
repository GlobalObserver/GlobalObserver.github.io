let score = 0;
let clicks = 0;
let choices = ["a", "b", "c", "d"];
let answers = ["c", "b", "c", "b", "d", "c", "d", "a", "b", "b"];

function getScore() {
  return score;
}

function quizIsFinished() {
  return clicks === answers.length;
}

function answerIsCorrect(questionNumber, theirAnswer) {
  return answers[questionNumber-1] === theirAnswer;
}

function incrementClicks() {
  ++clicks;
}

function incrementScore() {
  ++score;
}

function setChoiceToAnswered(el) {
  el.className = el.className.replace("question-not-answered", "question-answered");
}

function setChoiceToCorrect(el) {
  el.className += " selected correct";
}

function setChoiceToIncorrect(el) {
  el.className += " selected incorrect";
}

function unselectOtherChoices(question, ans) {
  for (choice of choices) {
    if (choice !== ans) {
      let el = document.getElementById(`ans${question}${choice}`);
      el.removeEventListener("click", checkAnswer);
      setChoiceToAnswered(el);
      el.className += " not-selected question-answered";
      if (answerIsCorrect(question, choice)) {
        el.className += " correct question-answered";
      }
    }
  }
}

function displayQuestionAside(questionNumber) {
  document.getElementById(`aside${questionNumber}`).hidden = false;
}

function displayQuizResult() {
  let totalScore = getScore();
  let congratsContent = document.getElementById("congrats");

  if (totalScore < 3) {
    congratsContent.innerHTML = `You've got a lot of work to do but hey, practice makes perfect. Your score is ${score}/10.`;
  } else if (totalScore < 5) {
    congratsContent.innerHTML = `Not bad, but there's room to improve, read more of our articles to learn more about the H-1B. Your score is ${score}/10.`;
  } else if (totalScore < 7) {
    congratsContent.innerHTML = `We're pleasantly surprised, you're quite close to getting this right. Your score is ${score}/10.`;
  } else if (totalScore < 9) {
    congratsContent.innerHTML = `Looks like someone's been doing their homework. Your score is ${score}/10.`;
  } else if (totalScore < 10) {
    congratsContent.innerHTML = `Looks like we have an H-1B expert in the house. Your score is ${score}/10.`;
  } else {
    congratsContent.innerHTML = `Congratulations, you officially won the Internet!!! You score is ${score} out of 10 in this quiz.`;
  };

  document.getElementById("noti").hidden = false;
  document.getElementById("cookie").hidden = false;
}

let checkAnswer = function() {
  this.removeEventListener("click", checkAnswer);

  let len = this.id.length;
  let question = parseInt(this.id.substring(3, len-1));
  let ans = this.id.substring(len-1);

  setChoiceToAnswered(this);
  incrementClicks();

  if (answerIsCorrect(question, ans)) {
    incrementScore();
    setChoiceToCorrect(this);
  }
  else {
    setChoiceToIncorrect(this);
  }

  unselectOtherChoices(question, ans);
  displayQuestionAside(question);

  if (quizIsFinished()) {
    displayQuizResult();
  }
}

function setup() {
  document.querySelectorAll('.choice').forEach(choice => {
    choice.addEventListener("click", checkAnswer);
  });
}

setup();

'use strict';

$(document).ready(function () {

  //VARIABLES
  var quizz = {
    'quizzQuestions': [{
      'question': 'Que empresa criou o Sistema Operativo Android?',
      'answers': ['Google', 'Apple', 'Android Inc', 'Amazon'],
      'rightAnswer': 'Android Inc',
      'userAnswer': ""
    }, {
      'question': 'Quantos graus é necessário percorrer para ter um circulo completo',
      'answers': ['180º', '360º', '260º', '380º'],
      'rightAnswer': '360º',
      'userAnswer': ""
    }, {
      'question': 'Quais as cores da bandeira da Colombia?',
      'answers': ['Azul,Vermelho,Preto', 'Amarelo,Verde,Branco', 'Amarelo,Azul,Vermelho', 'Vermelho,Amarelo,Preto'],
      'rightAnswer': 'Amarelo,Azul,Vermelho',
      'userAnswer': ""
    }, {
      'question': 'Qual era o 1º Nome de Picasso?',
      'answers': ['Pablo', 'Diego', 'Jorge', 'Gustavo'],
      'rightAnswer': 'Pablo',
      'userAnswer': ""
    }, {
      'question': 'Quantas vezes o número 7 aparece entre os números 1 a 100?',
      'answers': ['22', '20', '19', '21'],
      'rightAnswer': '20',
      'userAnswer': ""
    }, {
      'question': 'Em Portugal, a que cidadãos foi retirado o direito de voto em 1913?',
      'answers': ['Mulheres', 'Analfabetos', 'Idosos', 'Emigrantes'],
      'rightAnswer': 'Analfabetos',
      'userAnswer': ""
    }, {
      'question': 'Qual foi a primeira moeda a ser usada em a Europa Ocidental?',
      'answers': ['Ecu', 'Euro', 'Dracma', 'Sestércio'],
      'rightAnswer': 'Sestércio',
      'userAnswer': ""
    }, {
      'question': 'De quem é a famosa frase "Penso, logo existo"?',
      'answers': ['Platão', 'Galileu Galilei', 'Descartes', 'Sócrates'],
      'rightAnswer': 'Descartes',
      'userAnswer': ""
    }, {
      'question': 'Qual o menor e o maior País do mundo?',
      'answers': ['Vaticano e Russia', 'Mónaco e China', 'Mónaco e Russia', 'San Marino e Índia'],
      'rightAnswer': 'Vaticano e Russia',
      'userAnswer': ""
    }, {
      'question': 'Qual o significado da palavra "Legend" em Português',
      'answers': ['Legenda', 'História', 'Conto', 'Lenda'],
      'rightAnswer': 'Lenda',
      'userAnswer': ""
    }]
  };
  var questions = quizz.quizzQuestions;
  var btnAnswer = $('.quizz__answers');
  var previousBtn = $('.quizz__previous');
  var nextBtn = $('.quizz__next');
  var resultsBtn = $('.quizz__btnresults');
  var results = $('.quizz__results');
  var contador = 0;
  var questNumbers = questions.length;

  //CHANGE NUMBER OF TOTAL QUESTIONS
  $('#totalQuestion').text(questNumbers);
  $('#currentQuestion').text(contador + 1);
  $('#resultsTotal').text(questNumbers);

  //DISABLE BUTTON OF NEXT ON FIRST question
  nextBtn.attr("disabled", true);
  resultsBtn.attr("disabled", true);

  // PREVIOUS BUTTON START HIDDEN
  previousBtn.addClass('quizz__transparent');
  previousBtn.attr("disabled", true);

  //FUNCTIONS
  var clickQuestion = function clickQuestion(element) {
    nextBtn.removeAttr("disabled");
    resultsBtn.removeAttr("disabled");

    var clickedAnwser = $(element.target);
    questions[contador].userAnswer = clickedAnwser.text();
    btnAnswer.removeClass('selected');
    clickedAnwser.addClass('selected');

    if (contador == questNumbers - 1) {
      resultsBtn.show();
    }
  };
  var changeQuestion = function changeQuestion(isNext) {
    nextBtn.attr("disabled", "disabled");
    resultsBtn.attr("disabled", true);
    btnAnswer.removeClass('selected');

    // INCREASE AND DECREASE COUNTER THAT MAKE GO TO ANOTHER INDEX OF ARRAY
    if (isNext) {
      contador++;
    } else {
      contador--;
    }

    onFirstQuestion(); // SHOW AND HIDE OF PREVIOUS BUTTON WHEN WE ARE ON FIRST question
    onLastQuestion(); // CHANGE THE LAST  question BUTTON

    $(".quizz__title").text(questions[contador].question); // CHANGE TITLE OF question
    $('#currentQuestion').text(contador + 1); // SHOW NUMBER OF CURRENT question

    // CHANGE ANSWERS
    for (var i = 0; i < questions[contador].answers.length; i++) {
      btnAnswer[i].innerHTML = questions[contador].answers[i];
    }
  };
  var onFirstQuestion = function onFirstQuestion() {
    if (contador == 0) {
      previousBtn.attr("disabled", true);
      previousBtn.addClass('quizz__transparent');
    } else {
      previousBtn.removeClass('quizz__transparent');
      previousBtn.removeAttr("disabled");
      previousBtn.show();
    }
  };
  var onLastQuestion = function onLastQuestion() {
    if (contador == questNumbers - 1) {
      nextBtn.addClass('quizz__transparent');
      nextBtn.off('click'); // desligar off dentro da funçao quando se chama o click
    } else {
      nextBtn.html('<i class="icon-arrow-right-c"></i>');
      nextBtn.removeClass('quizz__transparent');
      resultsBtn.hide();
      nextBtn.off().on('click', changeQuestion.bind(null, true));
    }
  };
  var getResults = function getResults() {
    var rightAnswers = 0;
    // IF RIGHT ANSWER MATCH WITH USER ANSWER
    for (var i = 0; i < questNumbers; i++) {
      if (questions[i].rightAnswer === questions[i].userAnswer) {
        rightAnswers++;
      }
    }
    return rightAnswers;
  };
  var showResults = function showResults() {
    $('.quizz__container').hide();
    results.show();
    $('#correctAnswers').text(getResults());
  };
  var detailResults = function detailResults() {
    displayResults();

    results.hide();
    $('.quizz__details').show();
  };
  var displayResults = function displayResults() {
    for (var i = 0; i < questNumbers; i++) {
      $('.quizz__list--quest').append('<li class="quizz__item"><p class="quizz__item--copy quizz__item--question">' + questions[i].question + '</p><p class="quizz__item--copy">' + questions[i].rightAnswer + '</p><p class="quizz__item--copy quizz__userAnswer">' + questions[i].userAnswer + '</p></li>');
      if (questions[i].rightAnswer != questions[i].userAnswer) {
        var userAns = $('.quizz__userAnswer')[i];
        $(userAns).css("color", "red");
      }
    }
  };

  //EVENTS
  resultsBtn.on('click', showResults);
  $('.js-detail').on('click', detailResults);
  btnAnswer.on('click', clickQuestion);
  nextBtn.on('click', changeQuestion.bind(null, true));
  previousBtn.on('click', changeQuestion.bind(null, false));
});
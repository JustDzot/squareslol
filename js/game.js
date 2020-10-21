const numDivs = 36;
const maxHits = 11;
const jsHits = $('.js-text');
var health = 3;
let hits = 1;
let hitsText = 0;
let firstHitTime = getTimestamp();

function round() {
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $('.target').text(hits);
  jsHits.text(hits - 1);
  if (hits === maxHits) {
    endGame();
  }
  
} 


function badGame(){
  $("#sad-message").removeClass("d-none");
  $('.game-field').addClass('d-none');
}

function endGame() {
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
  $('.game-field').addClass('d-none');
  jsHits.text('10');
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $('.js-text-misses').text(health);
    $('.target').text('')
    $('.target').removeClass("target")
    $(".miss").removeClass("miss");
    round();
  } else {
    $('.js-text-misses').text(health);
    $(".miss").removeClass("miss");
    $(event.target).addClass("miss");
    $('.target').text('');
    $('.target').removeClass("target")
    hits = hits - 1;
    health = health - 1;
    $('.js-text-misses').text(health);
    round();
  }
  if (health === 0){
    badGame();
  }
  }


  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();
  $('.js-text-misses').text(health);
  $('.row').removeClass('d-none');
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready();

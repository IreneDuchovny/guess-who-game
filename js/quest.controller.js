'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ans: 'yes'}, onUserResponse)
$('.btn-no').click({ans: 'no'}, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.btn-restart').click(onRestartGame)
$('.btn-teach').click(function(){
  $('.new-quest').show()
  $('.game-teach').hide()})

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
$('.game-start').hide()
  createQuestsTree()
  renderQuest()
  $('.quest').show()
}

function renderQuest() {
  $('.quest h2').text(getCurrQuest().txt)
}

function onUserResponse(ev) {
  console.log('ev', ev)
  var res = ev.data.ans
  // If this node has no children
  console.log('onUserResponse', getCurrQuest())
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.quest').hide()
      $('.game-end').show()
    } else {
      $('.game-teach').show()
      $('.quest').hide()
    }
  } else {
    moveToNextQuest(res)
    renderQuest()
    gLastRes= res
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame()
}

function onRestartGame() {

  $('.new-quest').hide()
  $('.game-start').show()
  $('.game-end').hide()
  gLastRes = null
}

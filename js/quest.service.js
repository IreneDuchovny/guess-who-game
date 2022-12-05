'use strict'
const STORAGE_KEY = 'questsDB'
var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  gQuestsTree= loadFromStorage(STORAGE_KEY)
  if (!gQuestsTree) {
  gQuestsTree = createQuest('Male?')
  gQuestsTree.yes = createQuest('Gandhi')
  gQuestsTree.no = createQuest('Rita')
  saveToStorage(STORAGE_KEY, gQuestsTree)
}
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  gPrevQuest=gCurrQuest
  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  gPrevQuest[lastRes]=createQuest(newQuestTxt)
  gPrevQuest[lastRes].yes=createQuest(newGuessTxt)
  gPrevQuest[lastRes].no=gCurrQuest
  saveToStorage(STORAGE_KEY, gQuestsTree)
}

function getCurrQuest() {
console.log('gCurrQuest',gCurrQuest )
  return gCurrQuest
}

/* GCompris - multiplication-tables.js
 *
 * Copyright (C) 2016 Varun Kumar <varun13169@iiitd.ac.in>
 *
 * Authors:
 *   Varun Kumar <varun13169@iiitd.ac.in>
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program; if not, see <http://www.gnu.org/licenses/>.
 */
.pragma library
.import QtQuick 2.0 as Quick

var currentLevel = 0
var numberOfLevel = 10
var items
var tableControl = 0

function start(items_) {
    items = items_
    currentLevel = 0
    initLevel()
}

function stop() {
}

function initLevel() {
    items.bar.level = currentLevel + 1
    items.multiplier = 1
    items.multiplicand = items.bar.level
    tableControl = 0

    for(var i=0; i<items.repeater.count; i++) {           // For initialization of Board
        items.repeater.itemAt(i).state="default"
    }

    for(i=0; i<items.gridTableRepeater.count; i++) {      // For initialization of table's board
        items.gridTableRepeater.itemAt(i).opacity = 0
    }
    items.gridTableRepeater.itemAt(0).opacity = 1
}

function nextLevel() {
    if(numberOfLevel <= ++currentLevel ) {
        currentLevel = 0
    }
    initLevel();
}

function previousLevel() {
    if(--currentLevel < 0) {
        currentLevel = numberOfLevel - 1
    }

    initLevel();
}



function makeOtherColInRowWhite() {
    for(var i=0; i<items.repeaterGridRow.count; i++) {
        if(i != items.rowSelected) {
            items.repeaterGridRow.itemAt(i).state="default"
        }
    }
}

function makeOtherRowInColWhite() {
    for(var i=0; i<items.repeaterGridCol.count; i++) {
        if(i != items.colSelected) {
            items.repeaterGridCol.itemAt(i).state="default"
        }
    }
}


function checkPlaceChangedSquares() {
    if(items.rowSelected==items.multiplicand && items.colSelected==items.multiplier) {
        items.answer=true
    }
    else if(items.rowSelected==items.multiplier && items.colSelected==items.multiplicand) {
        items.answer=true
    }
    else {
        items.answer=false
    }
}


function changesInMainBoard() {
    for(var i=0; i<items.repeater.count; i++) {
        if((i%10 <= items.rowSelected -1) && (i < (items.colSelected)*10)) {           // This colors the row on main board corresponding to rowSelect
            items.repeater.itemAt(i).color = "pink"
        }
        else {                                         // This colors every other row green
            items.repeater.itemAt(i).color = "green"
        }

        /*if(i>= (items.colSelected-1)*10 && i < items.colSelected*10 ) { // After all the above ^^ this colors the column
            items.repeater.itemAt(i).color = "pink"
        }*/
    }
}










/*
function colorAllBeforeIt() {
    for(var i=0; i<items.repeater.count; i++) {
        if(i%10 <= items.indexOfClicked%10 && i <= items.indexOfClicked) {
            items.repeater.itemAt(i).state="active"
        }
        else {
                items.repeater.itemAt(i).state="default"
        }
    }
}

function checkPlaceChangedSquares() {
    for(var i=0; i<items.repeater.count; i++) {
        if(items.repeater.itemAt(i).clickedFlag) {
            if( i%10 >= items.multiplier ) {
                items.answer = false
            }
            if( i >= items.multiplicand *10 ) {
                items.answer = false
            } // To check if red then not outside red area
              //console.log((i+1), "asdfgh", items.multiplicand, "asd", items.multiplier,"asdf",( i%10 >= items.multiplier ), "asdf", ( i >= items.multiplicand *10 ))
        }
        if(!(items.repeater.itemAt(i).clickedFlag)) {
            if( i%10 < items.multiplier && i < items.multiplicand *10 ) {
                items.answer = false
            }  // To check if green then not in red area
               //console.log((i+1), "asdfgh", items.multiplicand, "asd", ( i%10 < items.multiplier && i < items.multiplicand *10 ), "answere", items.answer)
        }

        if(!items.answer) {                        // For Complementry part as was suggested by allon
            items.answer = true
            for(var i=0; i<items.repeater.count; i++) {
                if(items.repeater.itemAt(i).clickedFlag) {
                    if( i%10 >= items.multiplicand ) {
                        items.answer = false
                    }
                    if( i >= items.multiplier *10 ) {
                        items.answer = false
                    } // To check if red then not outside red area
                      //console.log((i+1), "asdfgh", items.multiplicand, "asd", items.multiplier,"asdf",( i%10 >= items.multiplier ), "asdf", ( i >= items.multiplicand *10 ))
                }
                if(!(items.repeater.itemAt(i).clickedFlag)) {
                    if( i%10 < items.multiplicand && i < items.multiplier *10 ) {
                        items.answer = false
                    }  // To check if green then not in red area
                       //console.log((i+1), "asdfgh", items.multiplicand, "asd", ( i%10 < items.multiplier && i < items.multiplicand *10 ), "answere", items.answer)
                }
            }
        }
    }
}
*/

function checkit() {
    if(items.answer) {
        items.multiplier++
        if(items.multiplier == 11) {
            items.bonus.good("flower")
        }
        tableControl++
        items.gridTableRepeater.itemAt(tableControl).opacity = 1.0
        //items.repeaterGridRow.itemAt(tableControl).color = "white"
    }
    else {
        items.bonus.bad("flower")
        items.answer = true
    }
}

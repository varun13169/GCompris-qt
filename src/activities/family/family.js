/* GCompris - family.js
 *
 * Copyright (C) 2015 RAJDEEP KAUR <rajdeep51994@gmail.com>
 *
 * Authors:
 *   "RAJDEEP KAUR" <rajdeep51994@gmail.com> (Qt Quick port)
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
var numberOfLevel = 35
var items

var CirleContent = [  [ "man1.svg","girl1.svg","grandmother.svg"] ,
                      [ "grandpa.svg","girl2.svg","man1.svg" ],
                      [ "girl3.svg","man1.svg","man2.svg"],
                      [ "lady.svg","boy1.svg","lady1.svg"],
                      [ "lady.svg","boy1.svg","girl2.svg"],
                      [ "man1.svg","man2.svg","boy1.svg"],
                      [ "girl3.svg","man1.svg","man2.svg"],
                      [ "grandmother.svg","man1.svg","boy1.svg"],
                      [ "lady.svg","girl1.svg","grandpa.svg"] ,
                      [ "man1.svg","lady1.svg","grandmother.svg"],
                      [ "girl2.svg","man2.svg","grandpa.svg"],
                      [ "girl3.svg","man1.svg","girl2.svg"],
                      [ "man2.svg","girl3.svg","man1.svg"],
                      [ "man1.svg","boy1.svg","lady1.svg"],
                      [ "lady.svg","girl2.svg","man2.svg"],
                      [ "boy2.svg","man1.svg","lady.svg"],
                      [ "lady1.svg","man2.svg","girl2.svg"],
                      [ "Father","You","Mother"],
                      [ "Father","You","Father"],
                      [ "You","Son","Brother"],
                      [ "You","Daughter","Sister"],
                      [ "Father","You","Newphew"],
                      [ "Father","You","Niece"],
                      ["Father","You","Cousin"],
                      ["Mother","You","Cousin"],
                      ["Son","You","Son"],
                      ["Son","You","Daughter"],
                      ["Wife","You","Mother"],
                      ["husband","You","Father"],
                      ["Wife","You","Brother"],
                      ["Wife","You","Sister"],
                      ["Father","Second\nWife","You"],
                      ["Mother","Second\nHusband","You"],
                      ["Second\nWife","You","Son"],
                      ["Second\nWife","You","Daughter"]


] ;
var Options = [[ "Grand Mother","Grand Father","Father" ],
               [ "Grand Mother", "Mother", "Grand Father"],
               [ "Uncle","Aunty","father"],
               [ "Mother","Aunty","GrandMother"],
               [ "Brother","Sister","Cousin"],
               [ "Daughter","Son","Newphew"],
               [ "Newphew","Niece","Daughter"],
               [ "Grand Son", "Son","Son In Law"],
               [ "Grand Daughter","Daughter","Daughter In Law"],
               [ "Mother","Mother in law","Aunty"],
               [ "Father", "Father in Law", "Uncle" ],
               [ "Sister","Cousin","Sister in Law"],
               [ "Brother","Brother in law","Cousin"],
               [ "Mother","Aunty","Step-Mother"],
               [ "Father","Uncle","Step-Father"],
               [ "Son","Step-Son","Newphew"],
               [ "Step-Daughter","Niece","Daughter"],
               [ "Grand Mother","Grand Father","Father" ],
               [ "Grand Mother", "Mother", "Grand Father"],
               [ "Uncle","Aunty","father"],
               [ "Mother","Aunty","GrandMother"],
               [ "Brother","Sister","Cousin"],
               [ "Brother","Sister","Cousin"],
               [ "Daughter","Son","Newphew"],
               [ "Son","Niece","Daughter"],
               [ "Grand Son", "Son","Son In Law"],
               [ "Grand Daughter","Daughter","Daughter In Law"],
               [ "Mother","Mother in law","Aunty"],
               [ "Father", "Father in Law", "Uncle" ],
               [ "Brother","Brother in law","Cousin"],
               [ "Sister","Cousin","Sister in Law"],
               [ "Mother","Aunty","Step-Mother"],
               [ "Father","Uncle","Step-Father"],
               [ "Son","Step-Son","Newphew"],
               [ "Step-Daughter","Niece","Daughter"]
] ;


var answer = ["Grand Mother","Grand Father","Uncle","Aunty","Cousin","Newphew","Niece",
              "Grand Son","Grand Daughter","Mother in law","Father in Law","Sister in Law",
              "Brother in law","Step-Mother","Step-Father","Step-Son","Step-Daughter","Grand Mother",
              "Grand Father","Uncle","Aunty","Cousin","Cousin","Newphew","Niece","Grand Son","Grand Daughter",
              "Mother in law","Father in Law","Brother in law","Sister in Law","Step-Mother","Step-Father",
              "Step-Son", "Step-Daughter"
];

var caption = [ ["?","Father","Mother"],
                ["Father","?","Son"],
                ["Brother","Daughter","?"],
                ["Mother","?","Sister"],
                ["?","Mother","Niece"],
                ["Son","Brother","?"],
                ["Brother","?","Father"],
                ["Son","Son","?"],
                ["?","Mother","Father"],
                ["Mother","Husband","?"],
                ["Father","Wife","?"],
                ["?","Wife","Sister"],
                ["?","Husband","Brother"],
                [ "?","Father","Second Wife"],
                [ "?","Mother","Second Husband"],
                ["Second Wife","?","Mother"],
                ["Daughter","Second wife","?"],
                ["?","",""],
                ["?","",""],
                ["","","?"],
                ["","","?"],
                ["?","",""],
                ["?","",""],
                ["","","?"],
                ["","","?"],
                ["?","",""],
                ["?","",""],
                ["?","",""],
                ["?","",""],
                ["?","",""],
                ["?","",""],
                ["?","",""],
                ["?","",""],
                ["?","",""],
                ["?","",""]
        ]



function start(items_) {
    items = items_
    currentLevel = 0

    initLevel()
}

function stop() {
}

function initLevel() {
    items.bar.level = currentLevel + 1
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

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
.import "qrc:/gcompris/src/core/core.js" as Core

var currentLevel = 0
var numberOfLevel = 35
var flag
var items
var currentdata
var count = 0
/*
The first three elements of dataset is refer to the circle elements the next three elements refer to the
content of answer button and then 7th element refer to the correct answer then next three element refer to the how we are related to
other people, the contents that will be displayed next to bambo at last we will mention a flag that is either image or text
*/

var dataset = [  [ "man1.svg","girl1.svg","grandmother.svg",qsTr("Grand Mother"),qsTr("Grand Father"),qsTr("Father"),"Grand Mother",
                  qsTr("?"),qsTr("Father"),qsTr("Mother"),"image",3],

               [ "grandpa.svg","girl2.svg","man1.svg",qsTr("Grand Mother"),qsTr("Mother"), qsTr("Grand Father"),"Grand Father",
                qsTr("Father"),qsTr("?"),qsTr("Son"),"image",3],

               [ "girl3.svg","man1.svg","man2.svg",qsTr("Uncle"),qsTr("Aunty"),qsTr("father"),"Uncle",qsTr("Brother"),qsTr("Daughter"),qsTr("?"),
                "image",3],

               [ "lady.svg","boy1.svg","lady1.svg",qsTr("Mother"),qsTr("Aunty"),qsTr("GrandMother"),"Aunty",qsTr("Mother"),qsTr("?"),qsTr("Sister"),
                "image",3],

               [ "lady.svg","boy1.svg","girl2.svg",qsTr("Brother"),qsTr("Sister"),qsTr("Cousin"),"Cousin",qsTr("?"),qsTr("Mother"),qsTr("Niece"),
                "image",3],

               [ "man1.svg","man2.svg","boy1.svg",qsTr("Daughter"),qsTr("Son"),qsTr("Newphew"),"Newphew",qsTr("Son"),qsTr("Brother"),qsTr("?"),
                "image",3],

               [ "girl3.svg","man1.svg","man2.svg",qsTr("Newphew"),qsTr("Niece"),qsTr("Daughter"),"Niece",qsTr("Brother"),qsTr("?"),qsTr("Father"),
                "image",3],

               [ "grandmother.svg","man1.svg","boy1.svg",qsTr("Grand Son"),qsTr("Son"),qsTr("Son In Law"),"Grand Son",
                qsTr("Son"),qsTr("Son"),qsTr("?"),"image",3],

               [ "lady.svg","girl1.svg","grandpa.svg",qsTr("Grand Daughter"),qsTr("Daughter"),qsTr("Daughter In Law"),"Grand Daughter",
                qsTr("?"),qsTr("Mother"),qsTr("Father"),"image",3] ,

               [ "man1.svg","lady1.svg","grandmother.svg",qsTr("Mother"),qsTr("Mother in law"),qsTr("Aunty"),"Mother in law",
                qsTr("Mother"),qsTr("Husband"),qsTr("?"),"image",3],

               [ "girl2.svg","man2.svg","grandpa.svg",qsTr("Father"),qsTr("Father in Law"),qsTr("Uncle"),"Father in Law",
                qsTr("Father"),qsTr("Wife"),qsTr("?"),"image",3],

               [ "girl3.svg","man1.svg","girl2.svg",qsTr("Sister"),qsTr("Cousin"),qsTr("Sister in Law"),"Sister in Law",
                qsTr("?"),qsTr("Wife"),qsTr("Sister"),"image",3],

               [ "man2.svg","girl3.svg","man1.svg",qsTr("Brother"),qsTr("Brother in law"),qsTr("Cousin"),"Brother in law",
                qsTr("?"),qsTr("Husband"),qsTr("Brother"),"image",3],

               [ "man1.svg","boy1.svg","lady1.svg",qsTr("Mother"),qsTr("Aunty"),qsTr("Step-Mother"),"Step-Mother",
                qsTr("?"),qsTr("Father"),qsTr("Second Wife"),"image",3],

               [ "lady.svg","girl2.svg","man2.svg",qsTr("Father"),qsTr("Uncle"),qsTr("Step-Father"),"Step-Father",
                qsTr("?"),qsTr("Mother"),qsTr("Second Husband"),"image",3],

               [ "boy2.svg","man1.svg","lady.svg",qsTr("Son"),qsTr("Step-Son"),qsTr("Newphew"),"Step-Son",
               qsTr("Second Wife"),qsTr("?"),qsTr("Mother"),"image",3],

               [ "lady1.svg","man2.svg","girl2.svg",qsTr("Step-Daughter"),qsTr("Niece"),qsTr("Daughter"),"Step-Daughter",
                qsTr("Daughter"),qsTr("Second wife"),qsTr("?"),"image",3],

               [ qsTr("Father"),qsTr("You"),qsTr("Mother"),qsTr("Grand Mother"),qsTr("Grand Father"),qsTr("Father"),"Grand Mother",
                qsTr("?"),qsTr(""),qsTr(""),"text",3],

               [ qsTr("Father"),qsTr("You"),qsTr("Father"),qsTr("Grand Mother"),qsTr("Mother"),qsTr("Grand Father"),"Grand Father",
                qsTr("?"),qsTr(""),qsTr(""),"text",3],

               [qsTr("You"),qsTr("Son"),qsTr("Brother"),qsTr("Uncle"),qsTr("Aunty"),qsTr("father"),"Uncle",qsTr(""),qsTr(""),qsTr("?"),"text",3],

               [ qsTr("You"),qsTr("Daughter"),qsTr("Sister"),qsTr("Mother"),qsTr("Aunty"),qsTr("GrandMother"),"Aunty",qsTr(""),qsTr(""),qsTr("?"),
                "text",3],

               [ qsTr("Father"),qsTr("You"),qsTr("Newphew"),qsTr("Brother"),qsTr("Sister"),qsTr("Cousin"),"Cousin",qsTr("?"),qsTr(""),qsTr(""),
                "text",3],

               [ qsTr("Father"),qsTr("You"),qsTr("Niece"),qsTr("Brother"),qsTr("Sister"),qsTr("Cousin"),"Cousin",qsTr("?"),qsTr(""),qsTr(""),
                "text",3],

               [qsTr("Father"),qsTr("You"),qsTr("Cousin"),qsTr("Daughter"),qsTr("Son"),qsTr("Newphew"),"Newphew",qsTr(""),qsTr(""),qsTr("?"),
                "text",3],

               [qsTr("Mother"),qsTr("You"),qsTr("Cousin"),qsTr("Son"),qsTr("Niece"),qsTr("Daughter"),"Niece",qsTr(""),qsTr(""),qsTr("?"),
                "text",3],

               [qsTr("Son"),qsTr("You"),qsTr("Son"),qsTr("Grand Son"),qsTr("Son"),qsTr("Son In Law"),"Grand Son",qsTr("?"),qsTr(""),qsTr(""),"text",3],

               [qsTr("Son"),qsTr("You"),qsTr("Daughter"),qsTr("Grand Daughter"),qsTr("Daughter"),qsTr("Daughter In Law"),"Grand Daughter",
                qsTr("?"),qsTr(""),qsTr(""),"text",3],

               [qsTr("Wife"),qsTr("You"),qsTr("Mother"),qsTr("Mother"),qsTr("Mother in law"),qsTr("Aunty"),"Mother in law",
                qsTr("?"),qsTr(""),qsTr(""),"text",3],

               [qsTr("husband"),qsTr("You"),qsTr("Father"),qsTr("Father"),qsTr("Father in Law"),qsTr("Uncle"),"Father in Law",
                qsTr("?"),qsTr(""),qsTr(""),"text",3],

               [qsTr("Wife"),qsTr("You"),qsTr("Brother"),qsTr("Brother"),qsTr("Brother in law"),qsTr("Cousin"),"Brother in law",
                qsTr("?"),qsTr(""),qsTr(""),"text",3],

               [qsTr("Wife"),qsTr("You"),qsTr("Sister"),qsTr("Sister"),qsTr("Cousin"),qsTr("Sister in Law"),"Sister in Law",
                qsTr("?"),qsTr(""),qsTr(""),"text",3],

               [qsTr("Father"),qsTr("Second\nWife"),qsTr("You"),qsTr("Mother"),qsTr("Aunty"),qsTr("Step-Mother"),qsTr("Step-Mother"),
                qsTr("?"),qsTr(""),qsTr(""),"text",3],

               [qsTr("Mother"),qsTr("Second\nHusband"),qsTr("You"),qsTr("Father"),qsTr("Uncle"),qsTr("Step-Father"),"Step-Father",
                qsTr("?"),qsTr(""),qsTr(""),"text",3],

               [qsTr("Second\nWife"),qsTr("You"),qsTr("Son"),qsTr("Son"),qsTr("Step-Son"),qsTr("Newphew"),"Step-Son",qsTr("?"),qsTr(""),qsTr(""),"text",3],

               [qsTr("Second\nWife"),qsTr("You"),qsTr("Daughter"),qsTr("Step-Daughter"),qsTr("Niece"),qsTr("Daughter"),qsTr("Step-Daughter"),
                qsTr("?"),qsTr(""),qsTr(""),"text",3]
    ];

function start(items_) {
    items = items_
    currentLevel = 0

    initLevel()
}

function stop() {
}

function initLevel() {
    items.bar.level = currentLevel + 1
    dataset = Core.shuffle(dataset);
    currentdata = dataset[items.bar.level];
    items.imageOrtext = currentdata[10];
    count = currentdata[11];
    items.repeateanswerbutton.model = [currentdata[3],currentdata[4],currentdata[5]]
    if(currentdata[10] === "text") {
            items.pic1.source = "qrc:/gcompris/src/activities/family/resource/" + "text_background.svg"
            items.pic1.visible = false
            items.text1.text = currentdata[0]
            items.pic2.source = "qrc:/gcompris/src/activities/family/resource/" + "text_background.svg"
            items.pic2.visible = false
            items.text2.text = currentdata[1]
            items.pic3.source = "qrc:/gcompris/src/activities/family/resource/" + "text_background.svg"
            items.pic3.visible = false
            items.text3.text = currentdata[2]

    }  else {
        items.pic1.source = "qrc:/gcompris/src/activities/family/resource/" + currentdata[0]
        items.pic1.visible = true
        items.pic2.source = "qrc:/gcompris/src/activities/family/resource/" + currentdata[1]
        items.pic2.visible = true
        items.pic3.source = "qrc:/gcompris/src/activities/family/resource/" + currentdata[2]
        items.pic3.visible = true
    }
    items.answered = currentdata[6];
    items.caption1d = currentdata[7]; items.caption2d =currentdata[8]; items.caption3d = currentdata[9];
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

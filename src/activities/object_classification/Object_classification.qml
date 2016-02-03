/* GCompris - object_classification.qml
 *
 * Copyright (C) 2015 Ayush Agrawal <ayushagrawal288@gmail.com>
 *
 * Authors:
 *   Ayush Agrawal <ayushagrawal288@gmail.com>
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
import QtQuick 2.1
import QtGraphicalEffects 1.0
import GCompris 1.0

import "../../core"
import "object_classification.js" as Activity

ActivityBase {
    id: activity

//    property string backgroundImage:

    onStart: focus = true
    onStop: {}

    pageComponent: Image {
        id: background
        anchors.fill: parent
        source: "qrc:/gcompris/src/activities/bject_classification/resource/bg.svg"

        signal start
        signal stop

        Component.onCompleted: {
            activity.start.connect(start)
            activity.stop.connect(stop)
        }

        // Add here the QML items you need to access in javascript
        QtObject {
            id: items
            property Item main: activity.main
            property alias background: background
            property alias bar: bar
            property alias bonus: bonus
        }

        onStart: { Activity.start(items) }
        onStop: { Activity.stop() }


        GCText {
            id: questionItem
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.top: parent.top
            anchors.topMargin: 10
            fontSize: largeSize
            width: parent.width * 0.9
            horizontalAlignment: Text.AlignHCenter
            wrapMode: Text.WordWrap
            font.weight: Font.DemiBold
            style: Text.Outline
            styleColor: "black"
            color: "white"
            text: "Question Area"

//            function initQuestion() {
//                text = Activity.getCurrentTextQuestion()
//                if(Activity.getCurrentAudioQuestion()) {
//                    if(items.firstQuestion)
//                        items.audioOk = activity.audioVoices.append(Activity.getCurrentAudioQuestion())
//                    else
//                        items.audioOk = activity.audioVoices.play(Activity.getCurrentAudioQuestion())
//                    items.firstQuestion = false
//                }
//                opacity = 1.0
//            }

//            onOpacityChanged: opacity == 0 ? initQuestion() : ""
//            Behavior on opacity { PropertyAnimation { duration: 500 } }
        }

        DropShadow {
            anchors.fill: questionItem
            cached: false
            horizontalOffset: 3
            verticalOffset: 3
            radius: 8.0
            samples: 16
            color: "#80000000"
            source: questionItem
        }

        Item {
            width: 200; height: 200

            DropArea {
                x: 75; y: 75
                width: 50; height: 50

                Rectangle {
                    anchors.fill: parent
                    color: "green"

//                    visible: parent.containsDrag
                }
            }

            Rectangle {
                x: 10; y: 10
                width: 50; height: 50
                color: "red"

                Drag.active: dragArea.drag.active
                Drag.hotSpot.x: 10
                Drag.hotSpot.y: 10
//                Drag.drop()
                MouseArea {
                    id: dragArea
                    anchors.fill: parent

                    drag.target: parent
                }
            }
        }

        GCText {
            anchors.centerIn: parent
            text: "object_classification activity"
            fontSize: largeSize
        }

        DialogHelp {
            id: dialogHelp
            onClose: home()
        }

        Bar {
            id: bar
            content: BarEnumContent { value: help | home | level }
            onHelpClicked: {
                displayDialog(dialogHelp)
            }
            onPreviousLevelClicked: Activity.previousLevel()
            onNextLevelClicked: Activity.nextLevel()
            onHomeClicked: activity.home()
        }

        Bonus {
            id: bonus
            Component.onCompleted: win.connect(Activity.nextLevel)
        }
    }

}

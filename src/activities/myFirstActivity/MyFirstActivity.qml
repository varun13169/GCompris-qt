/* GCompris - myFirstActivity.qml
 *
 * Copyright (C) 2016 YOUR NAME <xx@yy.org>
 *
 * Authors:
 *   <THE GTK VERSION AUTHOR> (GTK+ version)
 *   YOUR NAME <YOUR EMAIL> (Qt Quick port)
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

import "../../core"
import "myFirstActivity.js" as Activity

ActivityBase {
    id: activity

    onStart: focus = true
    onStop: {}

    pageComponent: Rectangle {
        id: background
        anchors.fill: parent
        color: "#ABCDEF"
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

        onStart: {
            Activity.start(items)
            textbutt.forceActiveFocus()
        }
        onStop: { Activity.stop() }

        /*GCText {
            anchors.centerIn: parent
            text: "myFirstActivity activity"
            fontSize: largeSize
        }*/

        GCText {
            id: textbutt
            anchors.centerIn: parent

            fontSize: largeSize
            property int spacePresses: 0
            property int flag: 1
            text: "Press Space Bar to Start"

            focus: true
            Keys.onPressed: {
                if((event.key == Qt.Key_Space)&&(event.isAutoRepeat == 0)) {
                    increment();
                }
            }
            function increment() {
                if(flag == 1) {
                spacePresses = spacePresses +1;
                textbutt.text = "Your Score " + spacePresses;
                counter.running = true;
                }
            }
        }

        GCText {
            id: displayCounter
            x: parent.x + 20; y: parent.y + 20;
            property int ticks: 0
            text: ticks + " Seconds"

            function incrementTicks() {
                if(ticks < 5) {
                    ticks = ticks + 1;
                }
                else {
                    textbutt.flag = 0;
                    displayCounter.text = "done";
                }
            }
        }

        Timer {
            id: counter
            interval: 1000; repeat: true;
            onTriggered: displayCounter.incrementTicks();
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

/* GCompris - ActivityInfo.qml
*
* Copyright (C) 2015 shivanshbajaj <bajajshivansh1@gmail.com>
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, see <http://www.gnu.org/licenses/>.
*/
var depth=2;
var INVALID_MOVE=-1;
var scoreHouse=[];
var lastMove;
var nextPlayer;
var board=[];

for(var k=0;k<2;k++){
    scoreHouse[k]=0;
}

for(k=0;k<12;k++){
    board[k]=4;
}

function clone(obj) {
    if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
        return obj;
    var temp = obj.constructor();
    for(var key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            //obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            //delete obj['isActiveClone'];
        }
    }
    return temp;
}

function returnBoard(){
    return board;
}

function lastMove(){
    return lastMove;
}

function makeMove(i,player){
    if(!isValidMove(i,this))
        return false;
    nextPlayer=(player)?1:0;
   // console.log(nextPlayer,player,"player");
    makeMoveComplete(i,this);
    return true;
}

function makeMoveComplete(i,obj){
    console.log("in make move",i,obj.board);
    var otherPlayer=(obj.nextPlayer+1)%2;
    var j=i;
    while(obj.board[i]){
        j=(j+1)%12;
        if(i==j)
            j=(j+1)%12;
        obj.board[i]--;
        obj.board[j]++;
    }
    //now j is at last seed sowed
    var capture=[];
    for(k=0;k<6;k++)
        capture[k]=0;
    console.log("uncapture",obj.board,j,((otherPlayer*6)<=j) && (j<(otherPlayer*6+6)),(obj.board[j]==2 || obj.board[j]==3));
    if((obj.board[j]==2 || obj.board[j]==3) &&
      ((otherPlayer*6)<=j) && (j<(otherPlayer*6+6))){
        capture[j%6]=1;
        console.log("capture",capture,obj.board,j,i);
    }
    while(capture[j%6] && j%6){
        j--;
        if(obj.board[j]==2 || obj.board[j] == 3){
            console.log("capture");
            capture[j%6]=1;
        }
    }
    var allSeedCapture= true;
    for(j=otherPlayer*6;j<otherPlayer*6+6;j++){
        if(!capture[j%6] && board[j])
            allSeedCapture=false;
    }

    if(!allSeedCapture){
        for (j = otherPlayer*6; j < (otherPlayer*6 + 6); j++) {
            if (capture[j%6]) {
                obj.scoreHouse[nextPlayer]+=obj.board[j];
                console.log(capture,obj.scoreHouse);
                obj.board[j]=0;
            }
        }
    }
    var playerSideEmpty= true;
    for(j=obj.nextPlayer*6;j<(obj.nextPlayer*6+6);j++){
        if(obj.board[j]){
            playerSideEmpty= false;
            break;
        }
    }
    if(playerSideEmpty){
        var oppenentCanGiveSeeds=false;
        for(j=otherPlayer*6;j<(otherPlayer*6+6);j++){
            if(obj.board[j]>=(otherPlayer+1)%6-j){
                oppenentCanGiveSeeds=true;
                break;
            }
        }
        if (oppenentCanGiveSeeds) {
            for (j = otherPlayer*6; j < (otherPlayer*6 + 6); j++) {
                obj.scoreHouse[otherPlayer]+=obj.board[j];
                obj.board[j]=0;
            }
        }
    }
    obj.nextPlayer=otherPlayer;
    // console.log("player",nextPlayer,otherPlayer)
    obj.lastMove=i;
}

function makeAimove(){
    var heuristicValue;
    var move;
    console.log(nextPlayer);
    var out=newAlphaBetaPrune(depth,-200,200,this);
    move=out[0];
    heuristicValue=out[1];
    console.log("move",move,heuristicValue  );
    makeMoveComplete(move,this);
    return heuristicValue;
}

function isValidMove(i,obj){
    if ((obj.nextPlayer*6 > i) || (i >= (obj.nextPlayer*6 + 6))){
        // i not in range for current player.
        console.log("(nextPlayer*6 > i) || (i >= (nextPlayer*6 + 6))",(obj.nextPlayer*6 > i) || (i >= (obj.nextPlayer*6 + 6)),obj.nextPlayer,i)
        return false;
    }
    if (!obj.board[i]) {
        // no seeds to sow
        console.log("false",obj.board);
        return false;
    }
    var otherPlayer = (obj.nextPlayer+1) % 2;
    var sum = 0;
    for(var j = otherPlayer*6; j < (otherPlayer*6 + 6); j++){
        sum += obj.board[j];
    }
    if (sum == 0 && (obj.board[i] < (obj.nextPlayer+1)*6 - i)) {
        console.log((obj.board[i] < (obj.nextPlayer+1)*6 - i),sum);
        return false;
    }
    console.log("true",obj.board,sum);
    return true;
}

function scoringHouse(i,obj){
    if(i==0 || i==1)
        console.log(obj.scoreHouse)
        return obj.scoreHouse[i];
}

function isGameOver(obj){
    var i;
    for (i = 0; i < 12; i++) {
        if (obj.board[i])
            return false;
    }
    return true;
}

function newAlphaBetaPrune(depth,alpha,beta,Object){
    var heuristicValue;
    console.log("inn alphabetaprune",Object.nextPlayer,Object.board);
    if(depth==0 || isGameOver(Object)){

        heuristicValue=heuristicEvaluation(Object);
        //console.log("depth end",heuristicValue,Object.nextPlayer,depth);
        return [INVALID_MOVE,heuristicValue];
    }
    var childHeuristics;
    var bestMove;
    console.log("for start");
    for(var i=0;i<6;i++){
        var temp=clone(Object);
        if(Object.nextPlayer){
          //  console.log("in if",6+i,Object.nextPlayer,Object.board);
            if(!isValidMove(6+i,Object)){
            //    console.log("INVALID_MOVE",Object.nextPlayer,Object.board,6+i);
                 continue
            }
            //console.log("valid");
            temp.makeMoveComplete(6+i,temp);
            console.log("board",board,Object.board,temp.board);
            var
            out=newAlphaBetaPrune(depth-1,alpha,beta,temp);
            bestMove=out[0];
            childHeuristics=out[1];
            //console.log(bestMove,childHeuristics);
            //console.log("board",board,Object.board,temp.board,bestMove,childHeuristics,out);
            if(beta > childHeuristics){
                beta=childHeuristics;
                bestMove=temp.lastMove;
                //console.log(player,"played",bestMove);
            }
            if(alpha>=childHeuristics){
            //    console.log("break");
                break;
            }
        }
        else{
            console.log("in else",i,Object.nextPlayer,Object.board);
            if(!isValidMove(i,Object))
                continue
            temp.makeMoveComplete(i,temp);
            var out;
            out=newAlphaBetaPrune(depth-1,alpha,beta,temp);
            bestMove=out[0];
            childHeuristics=out[1];
            console.log("board",board,Object.board,temp.board,bestMove,childHeuristics,out);
            if(alpha < childHeuristics){
                alpha=childHeuristics;
                bestMove=temp.lastMove;
                //console.log("played else",bestMove);
            }
            if(beta<=childHeuristics){
            //    console.log("break",beta,childHeuristics);
                break;
            }
        }
    }
    heuristicValue=Object.nextPlayer ? beta : alpha;
    console.log("bestMove",bestMove,heuristicValue);
    return [bestMove,heuristicValue];
}

function alphaBetaPrune(depth,alpha,beta,heuristicValue,Object){
    console.log("next",alpha,beta,nextPlayer,depth,Object.board,board);
    if(depth==0 || isGameOver(Object)){
        //nextPlayer=(nextPlayer+1)%2;
        heuristicValue=heuristicEvaluation(Object);
        console.log("depth end",heuristicValue,Object.nextPlayer);
        return INVALID_MOVE,heuristicValue;
    }
    var childHeuristics;
    var bestMove;
    for(var move=0;move<12;move++){
    //  console.log(move,!isValidMove(move))
        //console.log("next0",nextPlayer);
//        if(!isValidMove(move,this))
//            continue;
        if(move==6){
            Object.nextPlayer=(Object.nextPlayer+1)%2;
        }
        var temp=clone(Object);
        //console.log("valid",nextPlayer,board,temp.nextPlayer,temp.board);
        makeMoveComplete(move,temp);
        var player=clone(Object.nextPlayer);
        if(move==6){
            player=(player+1)%2;
        }
        console.log(board,Object.board,temp.board);
        //console.log("valid",nextPlayer,board,temp.nextPlayer,temp.board);
        //console.log("next1",nextPlayer);
        //var out=alphaBetaPrune(depth-1,alpha,beta,childHeuristics,temp);
        //bestMove,childHeuristics=out[0],out[1];
        console.log("output",bestMove,childHeuristics);
        if(player){
            if(beta > childHeuristics){
                beta=childHeuristics;
                bestMove=temp.lastMove;
                console.log(player,"played",bestMove);
            }
            if(alpha>=childHeuristics){
                console.log("break");
                break;
            }
        }
        else{
            if(alpha < childHeuristics){
                alpha=childHeuristics;
                bestMove=temp.lastMove;
                console.log(player,"played else",bestMove);
            }
            if(beta<=childHeuristics){
                console.log("break");
                break;
            }
        }
         //board=clone(temp.board);
    }
    heuristicValue=Object.nextPlayer ? beta : alpha;
    console.log("bestMove",bestMove,heuristicValue);
    return [bestMove,heuristicValue];
}

function heuristicEvaluation(obj){
    var playerScore=[0,0];
    for(var i=0;i<2;i++){
        playerScore[i]=obj.scoreHouse[i];
        if(playerScore[i]>24){
            playerScore[i]+=100;
        }
    }
    return playerScore[1]-playerScore[0];
}

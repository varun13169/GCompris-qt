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
var depth=5;
var INVALID_MOVE=-1;
var scoreHouse=[];
var lastMove;
var nextPlayer;
var board=[];
var alpha,beta;
var heuristicValue;
for(var k=0;k<2;k++){
    scoreHouse[k]=0;
}

for(k=0;k<12;k++){
    board[k]=4;
}

function init(){
    for(var k=0;k<2;k++){
        this.scoreHouse[k]=0;
    }

    for(k=0;k<12;k++){
        this.board[k]=4;
    }
}

function clone(obj) {
    if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
        return obj;
    var temp = obj.constructor();
    for(var key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            temp[key] = clone(obj[key]);
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
    makeMoveComplete(i,this);
    return true;
}

function makeMoveComplete(i,obj){
    var otherPlayer=(obj.nextPlayer+1)%2;
    var j=i;
    while(obj.board[i]){
        j=(j+1)%12;
        if(i==j)
            j=(j+1)%12;
        obj.board[i]--;
        obj.board[j]++;
    }
    var capture=[];
    for(k=0;k<6;k++)
        capture[k]=0;
    if((obj.board[j]==2 || obj.board[j]==3) &&
      ((otherPlayer*6)<=j) && (j<(otherPlayer*6+6))){
        capture[j%6]=1;
    }
    while(capture[j%6] && j%6){
        j--;
        if(obj.board[j]==2 || obj.board[j] == 3){
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
    obj.lastMove=i;
}

function makeAimove(){

    var move;
    alpha=-200;
    beta=200;
    var out=newAlphaBetaPrune(depth,alpha,beta,this,heuristicValue);
    move=out[0];
    heuristicValue=out[1];
    makeMoveComplete(move,this);
    console.log("move",move)
    return heuristicValue;
}

function isValidMove(i,obj){
    if ((obj.nextPlayer*6 > i) || (i >= (obj.nextPlayer*6 + 6))){
         return false;
    }
    if (!obj.board[i]) {
        return false;
    }
    var otherPlayer = (obj.nextPlayer+1) % 2;
    var sum = 0;
    for(var j = otherPlayer*6; j < (otherPlayer*6 + 6); j++){
        sum += obj.board[j];
    }
    if (sum == 0 && (obj.board[i] < (obj.nextPlayer+1)*6 - i)) {
        return false;
    }
    return true;
}

function scoringHouse(i,obj){
    if(i==0 || i==1)
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

    console.log("in alpha beta prune",alpha,beta,Object.board);
    if(depth==0 || isGameOver(Object)){
        this.heuristicValue=heuristicEvaluation(Object);
        console.log("depth",this.heuristicValue,alpha,beta);
        return [INVALID_MOVE,this.heuristicValue];
    }
    var childHeuristics;
    var bestMove;
    for(var i=0;i<6;i++){
        var temp=clone(Object);
        if(Object.nextPlayer){
            if(!isValidMove(6+i,Object)){
                 continue
            }
            temp.makeMoveComplete(6+i,temp);
            console.log("cal function",depth,alpha,beta);
            var out=newAlphaBetaPrune(depth-1,alpha,beta,temp);
            console.log("cal function2",depth,alpha,beta);
            bestMove=out[0];
            childHeuristics=out[1];
            if(beta > childHeuristics && childHeuristics!=0){
                beta=childHeuristics;
                bestMove=temp.lastMove;
                console.log("beta changed",beta,bestMove);
            }
            if(alpha>=childHeuristics){
                console.log("break");
                break;
            }
        }
        else{
            if(!isValidMove(i,Object))
                continue
            temp.makeMoveComplete(i,temp);
            var out;
            out=newAlphaBetaPrune(depth-1,alpha,beta,temp);
            bestMove=out[0];
            childHeuristics=out[1];
            if(alpha < childHeuristics && childHeuristics!=0){
                  alpha=childHeuristics;
                bestMove=temp.lastMove;
                console.log("alpha changed",alpha,bestMove);
            }
            if(beta<=childHeuristics){
                break;
            }
        }
    }
    heuristicValue=Object.nextPlayer ? beta : alpha;
    console.log("best Move",bestMove,heuristicValue,alpha,beta);
    return [bestMove,this.heuristicValue];
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

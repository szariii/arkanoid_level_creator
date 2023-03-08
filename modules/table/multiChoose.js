"use strict"

import { data } from "../data/data.js"

export const multiChoose = {
    multiChoose: (event, tableOfDivs, startPositionX, startPositionY, tableTop, tableLeft, tableWidth, tableHeight) => {
        let stopPositionX = event.pageX
        let stopPositionY = event.pageY
        let divMultiChoose = document.getElementById("multiChoose")
        //divMultiChoose.style.display = "inline"


        if (startPositionX < stopPositionX) {
            if (stopPositionX > (tableLeft + tableWidth)) {
                divMultiChoose.style.left = startPositionX + "px"
                divMultiChoose.style.width = (stopPositionX - startPositionX - (stopPositionX - tableLeft - tableWidth)) - 4 + "px"
            } else {
                divMultiChoose.style.left = startPositionX + "px"
                divMultiChoose.style.width = (stopPositionX - startPositionX) - 4 + "px"
            }
        } else {
            if (stopPositionX < (tableLeft)) {
                divMultiChoose.style.left = (stopPositionX - (stopPositionX - tableLeft)) + "px"
                divMultiChoose.style.width = (startPositionX - (stopPositionX - (stopPositionX - tableLeft))) - 4 + "px"
            } else {
                divMultiChoose.style.left = stopPositionX + "px"
                divMultiChoose.style.width = (startPositionX - stopPositionX) - 4 + "px"
            }
        }

        if (startPositionY < stopPositionY) {
            if (stopPositionY > (tableTop + tableHeight)) {
                divMultiChoose.style.top = startPositionY + "px"
                divMultiChoose.style.height = (stopPositionY - startPositionY - (stopPositionY - tableTop - tableHeight)) - 4 + "px"
            } else {
                divMultiChoose.style.top = startPositionY + "px"
                divMultiChoose.style.height = (stopPositionY - startPositionY) - 4 + "px"
            }
        } else {
            if (stopPositionY < (tableTop)) {
                divMultiChoose.style.top = (stopPositionY - (stopPositionY - tableTop)) + "px"
                divMultiChoose.style.height = (startPositionY - (stopPositionY - (stopPositionY - tableTop))) - 4 + "px"
            } else {
                divMultiChoose.style.top = stopPositionY + "px"
                divMultiChoose.style.height = (startPositionY - stopPositionY) - 4 + "px"
            }
        }


        let leftDiv = ""
        let rightDiv = ""
        let flagChangeLeft = false
        let flagChangeRight = false
        for (let i = 0; i < tableOfDivs.length; i++) {
            if (tableOfDivs[i].getBoundingClientRect().top <= divMultiChoose.getBoundingClientRect().top && (tableOfDivs[i].getBoundingClientRect().top + tableOfDivs[i].getBoundingClientRect().height) >= divMultiChoose.getBoundingClientRect().top) {
                if (tableOfDivs[i].getBoundingClientRect().left <= divMultiChoose.getBoundingClientRect().left && (tableOfDivs[i].getBoundingClientRect().left + tableOfDivs[i].getBoundingClientRect().width) >= divMultiChoose.getBoundingClientRect().left) {
                    if (leftDiv != tableOfDivs[i]) {
                        leftDiv = tableOfDivs[i]
                        flagChangeLeft = true
                    }

                }
            }

            if (tableOfDivs[i].getBoundingClientRect().top <= (divMultiChoose.getBoundingClientRect().top + divMultiChoose.getBoundingClientRect().height) && (tableOfDivs[i].getBoundingClientRect().top + tableOfDivs[i].getBoundingClientRect().height) >= (divMultiChoose.getBoundingClientRect().top + divMultiChoose.getBoundingClientRect().height)) {
                if (tableOfDivs[i].getBoundingClientRect().left <= (divMultiChoose.getBoundingClientRect().left + divMultiChoose.getBoundingClientRect().width) && (tableOfDivs[i].getBoundingClientRect().left + tableOfDivs[i].getBoundingClientRect().width) >= (divMultiChoose.getBoundingClientRect().left + divMultiChoose.getBoundingClientRect().width)) {
                    if (rightDiv != tableOfDivs[i]) {
                        rightDiv = tableOfDivs[i]
                        flagChangeRight = true
                    }
                }
            }
        }
        return { "flagChangeLeft": flagChangeLeft, "flagChangeRight": flagChangeRight, "leftDiv": leftDiv, "rightDiv": rightDiv }
    },

    multiChooseArray: (choosenFields, leftDiv, rightDiv, tableOfDivs, ctrlClick) => {

        for (let i = 0; i < data.newArray.length; i++) {
            let chossneInThePast = data.choosenFields.includes(data.newArray[i])
            if (chossneInThePast == false) {
                data.newArray[i].style.border = ""
            }

        }

        data.newArray = []


        if (ctrlClick == false) {
            for (let i = 0; i < choosenFields.length; i++) {
                choosenFields[i].style.border = ""
            }
            choosenFields = []
        }


        let leftTable = leftDiv.id.split("_")
        let rightTable = rightDiv.id.split("_")

        for (let i = 0; i < tableOfDivs.length; i++) {
            let divPositionTable = tableOfDivs[i].id.split("_")
            if (parseInt(leftTable[0]) <= parseInt(divPositionTable[0]) && parseInt(rightTable[0]) >= parseInt(divPositionTable[0])) {
                if (parseInt(leftTable[1]) <= parseInt(divPositionTable[1]) && parseInt(rightTable[1]) >= parseInt(divPositionTable[1])) {
                    tableOfDivs[i].style.border = "2px solid orange"
                    data.newArray.push(tableOfDivs[i])
                }
            }
        }



        return choosenFields
    }


}
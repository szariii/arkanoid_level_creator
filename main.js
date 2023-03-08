"use strict"

import { tabka } from "./modules/table/table.js"
import { chose } from "./modules/chose/chose.js"
import { operationsOnTable } from "./modules/table/operationsOnTable.js"
import { multiChoose } from "./modules/table/multiChoose.js"
import { contextMenu } from "./modules/table/contextMenu.js"
import { data } from "./modules/data/data.js"




export const game = {
    ///start///
    start: () => {
        let coloredDivs = chose.chose()
        let tableOfDivs = tabka.createTable()
        game.click(tableOfDivs, coloredDivs)
    },
    /////Operacje na polach////
    click: (tableOfDivs, coloredDivs) => {
        document.onkeydown = function (event) {
            operationsOnTable.clickCtrl(event)

        }

        ///////ctrl kliked - sprawdz to

        document.getElementById("table").addEventListener("click", function (event) {
            if (event.ctrlKey == false && event.metaKey == false) {
                data.choosenFields = operationsOnTable.singleAdd(event.path[0], data.choosenFields, tableOfDivs)
            } else {
                operationsOnTable.ctrlWithClick(event.path[0])
            }

            chose.putColors(coloredDivs, data.choosenFields)
        })

        document.getElementById("table").addEventListener("mousedown", function (event) {
            let div = document.createElement("div")
            div.style.position = 'absolute'
            div.style.border = "2px solid yellow"
            div.style.backgroundColor = "rgb(255,255,0,0.5)"
            div.id = "multiChoose"

            let startPositionX = event.pageX
            let startPositionY = event.pageY


            let tableTop = document.getElementById("table").getBoundingClientRect().top
            let tableLeft = document.getElementById("table").getBoundingClientRect().left
            let tableWidth = document.getElementById('table').getBoundingClientRect().width
            let tableHeight = document.getElementById("table").getBoundingClientRect().height
            document.body.appendChild(div)
            document.onmousemove = function (event) {
                event.preventDefault()
                let ctrlClick = false
                if (event.ctrlKey == true || event.metaKey == true) {
                    ctrlClick = true
                }
                //if()
                let multiChooseData = multiChoose.multiChoose(event, tableOfDivs, startPositionX, startPositionY, tableTop, tableLeft, tableWidth, tableHeight)
                if (multiChooseData.flagChangeLeft == true || multiChooseData.flagChangeRight == true) {
                    data.choosenFields = multiChoose.multiChooseArray(data.choosenFields, multiChooseData.leftDiv, multiChooseData.rightDiv, tableOfDivs, ctrlClick)
                }
            }

            document.onmouseup = function () {

                let idDelteDiv = []

                for (let i = 0; i < data.newArray.length; i++) {
                    let exist = data.choosenFields.includes(data.newArray[i])
                    if (exist == true) {
                        idDelteDiv.unshift(i)
                    }

                }

                for (let i = 0; i < idDelteDiv.length; i++) {
                    data.newArray.splice(idDelteDiv[i], 1)
                }

                for (let i = 0; i < data.newArray.length; i++) {
                    data.choosenFields.push(data.newArray[i])
                }


                data.newArray = []
                document.getElementById("multiChoose").remove()
                document.onmousemove = function () { }
                chose.putColors(coloredDivs, data.choosenFields)
                document.onmouseup = function () { }
            }


        })



        document.getElementById("table").oncontextmenu = function (event) {
            event.preventDefault()
            contextMenu.showMenu(event, data.choosenFields)
        }


    },


}

game.start()


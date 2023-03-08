"use strict"

import { contextMenu } from "../table/contextMenu.js"
import { data } from "../data/data.js"


export const chose = {
    chose: () => {
        let image = new Image()
        let coloredDivs = []
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                if (i == 3) {
                    let div = document.createElement("div")
                    let canvas = document.createElement("canvas")
                    canvas.style.width = "35px"
                    canvas.style.height = "15px"
                    image.src = "./img/arkanoid.png"
                    div.id = "color:" + i + "_" + j
                    //div.style.background = "url(" + canvas.toDataURL() + ")"
                    div.appendChild(canvas)
                    coloredDivs.push(div)
                    document.getElementById("chose").appendChild(div)
                } else {
                    let div = document.createElement("div")
                    let canvas = document.createElement("canvas")
                    canvas.style.width = "35px"
                    canvas.style.height = "15px"
                    image.src = "./img/arkanoid.png"
                    image.addEventListener('load', function () {
                        canvas.getContext('2d').drawImage(image, 5 + (j * 10), 216 + (i * 5), 7, 3, 0, 0, 35, 15)
                        div.style.background = "url('" + canvas.toDataURL() + "')"
                    }, false);


                    div.id = "color:" + i + "_" + j

                    //div.appendChild(canvas)
                    coloredDivs.push(div)
                    document.getElementById("chose").appendChild(div)

                }


            }
        }

        return coloredDivs
    },

    putColors: (coloredDivs, choosenFields) => {

        for (let i = 0; i < coloredDivs.length; i++) {
            coloredDivs[i].onclick = function () {
                contextMenu.saveToUndoHistory()
                data.historyRedo = []
                for (let j = 0; j < choosenFields.length; j++) {
                    choosenFields[j].style.background = coloredDivs[i].style.background
                    choosenFields[j].style.border = ""
                }

                data.choosenFields = []
            }
        }

        data.saveToFile = []
        for (let j = 0; j < 30; j++) {
            data.saveToFile.push([])
            for (let i = 0; i < 15; i++) {
                data.saveToFile[j].push([])
            }
        }
        for (let i = 0; i < data.tableOfDivs.length; i++) {
            let divsId = data.tableOfDivs[i].id.split("_")
            data.saveToFile[parseInt(divsId[0])][divsId[1]] = data.tableOfDivs[i].style.background
        }



    }

}
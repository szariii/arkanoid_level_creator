"use strict"

import { data } from "../data/data.js"

export const contextMenu = {

    shortcut: (event) => {
        if ((event.ctrlKey == true || event.metaKey == true) && event.key == "z") {
            contextMenu.undo(data.choosenFields)
        } else if ((event.ctrlKey == true || event.metaKey == true) && event.key == "y") {
            contextMenu.redo(data.choosenFields)
        } else if ((event.ctrlKey == true || event.metaKey == true) && event.key == "x") {
            contextMenu.cut(data.choosenFields)
        } else if ((event.ctrlKey == true || event.metaKey == true) && event.key == "c") {
            contextMenu.copy(data.choosenFields)
        } else if ((event.ctrlKey == true || event.metaKey == true) && event.key == "v") {

            let minx = 15
            let miny = 30

            let maxx = 0
            let maxy = 0
            for (let i = 0; i < data.copyArray.length; i++) {
                let idArray = data.copyArray[i][0].id.split("_")

                if (parseInt(idArray[0]) < miny) {
                    miny = parseInt(idArray[0])
                }

                if (parseInt(idArray[1]) < minx) {
                    minx = parseInt(idArray[1])
                }

                if (parseInt(idArray[0]) > maxy) {
                    maxy = parseInt(idArray[0])
                }

                if (parseInt(idArray[1]) > maxx) {
                    maxx = parseInt(idArray[1])
                }
            }
            let element = ""
            for (let i = 0; i < data.tableOfDivs.length; i++) {
                if (data.tableOfDivs[i].matches(':hover')) {
                    element = data.tableOfDivs[i]
                }
            }

            let div = document.createElement("div")
            div.style.position = "absolute"
            div.id = "view"

            let positionPrimaryDiv = element.id.split("_")

            for (let j = 0; j < data.copyArray.length; j++) {
                let positionOfDiv = data.copyArray[j][0].id.split("_")
                if (((parseInt(positionOfDiv[0]) - miny) + parseInt(positionPrimaryDiv[0])) < 30) {
                    if (((parseInt(positionOfDiv[1]) - minx) + parseInt(positionPrimaryDiv[1])) < 15) {
                        let singleDiv = document.createElement("div")
                        singleDiv.style.top = ((element.getBoundingClientRect().top - 20) + ((parseInt(positionOfDiv[0]) - miny) * 19)) + "px"
                        singleDiv.style.left = ((element.getBoundingClientRect().left - 20) + ((parseInt(positionOfDiv[1]) - minx) * 39)) + "px"
                        singleDiv.style.width = "35px"
                        singleDiv.style.height = "15px"
                        singleDiv.style.position = "absolute"
                        singleDiv.style.background = data.copyArray[j][1]
                        singleDiv.style.zIndex = j
                        //singleDiv.style.zIndex = j
                        if (data.copyArray[j][1] == "") {
                            singleDiv.style.backgroundColor = "#000000"
                        }
                        singleDiv.style.border = "2px solid green"

                        singleDiv.onmouseout = function (event) {
                            document.getElementById("view").remove()
                        }


                        div.appendChild(singleDiv)
                    }
                }
            }


            document.body.appendChild(div)

            document.onclick = function () {
                contextMenu.saveToUndoHistory()
                data.historyRedo = []
                let firstDivId = element.id.split("_")
                for (let i = 0; i < data.copyArray.length; i++) {
                    let divId = data.copyArray[i][0].id.split("_")
                    let div = document.getElementById((parseInt(firstDivId[0]) + parseInt(divId[0]) - miny) + "_" + (parseInt(firstDivId[1]) + parseInt(divId[1]) - minx))

                    if (div != null) {
                        div.style.background = data.copyArray[i][1]
                    }

                }

                document.getElementById("view").remove()

                for (let i = 0; data.tableOfDivs.length; i++) {
                    data.tableOfDivs[i].onmouseover = function () { }
                    document.onclick = function () { }
                }
            }




            contextMenu.paste(data.choosenFields)
        } else if ((event.ctrlKey == true || event.metaKey == true) && event.key == "s") {
            contextMenu.saveToFile(data.choosenFields)
        } else if ((event.ctrlKey == true || event.metaKey == true) && event.key == "l") {
            contextMenu.loadDataFromFile(data.choosenFields)
        } else if (event.key == "Delete") {
            contextMenu.delete(data.choosenFields)
        }
    },



    saveToUndoHistory: () => {
        let arrayOfColors = []
        for (let j = 0; j < 30; j++) {
            arrayOfColors.push([])
        }
        for (let i = 0; i < data.tableOfDivs.length; i++) {
            let divsId = data.tableOfDivs[i].id.split("_")
            arrayOfColors[parseInt(divsId[0])][divsId[1]] = data.tableOfDivs[i].style.background
        }
        data.historyUndo.push(arrayOfColors)
    },

    saveToRedoHistroy: () => {
        let arrayOfColors = []
        for (let j = 0; j < 30; j++) {
            arrayOfColors.push([])
        }
        for (let i = 0; i < data.tableOfDivs.length; i++) {
            let divsId = data.tableOfDivs[i].id.split("_")
            arrayOfColors[parseInt(divsId[0])][divsId[1]] = data.tableOfDivs[i].style.background
        }
        data.historyRedo.push(arrayOfColors)
    },


    showMenu: (event, choosenFields) => {
        let div = document.createElement("div")
        div.id = "contextMenu"
        div.style.display = "flex"
        div.style.flexDirection = "column"
        div.style.position = "absolute"
        div.style.left = event.clientX + "px"
        div.style.top = event.clientY + "px"
        div.style.backgroundColor = "#FFFFFF"
        div.style.border = "2px solid white"
        let textArray = ["Undo", "Redo", "Cut", "Copy", "Paste", "Delete", "Save to file", "Load data from file"]
        let keybordShortArray = ["Ctrl+Z", "Ctrl+Y", "Ctrl+X", "Ctrl+C", "Ctrl+V", "Del", "Ctrl+S", "Ctrl+L"]
        let functionArray = [contextMenu.undo, contextMenu.redo, contextMenu.cut, contextMenu.copy, contextMenu.paste, contextMenu.delete, contextMenu.saveToFile, contextMenu.loadDataFromFile]


        for (let i = 0; i < 8; i++) {
            let divRow = document.createElement("div")
            divRow.style.display = "flex"
            divRow.style.borderBottom = "2px dotted black"
            divRow.style.flexDirection = "row"
            divRow.style.justifyContent = "space-between"
            divRow.onclick = function () {
                let fun = functionArray[i]
                fun(choosenFields)
            }
            let divLeft = document.createElement("div")
            divLeft.innerText = textArray[i]
            divRow.appendChild(divLeft)

            let divRight = document.createElement("div")
            divRight.style.marginLeft = "10px"
            divRight.innerText = keybordShortArray[i]
            divRow.appendChild(divRight)
            div.appendChild(divRow)
        }

        document.body.appendChild(div)
        document.onclick = function () {
            document.getElementById("contextMenu").remove()
            document.onclick = function () {
            }

            document.getElementById("table").oncontextmenu = function (event) {
                event.preventDefault()
                contextMenu.showMenu(event, data.choosenFields)
            }
        }

        document.getElementById("table").oncontextmenu = function (event) {
            event.preventDefault()
            contextMenu.showMenu(event, data.choosenFields)
            document.getElementById("contextMenu").remove()
        }
    },

    undo: (choosenFields) => {

        let history = data.historyUndo.pop()
        if (history != undefined) {


            contextMenu.saveToRedoHistroy()
            //data.historyRedo.unshift(history)
            for (let i = 0; i < data.tableOfDivs.length; i++) {
                let idDiv = data.tableOfDivs[i].id.split("_")
                data.tableOfDivs[i].style.background = history[idDiv[0]][idDiv[1]]
            }
        }

        //data.historyRedo = []
        //contextMenu.saveToRedoHistroy()
    },

    redo: (choosenFields) => {
        let future = data.historyRedo.pop()
        if (future != undefined) {
            contextMenu.saveToUndoHistory()

            for (let i = 0; i < data.tableOfDivs.length; i++) {
                let idDiv = data.tableOfDivs[i].id.split("_")
                data.tableOfDivs[i].style.background = future[idDiv[0]][idDiv[1]]
            }
        }
    },

    cut: (choosenFields) => {
        data.copyArray = []
        contextMenu.saveToUndoHistory()
        data.historyRedo = []
        for (let i = 0; i < choosenFields.length; i++) {
            data.copyArray.push([choosenFields[i], choosenFields[i].style.background])
            choosenFields[i].style.border = "2px solid white"
            choosenFields[i].style.background = ""
        }
    },

    copy: (choosenFields) => {
        data.copyArray = []
        for (let i = 0; i < choosenFields.length; i++) {
            data.copyArray.push([choosenFields[i], choosenFields[i].style.background])
        }
    },

    paste: (choosenFields) => {

        let minx = 15
        let miny = 30

        let maxx = 0
        let maxy = 0
        for (let i = 0; i < data.copyArray.length; i++) {
            let idArray = data.copyArray[i][0].id.split("_")

            if (parseInt(idArray[0]) < miny) {
                miny = parseInt(idArray[0])
            }

            if (parseInt(idArray[1]) < minx) {
                minx = parseInt(idArray[1])
            }

            if (parseInt(idArray[0]) > maxy) {
                maxy = parseInt(idArray[0])
            }

            if (parseInt(idArray[1]) > maxx) {
                maxx = parseInt(idArray[1])
            }
        }


        for (let i = 0; i < data.tableOfDivs.length; i++) {
            data.tableOfDivs[i].onmouseover = function () {
                let div = document.createElement("div")
                div.style.position = "absolute"
                div.id = "view"

                let positionPrimaryDiv = data.tableOfDivs[i].id.split("_")

                for (let j = 0; j < data.copyArray.length; j++) {
                    let positionOfDiv = data.copyArray[j][0].id.split("_")
                    if (((parseInt(positionOfDiv[0]) - miny) + parseInt(positionPrimaryDiv[0])) < 30) {
                        if (((parseInt(positionOfDiv[1]) - minx) + parseInt(positionPrimaryDiv[1])) < 15) {



                            let singleDiv = document.createElement("div")
                            singleDiv.style.top = ((data.tableOfDivs[i].getBoundingClientRect().top - 20) + ((parseInt(positionOfDiv[0]) - miny) * 19)) + "px"
                            singleDiv.style.left = ((data.tableOfDivs[i].getBoundingClientRect().left - 20) + ((parseInt(positionOfDiv[1]) - minx) * 39)) + "px"
                            singleDiv.style.width = "35px"
                            singleDiv.style.height = "15px"
                            singleDiv.style.position = "absolute"
                            singleDiv.style.background = data.copyArray[j][1]
                            singleDiv.style.zIndex = j
                            //singleDiv.style.zIndex = j
                            if (data.copyArray[j][1] == "") {
                                singleDiv.style.backgroundColor = "#000000"
                            }
                            singleDiv.style.border = "2px solid green"

                            singleDiv.onmouseout = function (event) {
                                document.getElementById("view").remove()
                            }


                            div.appendChild(singleDiv)
                        }
                    }



                }




                //let int = setInterval(function () { }, 1000)

                document.body.appendChild(div)

                document.onclick = function () {
                    contextMenu.saveToUndoHistory()
                    data.historyRedo = []
                    let firstDivId = data.tableOfDivs[i].id.split("_")
                    for (let i = 0; i < data.copyArray.length; i++) {
                        let divId = data.copyArray[i][0].id.split("_")
                        let div = document.getElementById((parseInt(firstDivId[0]) + parseInt(divId[0]) - miny) + "_" + (parseInt(firstDivId[1]) + parseInt(divId[1]) - minx))
                        if (div != null) {
                            div.style.background = data.copyArray[i][1]
                        }

                    }

                    document.getElementById("view").remove()

                    for (let i = 0; data.tableOfDivs.length; i++) {
                        data.tableOfDivs[i].onmouseover = function () { }
                        document.onclick = function () { }
                    }
                }



            }


        }
        //document.getElementById("table").onmousemove

        // let arrayChoosenFields = []

        // for (let i = 0; i < choosenFields.length; i++) {
        //     idArray = choosenFields[i].id
        //     if (idArray[0] >= miny && idArray[0] <= maxy) {
        //         if (idArray[1] >= minx && idArray[1] <= maxx) {
        //             arrayChoosenFields.push(choosenFields)
        //         }
        //     }
        // }
    },

    delete: (choosenFields) => {
        for (let i = 0; i < choosenFields.length; i++) {
            choosenFields[i].style.border = "2px solid white"
            choosenFields[i].style.background = ""
        }
    },

    saveToFile: (choosenFields) => {


        // JSON
        let data1 = data.saveToFile;
        data1 = JSON.stringify(data1);
        const type = "application/json";
        const filename = "data.json";

        // TXT
        //const data = "Maciej w wieku 18 lat";
        //const type = "text/plain";
        //const filename = "data.txt";

        //save = (data, filename, type) => {
        const blob = new Blob([data1], { type: type });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.id = "save"
        link.style.display = "none"

        document.body.appendChild(link);

        document.getElementById("save").click()

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 0)
        //}
    },

    loadDataFromFile: (choosenFields) => {


        document.getElementById("load").addEventListener("change", (event) => {
            contextMenu.saveToUndoHistory()
            data.historyRedo = []
            const fileList = event.target.files

            let file = fileList[0];




            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = function () {
                let jsonFile = JSON.parse(reader.result)

                //data.historyRedo = []
                for (let i = 0; i < data.tableOfDivs.length; i++) {
                    let idDiv = data.tableOfDivs[i].id.split("_")
                    data.tableOfDivs[i].style.background = jsonFile[idDiv[0]][idDiv[1]]
                }
            }
        })
        document.getElementById("load").click()

    },
}
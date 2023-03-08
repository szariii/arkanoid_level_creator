import { data } from "../data/data.js"
import { contextMenu } from "../table/contextMenu.js"


export const operationsOnTable = {

    clickCtrl: (event) => {
        if (event.key == "Delete") {
            contextMenu.delete(data.choosenFields)
        }


        if (event.key == "Control" || event.key == "Meta") {
            if (data.flagaCtrl == false) {
                data.flagaCtrl = true
            } else {
                data.flagaCtrl = false
            }
            //true - Ctrl jest na dodawanie
            //false - Ctrl jest na usuwanie

            document.onkeydown = function (event) {
                contextMenu.shortcut(event)
            }
            document.onkeyup = function (event) {
                if (event.key == "Control") {
                    document.onkeydown = function (event) {
                        operationsOnTable.clickCtrl(event)
                    }
                }
            }
        }
    },

    checkIfFieldExist: (field, tableOfDivs) => {
        let existFlag = false
        for (let j = 0; j < tableOfDivs.length; j++) {
            if (tableOfDivs[j] == field) {
                existFlag = true
            }
        }
        if (existFlag == true) {
            return true
        } else {
            return false
        }
    },

    singleAdd: (field, choosenFields, tableOfDivs) => {

        let existFlag = operationsOnTable.checkIfFieldExist(field, tableOfDivs)
        if (existFlag == true) {
            for (let i = 0; i < choosenFields.length; i++) {
                choosenFields[i].style.border = ""
            }
            choosenFields = []
            choosenFields.push(field)
            field.style.border = "2px solid orange"
            return choosenFields
        } else {
            return choosenFields
        }



    },

    manyAdd: (field, choosenFields, tableOfDivs) => {
        let existFlag = operationsOnTable.checkIfFieldExist(field, tableOfDivs)
        if (existFlag == true) {
            let repeatFlag = operationsOnTable.checkIfFieldExist(field, choosenFields)

            if (repeatFlag == false) {
                choosenFields.push(field)
                field.style.border = "2px solid orange"
            }

            return choosenFields

        } else {
            return choosenFields
        }
    },

    singleRemove: (field, choosenFields) => {
        let deleteIndex = -1
        for (let i = 0; i < choosenFields.length; i++) {
            if (choosenFields[i] == field) {
                deleteIndex = i
            }
        }

        if (deleteIndex != -1) {
            choosenFields[deleteIndex].style.border = ""
            choosenFields.splice(deleteIndex, 1)
        }

        return choosenFields
    },

    ctrlWithClick: (field) => {


        if (field.style.border == "2px solid orange") {
            operationsOnTable.singleRemove(field, data.choosenFields)
        } else {
            operationsOnTable.manyAdd(field, data.choosenFields, data.tableOfDivs)
        }
        //if()
    }
}
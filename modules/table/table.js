"use strict"

import { data } from "../data/data.js"

export const tabka = {
    width: 15,
    height: 30,

    createTable: () => {
        let tableOfDivs = []
        for (let i = 0; i < tabka.height; i++) {
            for (let j = 0; j < tabka.width; j++) {
                let div = document.createElement("div")
                div.id = i + "_" + j
                tableOfDivs.push(div)
                document.getElementById("table").appendChild(div)
            }
        }

        data.tableOfDivs = tableOfDivs
        return tableOfDivs
    },

}
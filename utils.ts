

const Monts:Record<string, string> = {
    "01" : "Января",
    "02": "Февраля",
    "03": "Марта",
    "04": "Апреля",
    "05": "Май",
    "06" : "Июнь",
    "07": "Июль",
    "08": "Август",
    "09": "Сентябрь",
}

export const TranslateDate = (date: string):string => {
    const fullDay = date.slice(8, 10)
    const fullMonth = date.slice(5, 7)
    const fullDate:string[] = []
    if (fullMonth[0] !== "0") {
        if (fullMonth === "10") {
            fullDate[1] = "Октября"
        }
        if (fullMonth === "11") {
            fullDate[1] = "Ноября"
        }
        if (fullMonth === "12") {
            fullDate[1] = "Декабря"
        }
    }
    if (fullMonth[0] === "0") {
        fullDate[1] = Monts[fullMonth]
    }
    if (fullDay[0] === "0") {
            fullDate[0] = fullDay[1]
    }
    if (fullDay[0] !== "0") {
        fullDate[0] = fullDay
    }


    return fullDate.join().replace(",", " ")

}











module.exports = function (teams) {
    schedule = []
    for (i = 0; i < teams.length -1; i++) {
        min = 0
        max = 5
        playingDay = []
        for (j = 0; j < 3; j++) {
            playingDay.push([teams[min], teams[max]])
            min++
            max--
        }
        schedule.push(playingDay)
        let aux = teams[1]
        teams.splice(1, 1)
        teams.push(aux)
    }
    return schedule
}
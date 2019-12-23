/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(array) {
    return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

let createEmployeeRecords = function(array) {

   return array.map(record => createEmployeeRecord(record))

}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date 
    })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

// * **Argument(s)**
//   * A date of the form `"YYYY-MM-DD"`
// * **Returns**
//   * Hours worked, an `Integer`
// * **Behavior**
//   * Given a date, find the number of hours elapsed between that date's
//     timeInEvent and timeOutEvent
    //me: subtract timeInEvent.hours from timeOutEvent.hours
let hoursWorkedOnDate = function(cats) {
    let dateTimeIn = this.timeInEvents.find(e => e.date === cats)

    let dateTimeOut = this.timeOutEvents.find(e => e.date === cats)

    return (dateTimeOut.hour - dateTimeIn.hour) / 100
}

let wagesEarnedOnDate = function(date) {

    return this.payPerHour * hoursWorkedOnDate.call(this, date)
        // ???????????????????call??????????????????????
}

let findEmployeeByFirstName = function(src, firstNameString) {

    return src.find(e => e.firstName === firstNameString)

}


let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

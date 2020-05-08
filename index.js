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
    let record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}

let createEmployeeRecords = function(employees) {
    return employees.map(worker => createEmployeeRecord(worker))
}

let createTimeInEvent = function(timestamp) {
    let [ date, hour ] = timestamp.split(' ')
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    }
    this.timeInEvents.push(timeIn)
    return this
}

let createTimeOutEvent = function(timestamp) {
    let [ date, hour ] = timestamp.split(' ')
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    }
    this.timeOutEvents.push(timeOut)
    return this
}

let hoursWorkedOnDate = function(seekDate) {
    let timeIn = this.timeInEvents.find( e => e.date === seekDate )
    let timeOut = this.timeOutEvents.find( e => e.date === seekDate )
    let hours = timeOut.hour - timeIn.hour
    return hours/100
}

let wagesEarnedOnDate = function(seekDate) {
    let hoursWorked = hoursWorkedOnDate.call(this, seekDate)
    let pay = this.payPerHour * hoursWorked
    return pay
}

let findEmployeeByFirstName = function(srcArray, name) {
    return srcArray.find( e => e.firstName === name )
}

let calculatePayroll = function(records) {
    return records.reduce(function(memo, rec) {
        return memo + allWagesFor.call(rec)
    }, 0)
}
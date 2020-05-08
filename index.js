/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employees) {
    return employees.map(createEmployeeRecord)
}

function createTimeInEvent(dateHour) {
    this.timeInEvents.push({
        type: "TimeIn",
        date: dateHour.split(" ")[0],
        hour: parseInt(dateHour.split(" ")[1])
    })
    return this
}

function createTimeOutEvent(dateHour) {
    this.timeOutEvents.push({
        type: "TimeOut",
        date: dateHour.split(" ")[0],
        hour: parseInt(dateHour.split(" ")[1])
    })
    return this
}

function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date)
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date)
    return (timeOutEvent.hour - timeInEvent.hour) / 100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employees) {
    return employees.reduce((memo, employee) => allWagesFor.call(employee) + memo, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}
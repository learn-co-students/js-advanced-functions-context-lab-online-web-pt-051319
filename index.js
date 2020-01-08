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

function createEmployeeRecord(employeeRecord) {
    return {
        firstName: employeeRecord[0],
        familyName: employeeRecord[1],
        title: employeeRecord[2],
        payPerHour: employeeRecord[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRecord) {
    return employeeRecord.map(createEmployeeRecord)
}

function createTimeInEvent(dateHour) {
    let [date, hour] = dateHour.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    })
    return this
}

function createTimeOutEvent(dateHour) {
    let [date, hour] = dateHour.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    })
    return this
}

function hoursWorkedOnDate(date) { 
    let timeInEvent = this.timeInEvents.find(e => e.date === date)
    let timeOutEvent = this.timeOutEvents.find(e => e.date === date)
    return (timeOutEvent.hour - timeInEvent.hour)/100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function calculatePayroll(employeeRecords) { 
    return employeeRecords.reduce((memo, employeeRecord) => allWagesFor.call(employeeRecord) + memo, 0)
}

function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find(employee => employee.firstName === firstName)
}
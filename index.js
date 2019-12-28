/* Your Code Here */

function createEmployeeRecord(array)  {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(data){
    return data.map(createEmployeeRecord)
}

// function createTimeInEvent(employee, timestamp){
//     let [date, hour] = timestamp.split(' ')
//     employee.timeInEvents.push({
//         type: "TimeIn",
//         hour: parseInt(hour, 10),
//         date
//     })
//     return employee
// }
function createTimeInEvent(timestamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        date: timestamp.split(' ')[0],
        hour: parseInt(timestamp.split(' ')[1])
    })
    return this
}

function createTimeOutEvent(timestamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timestamp.split(' ')[1]),
        date: timestamp.split(' ')[0]
    })
    return this
}

function hoursWorkedOnDate(date){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === date
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === date
    })
    return (outEvent.hour - inEvent.hour)/100
}

// function wagesEarnedOnDate(employee, date){
//     let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour
//     return parseFloat(wage.toString())
// }

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}
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

function calculatePayroll(array) {
    return array.reduce((memo, employee) => allWagesFor.call(employee) + memo, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}
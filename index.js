const createEmployeeRecord = (info) => {
	return {
		'firstName': info[0],
		'familyName': info[1],
		'title': info[2],
		'payPerHour': info [3],
		'timeInEvents': [],
		'timeOutEvents': []
	}
}

const createEmployeeRecords = (infos) => {
	return infos.map(info => createEmployeeRecord(info))
}

const createTimeEvent = (event, type) => ({
			'date': event[0],
			'hour': parseInt(event[1]),
			'type': type
})

 const createTimeInEvent = function(eventInfo) {
	this.timeInEvents.push(createTimeEvent(eventInfo.split(' '), 'TimeIn'))
	return this
}

 const createTimeOutEvent = function(eventInfo) {
	this.timeOutEvents.push(createTimeEvent(eventInfo.split(' '), 'TimeOut'))
	return this
}

 const hoursWorkedOnDate = function(date) {
	let inEvent = this.timeInEvents.find(event => event.date == date)
	let outEvent = this.timeOutEvents.find(event => event.date == date)
	return inEvent && outEvent ? (outEvent.hour - inEvent.hour)/100 : 0
}

 const wagesEarnedOnDate = function(date) {
	return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

 const findEmployeeByFirstName = function(collection, firstNameString){
	return collection.find(record => record.firstName == firstNameString)
}

 const calculatePayroll = function(data) {
	return data.reduce((payroll, employee) => allWagesFor.call(employee) + payroll, 0)
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
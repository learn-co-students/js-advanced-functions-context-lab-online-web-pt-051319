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
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

let createEmployeeRecord = function (employeeArray) {
  let employee = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employee;
};

let createEmployeeRecords = function (arrays) {
  let employees = arrays.map((employee) => createEmployeeRecord(employee));
  return employees;
};

let createTimeInEvent = function (dateStamp) {
  let date = dateStamp.split(" ")[0];
  let hour = parseInt(dateStamp.split(" ")[1]);

  this.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: hour,
  });
  return this;
};

let createTimeOutEvent = function (dateStamp) {
  let date = dateStamp.split(" ")[0];
  let hour = parseInt(dateStamp.split(" ")[1]);

  this.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: hour,
  });
  return this;
};

let hoursWorkedOnDate = function (date) {
  let timeIn = this.timeInEvents.find((record) => record.date === date);
  let timeOut = this.timeOutEvents.find((record) => record.date === date);

  return (timeOut.hour - timeIn.hour) / 100;
};

let wagesEarnedOnDate = function (date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

let calculatePayroll = function (employeeArray) {
  return employeeArray.reduce(
    (accumulator, record) => allWagesFor.call(record) + accumulator,
    0
  );
};

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

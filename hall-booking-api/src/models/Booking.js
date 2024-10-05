class Booking {
    constructor(id, customerId, roomId, date, startTime, endTime) {
      this.id = id;
      this.customerId = customerId;
      this.roomId = roomId;
      this.date = date;
      this.startTime = startTime;
      this.endTime = endTime;
      this.bookingDate = new Date();
      this.status = 'Confirmed';
    }
  }
  
  module.exports = Booking;
  
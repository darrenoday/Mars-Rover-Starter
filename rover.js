const Command = require('./command.js')
const Message = require('./message.js')
class Rover {
   constructor(position) {
      this.position = position
      this.mode = "NORMAL"
      this.generatorWatts = 110
   }
   receiveMessage(message) {
      let response = {
         message: message.name,
         results: [],
      }
      for (let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType == 'MOVE') {

            if (this.mode == "NORMAL") {
               this.position = message.commands[i].value
               response.results.push({ completed: true })

            } else {

               response.results.push({ completed: false })

            }

         }


         if (message.commands[i].commandType == 'STATUS_CHECK') {
            response.results.push(
               {
                  completed: true,
                  roverStatus: {
                     mode: this.mode,
                     generatorWatts: this.generatorWatts,
                     position: this.position
                  }
               })
         }

         if (message.commands[i].commandType == 'MODE_CHANGE') {
            this.mode = message.commands[i].value
            response.results.push({ completed: true })
         }
      }


      return response
   }




   // Write code here!
}
module.exports = Rover;

let rover = new Rover(100);
let commands = [
   new Command('MOVE', 4321),
   new Command('STATUS_CHECK'),
   new Command('MODE_CHANGE', 'LOW_POWER'),
   new Command('MOVE', 3579),
   new Command('STATUS_CHECK')
];
let message = new Message('TA power', commands);
let response = rover.receiveMessage(message);

console.log(response)

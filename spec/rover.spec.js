const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it('constructor sets position and default values for mode and generatorWatts', function(){
    let testRover = new Rover(5000);
    expect(testRover.position).toBe(5000);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.generatorWatts).toBe(110);
  });
 
  it('response returned by receiveMessage contains the name of the message', function(){
    let testRover = new Rover(5000);
    let commands = [new Command('MOVE', 100), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let response = testRover.receiveMessage(message);
    expect(response.message).toBe('Test message');
  });

  it('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
    let testRover = new Rover(5000);
    let commands = [new Command('MOVE', 100), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let response = testRover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  it('responds correctly to the status check command', function(){
    let testRover = new Rover(5000);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let response = testRover.receiveMessage(message);
    expect(response.results[0].completed).toBeTruthy();
    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe(5000);
  });

  it('responds correctly to the mode change command', function(){
    let testRover = new Rover(5000);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message', commands);
    let response = testRover.receiveMessage(message);
    expect(response.results[0].completed).toBeTruthy();
    expect(testRover.mode).toBe('LOW_POWER');
  });

  it('responds with a false completed value when attempting to move in LOW_POWER mode', function(){
    let testRover = new Rover(5000);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 100)];
    let message = new Message('Test message', commands);
    let response = testRover.receiveMessage(message);
    expect(response.results[1].completed).toBeFalsy();
    expect(testRover.position).toBe(5000);
  });

  it('responds with the position for the move command', function(){
    let testRover = new Rover(5000);
    let commands = [ new Command('MOVE', 100)];
    let message = new Message('Test message', commands);
    let response = testRover.receiveMessage(message);
    expect(testRover.position).toBe(100);
  })
  

  // 7 tests here!

});

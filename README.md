This is a simple react js application which uses a `pid` for communication between **two** components. How the communication is done is defined in the `channelService.js` file. A component class in its constructor function will create a `pid` and register itself with the `channelService` object. Upon registration it will recieve a `channel` object through which it can send messages to a given `pid` and recieve messages via a `msgName`. 

```
    this.pid = Math.random();
    this.channel = channelService.register(this.pid);
```

As long as a pid is available to a component it can send messages to that pid whether there is a reciever or not for those messages. If no reciever has registered a callback the messages will buffer up in a queue and will be retried again in sometime (TODO).

## Types of communication between react components are as follows:

#### Child component(s) to parent component
A parent `pid` is passed to the child component which it can use to send data to the parent component

```
    //pid created by parent component
    <InputFieldComp parentPid={pid} />
```

#### Parent component to child component(s)
An empty `pid` object is passed to the child component as parameter, the child component upon creating a `pid` will the its pid value in this object which is read by the parent for communication purposes. A caveat here is I am not sure if setting the pid value in the `pid` object is synchronous, if not there could be a state where parent is trying to send a msg to a undefined pid value.

```
    //inputFieldPid initially set to null, should be set by the InputFieldComp component
    //and later used by the parent component to send messages
    <InputFieldComp pid={inputFieldPid} />
```

#### Component to sibling component
Here parent component acts as a proxy between communication between two sibling components. The `channelProxy` method defined in `App.js` file defines how the proxy communication is done.

```
    //msgName to be proxied
    //targetPid is the pid object of the sibling component to send to
    channelProxy(msgName, targetPid) {
        const self = this;
        this.channel.on(msgName, function(msg) {
            const msgObj = {};
            msgObj[msgName] = msg;
           self.channel.send(msgObj, targetPid.value); 
        });
    }

```

#### Generic component to component (neither siblings nor parent child relationship)
TODO

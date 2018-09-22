var Postoffice = function() {
    let messageBuffer = [];
    const channelPidMap = {};
    const delay = 500;

    this.register = function(pid) {
        if (!pid) {
            throw new Error(`provided pid: ${pid} is not valid`);
        }
        if (channelPidMap.hasOwnProperty(pid)) {
            throw new Error(`pid: ${pid} already registered`);
        } else {
            const channel = getChannelObj();
            channelPidMap[pid] = channel;
            return channel;
        }
    };

    const send = function(msg, pid) {
        const keys = Object.keys(msg);
        const channel = channelPidMap[pid];
        const cb = channel._msgNameCbMap[keys[0]];
        cb(msg[keys[0]]);
    };


    const getChannelObj = function() {
        const channel = {
            _msgBuffer: [],
            _msgNameCbMap: {},

            send: function(msg, pid) {
                msg = JSON.parse(JSON.stringify(msg));
                if (callbackExists(msg, pid)) {
                    send(msg, pid);
                } else {
                    pushToBuffer(msg, pid);
                }
            },

            on: function(msgName, cb) {
                this._msgNameCbMap[msgName] = cb;
            }
        }
        return channel;
    };

    const pushToBuffer = function(msg, pid) {
        messageBuffer.push({
            msg: msg,
            pid: pid
        });
    };

    const callbackExists = function(msg, pid) {
        if (channelPidMap.hasOwnProperty(pid)) {
            const keys = Object.keys(msg);
            const channel = channelPidMap[pid];
            const cb = channel._msgNameCbMap[keys[0]];
            if (cb) {
                return true;
            }
            return false;
        }
        return false;
    };

    const flushMsgBuffer = function() {
        const startTime = Date.now();
        let timeDiff = 0;
        let index = 0;
        while((index > messageBuffer.length) &&
              (timeDiff <= delay)) {
            const obj = messageBuffer[index];
            if (callbackExists(obj.msg, obj.pid)) {
                //change the array
                messageBuffer = messageBuffer.slice(0, index).concat(messageBuffer.slice(index + 1, messageBuffer.length));
            } else {
                //do nothing to the array
            }
            index ++;
        }
    }
};

var postoffice = new Postoffice();

module.exports = postoffice;
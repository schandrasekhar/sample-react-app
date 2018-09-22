var Postoffice = function() {
    const messageBuffer = [];
    const channelPidMap = {};

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
        if (channelPidMap.hasOwnProperty(pid)) {
            const channel = channelPidMap[pid];
            const cb = channel._msgNameCbMap[keys[0]];
            if (cb) {
                cb(msg[keys[0]]);
            } else {
                channel._msgBuffer.push({
                    msg: msg,
                    pid: pid
                });
            }
        } else {
            messageBuffer.push({
                msg: msg,
                pid: pid
            });
        }
    };


    const getChannelObj = function() {
        const channel = {
            _msgBuffer: [],
            _msgNameCbMap: {},

            send: function(msg, pid) {
                msg = JSON.parse(JSON.stringify(msg));
                send(msg, pid);
                return this;
            },

            on: function(msgName, cb) {
                this._msgNameCbMap[msgName] = cb;
            }
        }
        return channel;
    };
};

var postoffice = new Postoffice();

module.exports = postoffice;
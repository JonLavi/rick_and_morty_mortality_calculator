const PubSub = {
  publish: function (channel, payload) {
    const event = new CustomEvent(channel, {
      detail: payload
    });
    document.dispatchEvent(event);
    console.log(`Published to channel: ${channel} with payload ${payload}`)
  },

  subscribe: function (channel, callback) {
    document.addEventListener(channel, callback);
    console.log(`Subscribed to channel: ${channel}`)
  }
};

module.exports = PubSub;

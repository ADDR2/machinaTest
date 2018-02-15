const machina = require("machina");

module.exports = transitions => {
    const ovenMachine = new machina.Fsm({
        initialize: function(options) {
            this.transitions = {};

            transitions.forEach( transition => {
                this.transitions[transition.from] = this.transitions[transition.from] || {};
                this.transitions[transition.from][transition.to] = true;
                this.states[transition.from] = {
                    _onEnter: function() {
                        if(this.forbidden) console.log("Incorrect access");
                        else console.log("Entering in", this.state);
                    }
                };
            });
        },

        initialState: "boot",
     
        goTo: function(state){
            this.forbidden = false;
            this.transition(state);
        }
    });

    ovenMachine.on("transition", function (data){
        if(!(data.toState in this.transitions[data.fromState]))
            this.forbidden = true;
    });

    ovenMachine.goTo("loaded");

    return ovenMachine;
};
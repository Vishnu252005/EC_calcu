var RAW_GETTER_REGEX = /([0-9]*(.|,)[0-9]*)/i;

var ChargeCalc = React.createClass({
    displayName: 'ChargeCalc',
    getInitialState: function () {
        return {
            value1: "1 V",
            value2: "1 F",
            value3: "1 C",
            value4: "0.5 J"
        };
    },
    updateUI: function(digit, value) {
        document
            .getElementById('svg_charge')
            .getSVGDocument()
            .getElementById('display_value' + digit)
            .textContent = value;
    },
    handleChange: function() {
        var v1 = React.findDOMNode(this.refs.value1).value;
        var v2 = React.findDOMNode(this.refs.value2).value;

        var v3 = this.getCharge(v1, v2);
        var v4 = this.getEnergy(v1, v2);

        this.setState({
            value1: v1,
            value2: v2,
            value3: v3,
            value4: v4
        });

        // updateUI
        this.updateUI('1', v1);
        this.updateUI('2', v2);
        this.updateUI('3', v3);
        this.updateUI('4', v4);
    },
    getRaw: function(v) {
        if (!v | v == "") {
            return 0;
        }
        return parseFloat(v.match(RAW_GETTER_REGEX)[0]);
    },
    getCharge: function(u, c) {
        var q = this.getRaw(u) * this.getRaw(c);
        if (isNaN(q)) {
            return "--";
        }
        return  q + " C";
    },
    getEnergy: function(u, c) {
        var rawU = this.getRaw(u);
        var e = 0.5 * this.getRaw(c) * rawU * rawU;
        console.log(e);
        if (isNaN(e)) {
            return "--";
        }
        return e + " J";
    },
    render: function () {
        return (
            <div>
                <h5>ONLY USE VOLTS AND FARADS AS UNITS!</h5>
                Voltage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(U):
                &nbsp;<input ref="value1" onChange={ this.handleChange } type="text" value={ this.state.value1 } />
                <br />
                Capacitance&nbsp;(C):
                &nbsp;<input ref="value2" onChange={ this.handleChange } type="text" value={ this.state.value2 }/>
            </div>
        )
    }
});

React.render(<ChargeCalc />, document.getElementById('charge'));
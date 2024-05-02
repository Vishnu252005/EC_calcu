var DigitCodes = {
    'sig_figure': {
        "0": 0,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9
    },
    'multiplier': {
        "0": 1,
        "1": 10,
        "2": 1e2,
        "3": 1e3,
        "4": 1e4,
        "5": 1e5,
        "8": 1e-2,
        "9": 1e-1
    },
    'tolerance': {
        'C': '0.25 pF',
        'D': '0.5 pF',
        'F': '1 %',
        'G': '2 %',
        'J': '5 %',
        'K': '10 %',
        'M': '20 %',
        'N': '30 %',
        'P': '+100%, -0%',
        'Z': '-20%, +80%'
    }
}

var CapacitorCalc = React.createClass({
    mixins: [SelectHelper, ValueCalculator, ComponentRenderer],
    displayName: 'Capacitor',
    getInitialState: function () {
        return {
            digit1: 0,
            digit2: 0,
            digit3: 0,
            letter: DigitCodes[TypeEnum.TOLERANCE]['C']
        };
    },
    updateUI: function(digit, node) {
        document
            .getElementById('svg_capacitor')
            .getSVGDocument()
            .getElementById('display_' + digit)
            .textContent = node.options[node.selectedIndex].text;
    },
    handleChange: function() {
        var d1 = React.findDOMNode(this.refs.digit1);
        var d2 = React.findDOMNode(this.refs.digit2);
        var d3 = React.findDOMNode(this.refs.digit3);
        var l1 = React.findDOMNode(this.refs.letter);

        this.setState({
            digit1: d1.value,
            digit2: d2.value,
            digit3: d3.value,
            letter: l1.value
        });

        // updateUI
        this.updateUI('digit1', d1);
        this.updateUI('digit2', d2);
        this.updateUI('digit3', d3);
        this.updateUI('letter', l1);
    },
    getCapacitance: function() {
        var c = this.calcValue(this.state.digit1, this.state.digit2, this.state.digit3)
        if (c >= 1e6) {
            return c / 1e6 + "\u00B5";
        }
        if (c >= 1e3) {
            return c / 1e3 + "n";
        }

        if (this.state.digit3 == 1e-2) {
            return Math.round(
                (c / 1e-1) * 1e5
            ) / 1e5
            + "m";
            
        }

        if (this.state.digit3 == 1e-1) {
            return this.state.digit1 * 10 + parseFloat(this.state.digit2) + "m";
        }

        return c + "p";
    },
    getTolerance: function() {
        return this.state.letter;
    },
    render: function () {
        var showPlusMinus = true;
        if (this.getTolerance().includes('+') || this.getTolerance().includes('-')) {
            showPlusMinus = false;
        }
        return this.basicRender(this.renderItems(), this.getCapacitance(), this.getTolerance(), "F", "", showPlusMinus);
    },
    renderItems: function() {
        return this.basicRenderItems(
            "selection", this.handleChange, DigitCodes,
            [TypeEnum.SIG_FIGURE, TypeEnum.SIG_FIGURE, TypeEnum.MULTIPLIER, TypeEnum.TOLERANCE],
            ["digit1", "digit2", "digit3", "letter"]
        );
    }
});

React.render(<CapacitorCalc />, document.getElementById('capacitor'));
var SelectHelper = {
    createOption: function(db, type, value) {
        return <option value={ db[type][value] }>{ value }</option>
    },
    createList: function(db, type) {
        var list = [];
        for (var value in db[type]) {
            list.push(this.createOption(db, type, value));
        }
        return list;
    },
    createSelect: function(ref, onChange, value) {
        return <select ref={ ref } onChange={ onChange }>{ value }</select>;
    },
    basicRenderItems: function(className, onChange, db, figures, refs) {
        if (figures.length != refs.length) {
            throw "figures and refs MUST have the same length"
        }
        var selects = [];
        for (var i in refs) {
            selects.push(
                this.createSelect(refs[i], onChange,
                    this.createList(
                        db, figures[i]
                    )
                )
            );
        }

        return (
            <div className={className}>
                { selects }
            </div>
        );
    }
};

var ValueCalculator = {
    calcValue: function(v1, v2, v3) {
        var v = (v1 * 10 + parseFloat(v2)) * v3;
        return Math.round(v * 1e5) / 1e5;
    },
    convertUnit: function(value) {
        if (value == 0) {
            return value;
        }

        if (value >= 1000000000) {
            return value / 1000000000 + "G";
        }
        if (value >= 1000000) {
            return value / 1000000 + "M";
        }

        if (value >= 1000) {
            return value / 1000 + "k";
        }
        // fallback
        return value;
    }
};

var ComponentRenderer = {
    basicRender: function(itemSelector, value, tolerance, unit, toleranceUnit, showPlusMinus) {
        var prefix = '';
        if (showPlusMinus || showPlusMinus === undefined) {
            var prefix = '\u00B1'
        }
        return (
            <div>
                { itemSelector }
                <p>
                    <h5 className="inline">
                        { value }{ unit }
                    </h5>
                    <h6 className="inline">
                        &nbsp;w/ { prefix }{ tolerance }{ toleranceUnit } tolerance.
                    </h6>  
                </p>
            </div>
        )
    }
};
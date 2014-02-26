(function(_, Backbone) {
    var sync = Backbone.sync;

    Backbone.sync = function(method, model, options) {
        var lastXHR = model._lastXHR && model._lastXHR[method];

        if ((lastXHR && lastXHR.readyState != 4) && (options && options.safe !== false))
            lastXHR.abort('stale');

        if (!model._lastXHR)
            model._lastXHR = {};

        var newXHR = model._lastXHR[method] = sync.apply(this, arguments);

        newXHR.always(function() {
            if(newXHR === model._lastXHR[method]) {
                delete model._lastXHR[method];
            }
        });

        return newXHR;
    };
})(window._, window.Backbone);

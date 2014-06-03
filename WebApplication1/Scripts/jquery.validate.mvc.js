/*
 *  Project: MVC Validation Framework
 *  Description: This plugin will convert client side validation elements to bootstrap tooltips
 *  Author: Ahmad Aqrabawi, Mohamed Aljaber
 *  License: MIT
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; (function ($, window, document, undefined) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "tooltipValidation";
    var defaults = {
    };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function () {

            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).

            var elem = $(this.element),
                name = elem.attr("name"),
                defaultBorderCss = elem.css('border'),
                tooltipPlacement = this.options.placement;

            if (name) {

                var errValElem = $('span[data-valmsg-for="' + name + '"]');
                errValElem.hide();

                function onDOMSubtreeModified(errValElem) {

                    errValElem.bind("DOMSubtreeModified", function () {

                        elem.tooltip("destroy");
                        elem.siblings("div.tooltip").remove();

                        var isTooltipPluginAttached = elem.data("plugin_tooltipValidation");
                        if (!isTooltipPluginAttached) {
                            elem.tooltip({
                                'title': errValElem.text(),
                                'animation': 'true',
                                'placement': tooltipPlacement || 'top',
                                'trigger': 'focus'
                            });
                        }

                        if (errValElem.hasClass("field-validation-error")) {
                            elem.css('border', '1px solid red');
                        }
                        else {
                            elem.css('border', defaultBorderCss);
                            elem.tooltip('destroy');
                            elem.siblings("div.tooltip").remove();
                        }

                    });
                };
                function showTooltipOfError(event) {

                    var inputField = event.currentTarget;
                    if (errValElem.hasClass("field-validation-error") || errValElem.hasClass("field-error")) {

                        $(inputField).siblings("div.tooltip").remove();

                        $(inputField).tooltip({
                            'title': $(errValElem).text(),
                            'animation': 'true',
                            'placement': tooltipPlacement || 'top',
                            'trigger': 'focus'
                        });
                        $(inputField).tooltip('show')
                        $(".tooltip").addClass("error");
                    }
                };

                if (elem.is('select')) { //Handle tooltip on input type = select (DropdownList)
                    elem.on("focus mouseenter", function (event) {
                        showTooltipOfError(event);
                    });
                    elem.on("mouseleave", function (event) {
                        var inputField = event.currentTarget;
                        $(inputField).tooltip('hide');
                    });
                    onDOMSubtreeModified(errValElem);
                }
                else if (elem.attr('type') == 'date') { //Handle if input type = date
                    elem.on("focus mouseenter", function (event) {
                        showTooltipOfError(event);
                    });
                    elem.on("mouseleave", function (event) {
                        var inputField = event.currentTarget;
                        $(inputField).tooltip('hide');
                    });
                    elem.on("change", function (event) {
                        var inputField = event.currentTarget;
                        if ($(inputField).val() != "") {
                            elem.css('border', defaultBorderCss);
                            elem.tooltip('destroy');
                            elem.siblings("div.tooltip").remove();
                        }
                        else
                            elem.css('border', '1px solid red');
                    });
                    onDOMSubtreeModified(errValElem);
                }
                else if (elem.attr('type') == 'file') {
                    elem.on("focus mouseenter", function (event) {
                        showTooltipOfError(event);
                    });
                    elem.on("mouseleave", function (event) {
                        var inputField = event.currentTarget;
                        $(inputField).tooltip('hide');
                    });
                    onDOMSubtreeModified(errValElem);
                }
                else {
                    elem.on("focus", function (event) {
                        showTooltipOfError(event);
                    });
                    onDOMSubtreeModified(errValElem);
                }
            }
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("./utils");
;
;
var ReactImageTint = /** @class */ (function (_super) {
    __extends(ReactImageTint, _super);
    function ReactImageTint(props) {
        var _this = _super.call(this, props) || this;
        _this._mounted = false;
        _this.state = {
            src: props.src
        };
        return _this;
    }
    ReactImageTint.prototype.componentDidMount = function () {
        this._mounted = true;
        this.applyTint(this.props.src, this.props.color);
    };
    ReactImageTint.prototype.componentWillUnmount = function () {
        this._mounted = false;
    };
    ReactImageTint.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.src !== this.props.src) {
            this.applyTint(newProps.src, newProps.color);
        }
    };
    ReactImageTint.prototype.applyTint = function (src, color) {
        var _this = this;
        if (!utils_1.isColorful(src) && this.refs.img) {
            var imgElement = this.refs.img;
            utils_1.tintData(imgElement, color, { cache: Boolean(this.props.cache) })
                .then(function (src) { return _this._mounted && _this.setState({ src: src }); });
        }
    };
    ReactImageTint.prototype.render = function () {
        return (React.createElement("img", { src: this.state.src, alt: this.props.alt, ref: "img", crossOrigin: "anonymous" }));
    };
    return ReactImageTint;
}(React.Component));
exports.ReactImageTint = ReactImageTint;
//# sourceMappingURL=index.js.map
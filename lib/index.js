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
        _this.state = {
            src: props.src
        };
        return _this;
    }
    ReactImageTint.prototype.componentDidMount = function () {
        var _this = this;
        if (this.refs.img) {
            utils_1.tintData(this.refs.img, this.props.color)
                .then(function (src) { return _this.setState({ src: src }); });
        }
    };
    ReactImageTint.prototype.componentWillReceiveProps = function (newProps) {
        var _this = this;
        if (newProps.src !== this.props.src) {
            utils_1.tintData(this.refs.img, newProps.color)
                .then(function (src) { return _this.setState({ src: src }); });
        }
    };
    ReactImageTint.prototype.render = function () {
        return (React.createElement("img", { src: this.state.src, alt: this.props.alt, ref: "img", crossOrigin: "anonymous" }));
    };
    return ReactImageTint;
}(React.Component));
exports.ReactImageTint = ReactImageTint;
//# sourceMappingURL=index.js.map
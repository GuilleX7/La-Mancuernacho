Function.prototype.extends = function (parent) {
    this.prototype = new parent();
    this.prototype.constructor = this;
    return this;
};

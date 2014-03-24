Object.clone = function(obj) {
	
	// Handle the 3 simple types, and null or undefined
    if (null === obj || "object" !== typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copyDate = new Date();
        copyDate.setTime(obj.getTime());
        return copyDate;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copyArray = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copyArray[i] = Object.clone(obj[i]);
        }
        return copyArray;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = Object.clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
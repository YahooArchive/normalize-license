/*
 * Copyright (c) 2014, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var guess = function (str) {
    if (str.indexOf('MIT') > -1) {
        return 'MIT* (guessed)';
    } else if (str.indexOf('BSD') > -1) {
        return 'BSD* (guessed)';
    } else if (str.indexOf('Apache License') > -1) {
        return 'Apache* (guessed)';
    } else if (str.indexOf('DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE') > -1) {
        return 'WTF* (guessed)';
    }
    return null;
};

var known = {
    'mit': 'MIT',
    'bsd': 'BSD',
    'x11': 'X11',
    'apache': 'Apache',
    'gpl': 'GPL'
};

var clean = function (str) {
    var s = str.toLowerCase();
    return known[s] || str;
};

var formatLicense = function (json, g) {
    var data = null,
        licenseData = json.license || json.licence || json.licenses || undefined;

    if (licenseData) {
        if (Array.isArray(licenseData) && licenseData.length > 0) {
            data = licenseData.map(function (license) {
                if (!license) {
                    return license;
                }
                if (typeof license === 'string') {
                    return license;
                }
                /*istanbul ignore else*/
                if (typeof license === 'object') {
                    return license.type;
                }
            });
        }
        if (typeof licenseData === 'object' && licenseData.type) {
            data = licenseData.type;
        }
        if (typeof licenseData === 'string') {
            data = licenseData;
        }
    }
    if (Array.isArray(data)) {
        data = data.join(', ');
    }
    //We should guess from the readme
    if (data === '' || data === ', ') {
        data = null;
    }
    if (!data && json.readme && g) {
        data = guess(json.readme);
    }
    return data ? clean(data) : data;
};

formatLicense.guess = guess;

module.exports = formatLicense;

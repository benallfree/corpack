module.exports = {
    "plugins": ["prettier"],
    "extends": ["standard","prettier","plugin:react/recommended"],
    "parser": "babel-eslint",
    "rules": {
        "prettier/prettier": "error"
    },
    "globals": {
        "LIVEUPDATE": true,
        "LIVE_UPDATE_URL": true,
        "cordova": true,
    }
};
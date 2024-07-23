/**
 * USES 
 * 
 * generateResponse(res, 200, "Success")                    (without body)
 * generateResponse(res, 200, "Success", {data: users})     (with body)
 */
const generateResponse = (res, status, message, data = undefined) => {
    const response = {
        success: (status == 200), 
        message
    }

    if (data)
        for (const key in data) {
            response[key] = data[key];
        }

    res.status(status).json(response);
}

const colors = require('colors');
class BeautifulOutput {

    static info(text) {
        console.log(text);
    }

    static warning(text) {
        console.log(colors.yellow(text));
    }

    static error(text) {
        console.log(colors.red(text));
    }

    static success(text) {
        console.log(colors.green(text));
    }
}

module.exports = { generateResponse, BeautifulOutput }
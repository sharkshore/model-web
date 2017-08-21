/**
 * 延迟执行
 * @param timeout
 * @returns {Promise}
 */
export const delay = (timeout) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeout)
    })
};

/**
 * 周期执行
 * @type {{return: Promise}}
 */
export const cycle = (timeout) => {
    return new Promise((resolve, reject) => {
        setInterval(resolve, timeout)
    })
}


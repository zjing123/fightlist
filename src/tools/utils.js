import _ from 'lodash'

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if(!name) return
    if(typeof content !== 'string') {
        content = JSON.stringify(content)
    }

    window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if(!name) return
    let content;
    try{
        content = JSON.parse(localStorage.getItem(name))
    } catch (err) {
        content = localStorage.getItem(name)
    }
    return content
}

/**
 * 删除localStorage
 */

export const removeStore = name => {
    if(!name) return;
    window.localStorage.removeItem(name);
}

export const multipleRemoveStore = names => {
    if(typeof names === 'string') removeStore(names)

    if(typeof names === 'object') {
        _.forEach(names, function(name, key) {
            removeStore(name)
        })
    }
}

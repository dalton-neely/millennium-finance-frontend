import {API_BASE_PATH, API_URL, API_VERSION, BOT_PATH, DATA_PATH} from "../constants";

export const constructApiUrl = (url, base, version, path, parameters) => {
    if(url == null){
        url = API_URL;
    }
    if(base == null){
        base = API_BASE_PATH;
    }
    if(version == null){
        version = API_VERSION;
    }
    if(path == null){
        throw new Error("Call to API must include a path");
    }
    if(parameters == null){
        return url + "/" + base + "/" + version + "/" + path;
    } else {
        return url + "/" + base + "/" + version + "/" + path + "?" + parameters;
    }
}

export const constructPostFetchOptions = inputParameters => ({
    method: "POST",
        mode: "cors",
        headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(inputParameters),
})

export const runBotSimulation = inputParameters => {
    return fetch(constructApiUrl(null, null, null, BOT_PATH + "/run"), constructPostFetchOptions(inputParameters))
        .then(response => response.json())
};

export const calculateData = inputParameters => {
    return fetch(constructApiUrl(null, null, null, DATA_PATH + "/calculate"), constructPostFetchOptions(inputParameters))
        .then(response => response.json())
}
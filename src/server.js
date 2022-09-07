const http = require('http');
const url = require('url');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': responseHandler.getIndex,
    '/cats': responseHandler.getCats,
    index: responseHandler.getIndex,
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const acceptedTypes = request.headers.accept.split(',');
    console.log(parsedUrl);
    console.log(acceptedTypes);

    const handlerFunction = urlStruct[parsedUrl.pathname];
    if (handlerFunction) {
        handlerFunction(request, response, acceptedTypes);
    }
    else {
        urlStruct.index(request, response);
    }

    //if (urlStruct[parsedUrl.pathname]) {
    //    urlStruct[parsedUrl.pathname](request, response);
    //}
    //else {
    //    urlStruct.index(request, response);
    //}
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});

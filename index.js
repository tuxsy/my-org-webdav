const webdav = require('webdav-server').v2;

const server = new webdav.WebDAVServer({
    port: process.env.PORT || 1900
});

server.afterRequest((arg, next) => {
    console.log('>>', arg.request.method, arg.fullUri(), '>', arg.response.statusCode, arg.response.statusMessage);
    next();
})


server.setFileSystem('/org', new webdav.PhysicalFileSystem('./org'), (success) => {
  server.start(httpServer => {
      console.log('Server started with success on the port : ' + httpServer.address().port);
  });
})
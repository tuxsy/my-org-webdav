const webdav = require('webdav-server').v2;

// User manager (tells who are the users)
const userManager = new webdav.SimpleUserManager();
const user = userManager.addUser('pepe', 'pepe1234', true);

// Privilege manager (tells which users can access which files/folders)
const privilegeManager = new webdav.SimplePathPrivilegeManager();
privilegeManager.setRights(user, '/', [ 'all' ]);

const server = new webdav.WebDAVServer({
    // HTTP Digest authentication with the realm 'Default realm'
    httpAuthentication: new webdav.HTTPDigestAuthentication(userManager, 'Default realm'),
    // privilegeManager: privilegeManager,
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
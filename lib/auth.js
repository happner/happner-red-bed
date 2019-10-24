class HappnerAuth {
  constructor(securityService){
    this.type = "credentials";
    this.__securityService = securityService;
    this.authenticate = (username, password) => {
      return new Promise((resolve) => {
        return this.__securityService.login(
          {username, password},
          null,
          { data: { info: { _local: false } } },
          function(e, session) {
            if (e) return resolve(null);
            resolve({
              username,
              permissions: "*",
              happnToken: session.token
            });
          }
        );
      });
    };

    this.default = () => {
      return new Promise(function(resolve) {
        // Resolve with the user object for the default user.
        // If no default user exists, resolve with null.
        resolve({
          anonymous: true,
          permissions: "read"
        });
      });
    };

    this.users = (username) => {
      return new Promise((resolve) => {

        this.__securityService.users.getUser(username)
        .then((user) => {
          if (!user) return resolve(null);
          resolve({
            username,
              permissions: "*"
          });
        });
      });
    };
  }

  static create(securityService){
    return new HappnerAuth(securityService);
  }
}

module.exports = HappnerAuth;

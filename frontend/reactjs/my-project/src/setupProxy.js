const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy(['/api'], {
      target: "http://192.168.244.61:4000",
    })
  );
  // mockoon mockAPI 数据
  app.use(
    proxy(['/test'], {
      target: "http://192.168.244.77:3333"
    })
  );
};
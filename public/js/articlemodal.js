

module.imports = function(app) {

 $("#modal").on("click") 
  app.get("/api/urls/:sessionId/:limit", function(req, res) {
    db.Url.findAll({
      include: [db.url],
        where: {
          sessionId: req.params.pw
        }
    });
  });


  app.post("/api/urls/:sessionId/:limit", function(req, res) {
    db.Url.create(req.body).then(function(dbUrl) {
      res.json(dbUser);
    });
  });

}
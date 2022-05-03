import sqlite3 from "sqlite3";

const db = new sqlite3.Database("trainers.db");

export async function savePokemon(request, response) {
  const idtrainer = request.params.idtrainer;

  const idpokemon = request.params.idpokemon;

  if (!idtrainer || !idpokemon) {
    response.status(403).send("No id trainer or id pokemon");
  }

  //db.serialize(function () {
  db.all(
    `SELECT * from catches WHERE id_trainer = ? AND id_pokemon = ?`,
    [idtrainer, idpokemon],
    function (err, row) {
      if (err) {
        console.log("erreur db catches ", err);
        response.status(503).json({ result: "not_ok", data: "server error" });
      } else {
        if (row.length == 0) {
          var stmt = db.prepare("INSERT INTO catches VALUES (NULL, ?, ?, ?)");
          stmt.run(idtrainer, idpokemon, 1);
          stmt.finalize();
          response.status(200).json({ result: "ok", data: "pokemon saved" });
        } else {
          var countUpdate = row[0].count;
          var id_ = row[0].id;
          var stmt = db.prepare("UPDATE catches SET count = ? WHERE id = ? ");
          stmt.run(countUpdate + 1, id_);
          stmt.finalize();
          response
            .status(200)
            .json({ result: "ok", data: "pokemon count + 1" });
        }
      }
    }
  );
  //});
}

export async function getPokemonsTrainer(request, response) {
  const idtrainer = request.params.idtrainer;

  if (!idtrainer) {
    response.status(403).send("no idtrainer");
  }

  db.all(
    `SELECT id_pokemon from catches WHERE id_trainer = ?`,
    [idtrainer],
    function (err, row) {
      if(err){
        console.log(err)
        response.status(503).json({result : "not_ok",data:"error server"})
      }
      else{
        var result = row.map(p => {return p.id_pokemon})
        response.status(200).json(result)
      }
    }
  );
}

import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "artdb",
});

app.get("/artist", (req, res) => {
  const sql = "select * from artist";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Server Error" });
    return res.json(result);
  });
});

app.post("/artist/create", (req, res) => {
  const sql =
    "INSERT INTO artist (`DisplayName`, `ArtistBio`, `Nationality`, `Gender`, `BeginDate`, `EndDate`, `WikiQid`, `Ulan`) VALUES (?)";
  const values = [
    req.body.displayName,
    req.body.artistBio,
    req.body.nationality,
    req.body.gender,
    req.body.beginDate,
    req.body.endDate,
    req.body.wikiQid,
    req.body.ulan,
  ];

  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.put("/artist/update/:id", (req, res) => {
  const sql =
    "UPDATE `artist` SET `DisplayName`=?,`ArtistBio`=?,`Nationality`=?,`Gender`=?,`BeginDate`=?,`EndDate`=?,`WikiQid`=?,`Ulan`=? WHERE ConstituentId=?";
  const id = req.params.id;

  db.query(
    sql,
    [
      req.body.displayName,
      req.body.artistBio,
      req.body.nationality,
      req.body.gender,
      req.body.beginDate,
      req.body.endDate,
      req.body.wikiQid,
      req.body.ulan,
      id,
    ],
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

app.delete("/artist/delete/:id", (req, res) => {
  const sql = "DELETE FROM `artist` WHERE ConstituentId =?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Server Error" });
    return res.json(result);
  });
});

app.listen(8081, () => {
  console.log("Listening");
});

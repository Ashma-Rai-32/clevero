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

// ***********ARTIST HTTP METHODS***********

app.get("/artist", (req, res) => {
  const sql = "select * from artist";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "SERVER ERROR" });
    return res.json(result);
  });
});

app.post("/artist", (req, res) => {
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

app.put("/artist/:id", (req, res) => {
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

app.delete("/artist/:id", (req, res) => {
  const sql = "DELETE FROM `artist` WHERE ConstituentId =?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "SERVER ERROR" });
    return res.json(result);
  });
});

// ***********ARTWORK HTTP METHODS***********

app.get("/artwork", (req, res) => {
  const sql = "select * from artwork";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "SERVER ERROR" });
    return res.json(result);
  });
});

app.post("/artwork", (req, res) => {
  const sql =
    "INSERT INTO `artwork`(`Title`, `ConstituentId`, `Date`, `Medium`, `Dimensions`, `CreditLine`, `AccessionNumber`, `Classification`, `Department`, `DateAcquired`, `SeatHeight`, `Catalogued`, `ObjectId`, `Url`, `ThumbnailUrl`, `Circumference`, `Depth`, `Diameter`, `Height`, `Length`, `Weight`, `Width`, `Duration`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.constituentId,
    req.body.date,
    req.body.medium,
    req.body.dimensions,
    req.body.creditLine,
    req.body.accessionNumber,
    req.body.classification,
    req.body.department,
    req.body.dateAcquired,
    req.body.seatHeight,
    req.body.catalogued,
    req.body.objectId,
    req.body.url,
    req.body.thumbnailUrl,
    req.body.circumference,
    req.body.depth,
    req.body.diameter,
    req.body.height,
    req.body.length,
    req.body.weight,
    req.body.width,
    req.body.duration,
  ];

  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.put("/artwork/:id", (req, res) => {
  const sql =
    "UPDATE `artwork` SET `DisplayName`=?,`ArtistBio`=?,`Nationality`=?,`Gender`=?,`BeginDate`=?,`EndDate`=?,`WikiQid`=?,`Ulan`=? WHERE ConstituentId=?";
  const id = req.params.id;

  db.query(
    sql,
    [
      req.body.displayName,
      req.body.artworkBio,
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

app.delete("/artwork/:id", (req, res) => {
  const sql = "DELETE FROM `artwork` WHERE ConstituentId =?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "SERVER ERROR" });
    return res.json(result);
  });
});

app.listen(8081, () => {
  console.log("Listening");
});

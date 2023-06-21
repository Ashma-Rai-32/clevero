import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// var http = require("http");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "artdb",
});

// ***********ARTIST X ARTWORK HTTP METHODS***********

app.get("/artistxartwork/", (req, res) => {
  // const sql =
  //   "SELECT * FROM `artistxartwork` artistxartworkObject right outer JOIN  `artist` artistObject on `ArtworkId`=? && artistxartworkObject.`ConstituentId`=artistObject.ConstituentId";

  const sql =
    "SELECT * FROM `artwork` LEFT JOIN `artistxartwork` ON `artwork`.ArtworkId = artistxartwork.ArtworkId LEFT JOIN artist ON `artistxartwork`.ConstituentId = artist.ConstituentId";

  const artworkId = req.params.artworkId;
  db.query(sql, [artworkId], (err, result) => {
    if (err) return res.json({ Message: "SERVER ERROR" });
    return res.json(result);
  });
});

app.get("/artistDropDownData/", (req, res) => {
  const sql = "SELECT `artist`.`ConstituentId`, `DisplayName` FROM `artist`";

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "SERVER ERROR" });
    return res.json(result);
  });
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
  const sql =
    "SELECT GROUP_CONCAT(artistobj.ConstituentId) as ConstituentIds, GROUP_CONCAT(artistobj.DisplayName) AS artistNames, GROUP_CONCAT(artistobj.Nationality) AS nationalities,artworkobj.* FROM artwork artworkobj LEFT JOIN artistxartwork axa ON artworkobj.artworkId = axa.artworkId LEFT JOIN artist artistobj ON axa.ConstituentId = artistobj.ConstituentId GROUP BY artworkobj.artworkId;";

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "SERVER ERROR" });
    return res.json(result);
  });
});

app.post("/artwork", (req, res) => {
  const sql =
    "INSERT INTO `artwork`(`Title`, `Date`, `Medium`, `Dimensions`, `CreditLine`, `AccessionNumber`, `Classification`, `Department`, `DateAcquired`, `SeatHeight`, `Catalogued`, `ObjectId`, `Url`, `ThumbnailUrl`, `Circumference`, `Depth`, `Diameter`, `Height`, `Length`, `Weight`, `Width`, `Duration`) VALUES (?)";
  const values = [
    req.body.title,
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

  const bridgeSql =
    "INSERT INTO `artistxartwork`(`ConstituentId`, `ArtworkId`) VALUES (?)";

  db.query(sql, [values], (artworkErr, artworkResult) => {
    if (artworkErr) {
      return res.json(artworkErr);
    }
    const artworkId = artworkResult.insertId;
    const bridgeValues = [req.body.constituentId, artworkId];
    db.query(bridgeSql, [bridgeValues], (bridgeErr, bridgeResult) => {
      if (bridgeErr) {
        return res.json(bridgeErr);
      }

      return res.json({
        artwork: artworkResult,
        bridge: bridgeResult,
      });
    });
  });
});

app.put("/artwork/:id", (req, res) => {
  const updateArtworkSql =
    "UPDATE `artwork` SET `Title`=?,`Date`=?,`Medium`=?,`Dimensions`=?,`CreditLine`=?,`AccessionNumber`=?,`Classification`=?,`Department`=?,`DateAcquired`=?,`SeatHeight`=?,`Catalogued`=?,`ObjectId`=?,`Url`=?,`ThumbnailUrl`=?,`Circumference`=?,`Depth`=?,`Diameter`=?,`Height`=?,`Length`=?,`Weight`=?,`Width`=?,`Duration`=? WHERE  `ArtworkId`=?";
  const id = req.params.id;
  const updateBridgeSql =
    "UPDATE `artistxartwork` set `ConstituentId`=? where `ArtworkId`=?";

  db.beginTransaction((err) => {
    if (err) {
      return res.json(err);
    }

    db.query(
      updateArtworkSql,
      [
        req.body.title,
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
        id,
      ],
      (artworkErr, artworkResult) => {
        if (artworkErr) {
          db.rollback(() => {
            return res.json(artworkErr);
          });
        }

        db.query(
          updateBridgeSql,
          [req.body.constituentId, id],
          (bridgeErr, bridgeResult) => {
            if (bridgeErr) {
              db.rollback(() => {
                return res.json(bridgeErr);
              });
            } else {
              db.commit((commitErr) => {
                if (commitErr)
                  db.rollback(() => {
                    return res.json(commitErr);
                  });
              });
              return res.json("SUCCESSFUL");
            }
          }
        );
      }
    );
  });
});

app.delete("/artwork/:id", (req, res) => {
  const id = req.params.id;
  if (id != undefined) {
    db.beginTransaction((err) => {
      if (err) {
        return res.json(err);
      }
      const deleteEntryOnBridgeSql =
        "DELETE FROM `artistxartwork` where ArtworkId=?";

      db.query(deleteEntryOnBridgeSql, [id], (err, resultBridge) => {
        if (err) {
          db.rollback(() => {
            return res.json(err);
          });
        }

        const deleteArtworkSql = "DELETE FROM `artwork` where ArtworkId=?";
        db.query(deleteArtworkSql, [id], (err, resultArtwork) => {
          if (err) {
            db.rollback(() => {
              return res.json(err);
            });
          } else return res.json("SUCCESSFUL");
        });
      });
    });
  } else return res.json("FAILED");
});

app.listen(8081, () => {
  console.log("Listening");
});

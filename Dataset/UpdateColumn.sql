UPDATE `artist` SET `DisplayName`=?,`ArtistBio`=?,`Nationality`=?,`Gender`=?,`BeginDate`=?,`EndDate`=?,`WikiQid`=?,`Ulan`=? WHERE ConstituentId=?

-- sql query example
UPDATE `artist` SET `DisplayName`='Doroteo Arnaiz',`ArtistBio`='Morrocon, born 1936',`Nationality`='Morrocon',`Gender`=1,`BeginDate`="1980-12-31T18:30:00.000Z",`EndDate`="2023-12-31T18:14:59.000Z",`WikiQid`= "Q1234",`Ulan`=null WHERE ConstituentId=2;
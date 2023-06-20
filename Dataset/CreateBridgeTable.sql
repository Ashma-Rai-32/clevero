CREATE TABLE artistXartwork
(ArtistArtworkId int unsigned not null AUTO_INCREMENT,
ConstituentId int not null,
ArtworkId int not null,
PRIMARY KEY (ArtistArtworkId)
);


-- fetch ConstituentId from table 
SELECT `ConstituentId` FROM `artistxartwork` WHERE `ArtworkId`=1;


-- display All items from both table by joining

SELECT * FROM `artwork` LEFT JOIN `artistxartwork` ON `artwork`.ArtworkId = artistxartwork.ArtworkId LEFT JOIN artist ON `artistxartwork`.ConstituentId = artist.ConstituentId;
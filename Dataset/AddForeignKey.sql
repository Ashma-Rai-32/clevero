alter table artwork 
add CONSTRAINT fk_Artwork_Artist
FOREIGN key (`ConstituentId`)
REFERENCES artist (`ConstituentId`)	
ON DELETE CASCADE
ON UPDATE SET NULL;

ALTER TABLE artistxartwork
ADD CONSTRAINT fk_artistxartwork_artist
FOREIGN KEY (`ConstituentId`)
REFERENCES artist (`ConstituentId`)
on UPDATE CASCADE
on DELETE CASCADE;

ALTER TABLE artistxartwork
ADD CONSTRAINT fk_artistxartwork_artwork
FOREIGN KEY (`ArtworkId`)
REFERENCES artwork (`ArtworkId`)
on UPDATE CASCADE
on DELETE CASCADE;
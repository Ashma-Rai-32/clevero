alter table artwork 
add CONSTRAINT fk_Artwork_Artist
FOREIGN key (`ConstituentId`)
REFERENCES artist (`ConstituentId`)	
ON DELETE CASCADE
ON UPDATE SET NULL;
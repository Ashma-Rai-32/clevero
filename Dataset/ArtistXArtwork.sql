SELECT 
GROUP_CONCAT(artistobj.DisplayName) AS artistNames,artworkobj.* 
    FROM artwork artworkobj
    LEFT JOIN artistxartwork axa ON artworkobj.artworkId = axa.artworkId
    LEFT JOIN artist artistobj ON axa.ConstituentId = artistobj.ConstituentId
    GROUP BY artworkobj.artworkId;
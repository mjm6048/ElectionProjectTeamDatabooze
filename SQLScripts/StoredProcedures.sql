
/* get usernames of society members */
CREATE OR REPLACE FUNCTION get_society_membernames(societyIDValue INT)
RETURNS TABLE (Username TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT us.username
    FROM user_society us
    JOIN users ON us.username = users.username
    WHERE users.roleID IN (1, 2);
END;
$$ LANGUAGE plpgsql;

/* get members of society */
CREATE OR REPLACE FUNCTION get_society_members(societyIDValue INT)
RETURNS TABLE ( Username TEXT,firstname TEXT, lastname TEXT, RoleID INT) AS $$
BEGIN
    RETURN QUERY
    SELECT users.username, users.firstname, users.lastname,users.roleID
    FROM get_society_membernames(societyIDValue) gsm
    JOIN users ON gsm.Username = uss.Username;
END;
$$ LANGUAGE plpgsql;

/*get active ballots of a society*/

CREATE OR REPLACE FUNCTION get_ballots_in_society(SocietyIDValue INT)
RETURNS TABLE (
    ballotID INT,
    ballotName varchar(50)
    -- Add other fields from the ballot table as needed
) AS $$
BEGIN
    RETURN QUERY
    SELECT b.ballotID, b.ballotName
    FROM ballots b
    JOIN society s ON b.SocietyID = s.SocietyID
    WHERE b.societyID = SocietyIDValue
    AND b.startDate <= CURRENT_DATE
    AND b.endDate >= CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

/*get active ballots of a society*/

CREATE OR REPLACE FUNCTION get_ballots_in_society(SocietyIDValue INT)
RETURNS TABLE (
    ballotID INT,
    ballotName varchar(50)
    -- Add other fields from the ballot table as needed
) AS $$
BEGIN
    RETURN QUERY
    SELECT b.ballotID, b.ballotName
    FROM ballots b
    JOIN society s ON b.SocietyID = s.SocietyID
    WHERE b.societyID = SocietyIDValue
    AND b.startDate <= CURRENT_DATE
    AND b.endDate >= CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

/* get ballotitems belonging to a ballot */
CREATE OR REPLACE FUNCTION get_items_in_ballot(BallotIDValue INT)
RETURNS TABLE (
    ID INT,
    Type BALLOTITEMTYPE
) AS $$
BEGIN
    RETURN QUERY
    SELECT itemID as ID, itemType as Type
    FROM BallotItem
    WHERE ballotID = BallotIDValue;
END;
$$ LANGUAGE plpgsql;
/* count votes */
CREATE OR REPLACE FUNCTION count_votes()
RETURNS TABLE (
    ID INT,
    voted varchar(50),
    highest_vote_count INT
) AS $$
BEGIN
RETURN QUERY
SELECT itemID as ID, votedFor, (CAST(COUNT(*) AS INT)) AS vote_count
FROM votes
GROUP BY itemID, votedFor 
ORDER BY itemID;
END;
$$ LANGUAGE plpgsql;

/* count max votes */
CREATE OR REPLACE FUNCTION highest_votes()
RETURNS TABLE (
    itemID INT,
    votedfor varchar(50),
    vote_count INT
) AS $$
BEGIN
RETURN QUERY
SELECT id as itemid, voted as votedfor, highest_vote_count as vote_count
FROM (
    SELECT id, voted, highest_vote_count,
           ROW_NUMBER() OVER (PARTITION BY id ORDER BY highest_vote_count DESC) AS row_num
    FROM count_votes()
) AS ranked
WHERE row_num = 1;
END;
$$ LANGUAGE plpgsql;

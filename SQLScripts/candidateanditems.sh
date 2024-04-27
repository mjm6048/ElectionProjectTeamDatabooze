# MemberID|FirstName|LastName|Username|SocietyID|Role
createDDL() {
    input="./candidates.psv"
    while IFS= read -r line
    do
        # SocietyID=$(echo $line | cut -d '|' -f 1)
        # SocietyName=$(echo $line | cut -d '|' -f 2)
        # SocietyDescription=$(echo $line | cut -d '|' -f 4)

        CandidateID=$(echo $line | cut -d '|' -f 1)
        ItemID=$(echo $line | cut -d '|' -f 2)
        BallotID=$(echo $line | cut -d '|' -f 3)
        ItemName=$(echo $line | cut -d '|' -f 4)
        MaxVotes=$(echo $line | cut -d '|' -f 5)
        firstname=$(echo $line | cut -d '|' -f 6)
        lastname=$(echo $line | cut -d '|' -f 7)
        title=$(echo $line | cut -d '|' -f 8)
        description=$(echo $line | cut -d '|' -f 9)
     
            echo "INSERT INTO BallotItem ('$ItemID', '$ItemName', 'position', '$MaxVotes', '$BallotID',10)" >> InsertBallotItemData.sql
            echo "INSERT INTO candidate ('$CandidateID', '$firstname','$lastname', '$title', '$description', 'https://www.google.com/imgres?q=cat&imgurl=https%3A%2F%2Fcdn.britannica.com%2F70%2F234870-050-D4D024BB%2FOrange-colored-cat-yawns-displaying-teeth.jpg&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Fanimal%2Fcat&docid=Bvzzy2OOLWm60M&tbnid=zWdzdPdo-A-wdM&vet=12ahUKEwjq9cSs_quFAxWtjIkEHXL9COsQM3oECHAQAA..i&w=1600&h=1146&hcb=2&ved=2ahUKEwjq9cSs_quFAxWtjIkEHXL9COsQM3oECHAQAA')" >> InsertCandidateData.sql
            echo "INSERT INTO candidate_items('$CandidateID','$ItemID') >> InsertCandidateItems.sql

    
    done < "$input"

    
}

createDDL
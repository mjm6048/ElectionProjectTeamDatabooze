createDDL() {
    voteID=0
    input="./votes.psv"
    cat members.psv | cut -d '|' -f 4 | grep -v "Username" | uniq > uniqUsernames.txt
    while IFS= read -r line
    do
        voteID=$(($voteID+1))
        MemberID=$(echo $line | cut -d '|' -f 1)
        BallotID=$(echo $line | cut -d '|' -f 2)
        OfficeID=$(echo $line | cut -d '|' -f 3)
        CandidateID=$(echo $line | cut -d '|' -f 4)
        echo "INSERT INTO votes (voteID, votes, username) VALUES ($voteID, JSON, $username) >> InsertData.sql"
    done < "$input"
    
}

createDDL
#Member ID|Ballot ID|Office ID|Candidate ID
#INSERT INTO society (societyID, societyName, societyDescription) VALUES (1, 'American Medical Association', 'Medicine');
#voteID int
#votes JSON
#username varchar
#{
#     "VoteType": "initative",
#     "VotedFor": "yes",
#     "BallotID": 5
# }
#{
#     "VoteType": "ballot",
#     "VotedFor": "candidateID",
#     "BallotID": 17
#}

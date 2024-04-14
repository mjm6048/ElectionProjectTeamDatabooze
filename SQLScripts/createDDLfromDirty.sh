# MemberID|FirstName|LastName|Username|SocietyID|Role
createDDL() {
    input="./tempfile.txt"
    cat members.psv | uniq > tempfile.txt
    while IFS= read -r line
    do
        # SocietyID=$(echo $line | cut -d '|' -f 1)
        # SocietyName=$(echo $line | cut -d '|' -f 2)
        # SocietyDescription=$(echo $line | cut -d '|' -f 4)
        # echo $line
        MemberID=$(echo $line | cut -d '|' -f 1)
        FirstName=$(echo $line | cut -d '|' -f 2)
        LastName=$(echo $line | cut -d '|' -f 3)
        Username=$(echo $line | cut -d '|' -f 4)
        SocietyID=$(echo $line | cut -d '|' -f 5)
        Role=$(echo $line | cut -d '|' -f 6)
        # echo "INSERT INTO society ($SocietyID, '$SocietyName', '$SocietyDescription')" >> InsertData.sql
        # SocietyMembers=$(grep "$ScoietyID" members.psv)
        # echo "member:\n $SocietyMembers \n"
        # for MEMBER in $SocietyMembers
        # do
            # MemberID=$(grep "$ScoietyID" members.psv | cut -d '|' -f 1)
            # FirstName=$(grep "$ScoietyID" members.psv | cut -d '|' -f 2)
            # LastName=$(grep "$ScoietyID" members.psv | cut -d '|' -f 3)
            # Username=$(grep "$ScoietyID" members.psv | cut -d '|' -f 4)
            # SocietyID=$(grep "$ScoietyID" members.psv | cut -d '|' -f 5)
            # Role=$(grep "$ScoietyID" members.psv | cut -d '|' -f 6)
            # echo "INSERT INTO users ('$Username', '$FirstName', '$LastName', '7c8c067cf46835b89fb83f6e9f1faab5bfadabd658aba621d7ecd6b36534d6f8', 1)" >> InsertData.sql
            echo "INSERT INTO users_society ('username', 'societyID') VALUES ('$Username', '$SocietyID')" >> InsertUser_societyData.sql
        # done
        # 
        # echo "MemberID: $MemberID"
        # 
        # echo "FirstName: $FirstName"
        # 
        # echo "LastName: $LastName"
        # 
        # echo "Username: $Username"
        # 
        # echo "SocietyID: $SocietyID"
        # 
        # echo "INSERT INTO users ('$Username', '$FirstName', '$LastName', passwordHash, 1)" 
    done < "$input"
    
}

createDDL
#members file
#memberID, firstname, lastname, username, societyID, role
#users table 
#username, firstname, lastname, passwordhash, roleID

# society table
# societyID, societyName, societyDescription
# INSERT INTO society (societyID, societyName, societyDescription) 
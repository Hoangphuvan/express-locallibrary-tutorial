Git info:

    echo "# express-locallibrary-tutorial" >> README.md
    git init
    git add README.md
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/Hoangphuvan/express-locallibrary-tutorial.git
    git push -u origin main

    git remote add origin https://github.com/Hoangphuvan/express-locallibrary-tutorial.git
    git branch -M main
    git push -u origin main

Note: using personal access tokens in ubuntu

How to run the app:

    npm run start_linux if run on linux os
    npm run run_windows_command_prompt if run on windows os

certs folder contain ssl for sakedev.com domain
Link to generate ssl for free. expired day: Feb 24, 2025

Curl test:
Create genre:
example curl -X POST https://sakedev.com/local-library/genre/create -d "name=Hoang"

curl -X POST https://sakedev.com/local-library/author/create -d "first_name=hoang&family_name=hoàng đẹp trai&date_of_birth=2024-03-12&date_of_death=2024-03-12"

Postman test:

POST:
https://sakedev.com/local-library/author/create
body->raw ->json
{
"first_name":"hoang",
"family_name": "hoàng đẹp trai",
"date_of_birth":"2024-03-12",
"date_of_death":"2024-03-12"
}

- create user for mongodb

db.createUser(
{
user: "hoang",
pwd: passwordPrompt(),
roles: [ { role: "readWriteAnyDatabase", db: "admin" },
{ role: "dbAdminAnyDatabase", db: "admin" }]
}
)

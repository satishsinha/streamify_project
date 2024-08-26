docker build -t streamify_frontend:local .

docker run -d --name streamify_frontend_local -p 3001:3000 -v /Applications/Dic_projects/projects/streamify_project/frontend:/app -v /app/node_modules streamify_frontend:local

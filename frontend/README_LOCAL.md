docker build -t streamify_frontend:latest .

docker run -d --name streamify_frontend -p 3001:3000 -v /Applications/Dic_projects/projects/streamify:/app -v /app/node_modules streamify_frontend:latest

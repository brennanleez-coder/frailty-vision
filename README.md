git pull origin main

docker build --no-cache -t frailty-vision .

docker tag frailty-vision brennanlee/frailty-vision:latest

docker push brennanlee/frailty-vision:latest

docker run -d -p 8080:80 --name frailty-vision-fe frailty-vision  

echo "Docker image updated and pushed to Docker Hub successfully."



docker build --no-cache -t frailty-vision . && docker tag frailty-vision brennanlee/frailty-vision:latest && docker push brennanlee/frailty-vision:latest && docker run -d -p 8080:80 --name frailty-vision-fe frailty-vision

docker exec -it <container_name_or_id> /bin/sh

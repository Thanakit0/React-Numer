#select docker image
FROM node:latest

#RUN apt-get update && apt-get install -y nodejs npm

WORKDIR ./app

COPY . .

RUN npm install

COPY package.json ./

EXPOSE 3000
#EXPOSE 80
# เป็นการให้ Docker สร้าง environment ที่ติดตั้ง php apache version 7 ไว้ให้เรา
# และตอนที่เริ่มสร้าง Container มันจะ copy ไฟล์ทุกอย่างใน folder นี้ไปไว้ใน var/www/html ที่อยู่ใน container 
# และสุดท้ายเราเปิด port 80 เพื่อให้เราเข้าเว็บได้

CMD [ "npm", "start" ]
FROM node:16

# Instala cron
RUN apt-get update && apt-get install -y cron

# Crea directorio de trabajo
WORKDIR /usr/src/app

# Copia y configura el proyecto
COPY package*.json ./
RUN npm install
COPY . .

# Copia y habilita la configuración del cron
COPY crontab /etc/cron.d/app-cron
RUN chmod 0644 /etc/cron.d/app-cron && crontab /etc/cron.d/app-cron

# Asegura que los logs se redirigen
RUN touch /var/log/cron.log

CMD cron && tail -f /var/log/cron.log

# Use a imagem oficial do Apache
FROM httpd:2.4

# Metadados opcionais
LABEL authors="Tiago"

# Copia os arquivos estáticos para o diretório padrão do Apache
COPY ./web /usr/local/apache2/htdocs/web

# Expõe a porta padrão do Apache
EXPOSE 80

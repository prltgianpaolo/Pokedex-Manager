
# Pokedex Manager




## Descrizione del progetto
Pokedex Manager è una web-app che consente agli utenti di esplorare e gestire un database di Pokémon. Gli utenti possono:



 - Visualizzare informazioni dettagliate sui Pokémon, comprese statistiche, evoluzioni e pre-evoluzioni.
 - Creare una collezione personale aggiungendo e rimuovendo Pokémon.
 - Effettuare ricerche e filtrare Pokémon per nome, tipo e generazione.

La web-app offre un'interfaccia moderna e interattiva per migliorare l'esperienza utente.
## Tecnologie Utilizzate

**Frontend:** React.js, TailwindCSS, Bootstrap

**Backend:** Spring Boot (Java)

**Database:** MySQL

**Autenticazione:** WT (JSON Web Tokens)

**Librerie Aggiuntive:** Axios (per le richieste HTTP),
React Router (per la navigazione)

**Versionamento:** Git e GitHub


## Istruzioni per Avviare il Progetto Localmente

Assicurati di avere installato:

- Node.js (Versione >= 14)
- Java (Versione >= 17)
- Maven
- MySQL
- Git


**Passaggi per il Frontend:**

1. Clona il repository:

```bash
git clone <repository_url>
cd frontend

```
2. Installa le dipendenze:
```bash
npm install

```
3. Avvia il frontend:
```bash
npm start

```
Il progetto sarà disponibile su http://localhost:3000.

**Passaggi per il Backend**

1. Configura il database:
- Crea un database MySQL chiamato **pokedex_manager**.
- Importa il file SQL per il dump iniziale dei dati.
```bash
CREATE DATABASE pokedex_manager;
USE pokedex_manager;
-- Esegui il dump SQL fornito

```
2. Configura il file **application.properties**: Modifica il file nella directory **backend/src/main/resources/application.properties** per includere le credenziali del database:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/pokedex_manager
spring.datasource.username=<your_db_username>
spring.datasource.password=<your_db_password>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
jwt.secret=<your_jwt_secret>

```
3. Avvia il backend: Dalla directory backend, esegui:
```bash
mvn spring-boot:run

```
Il backend sarà disponibile su http://localhost:8080.
## Testare il Progetto

- Apri il browser e vai su http://localhost:3000.
- Registra un nuovo utente e accedi.
- Naviga tra le funzionalità:
    - Visualizza la lista dei Pokémon.
    - Aggiungi e rimuovi Pokémon dalla tua collezione.
    - Visualizza le informazioni dettagliate di ogni                        Pokémon, comprese evoluzioni e pre-evoluzioni.


## Conclusione

Grazie per aver utilizzato Pokedex Manager! Se hai suggerimenti o riscontri problemi, non esitare a creare una issue nel repository GitHub. 😊


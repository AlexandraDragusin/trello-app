# Assigment IAS - Alello - Trello Clone

Nume student: Dragusin Daniela-Alexandra

Grupa: MTI1A

## Link-uri
**URL aplicatie** [https://trello-app-dun.vercel.app](https://trello-app-dun.vercel.app)

**Link github** [https://github.com/AlexandraDragusin/trello-app](https://github.com/AlexandraDragusin/trello-app)

## Functionalitati implementate

### Colectie de board-uri
- **Vizualizare grid** - Pagina principala afiseaza toate board-urile intr-un layout grid responsive (app/page.js, app/HomeClient.js)
- **Creare board nou** - Formular pentru adaugare board cu nume personalizat (app/HomeClient.js - addBoard functie)
- **Editare nume board** - Editare in-place a titlurilor board-urilor (app/BoardCard.js - mod editare)
- **Stergere board-uri** - Eliminare board-uri cu confirmare (app/HomeClient.js - deleteBoard functie)
- **Navigare board** - Click pe board pentru a deschide si vizualiza continutul (app/BoardCard.js - Link component)

### Liste de card-uri
- **Coloane liste** - Afisare liste ca coloane verticale in interiorul board-ului (components/board/BoardLists.js)
- **Creare liste** - Adaugare liste noi in board-uri cu nume personalizat (components/board/BoardHeader.js)
- **Editare nume liste** - Modificare titlurile listelor direct in interfata (components/board/List.js - mod editare)
- **Stergere liste** - Eliminare liste cu toate card-urile continute (components/board/List.js - buton delete)
- **Gestionare card-uri** - Adaugare, editare si stergere card-uri in liste (components/board/List.js - functii card)

### Continut card-uri
- **Creare card** - Adaugare card-uri cu titlu si descriere in liste (components/board/List.js - formular add card)
- **Modal card** - Vizualizare detaliata cu intreg continutul card-ului (components/board/CardModal.js)
- **Editare inline** - Editare titluri si descrieri de card-uri direct in modal (components/board/CardModal.js - input fields)
- **Stergere card-uri** - Eliminare card-uri cu confirmare din modal (components/board/CardModal.js - buton delete)
- **Design responsive** - Functioneaza pe dispozitive desktop si mobile (Tailwind CSS classes)

### Deployment aplicatie
- Platforma: Vercel
- Baza de date: MongoDB Atlas
- CI/CD: Deployment-uri automate de pe GitHub
- Mediu: Gata pentru productie cu variabile de mediu

## Stack tehnologic

### Tehnologii obligatorii
- Frontend/Backend: Next.js 16.0.1 cu React 18
- Framework: App Router cu componente Server si Client

### Tehnologii recomandate
- Baza de date: MongoDB cu Mongoose ODM
- Styling: Tailwind CSS
- Componente UI: Librarie componente personalizate (Button, Input, Modal create de la zero)
- Deployment: Vercel

### Tehnologii aditionale
- Gestionare stare: React useState si useEffect hooks
- Rute API: Rute Next.js API pentru operatii backend
- Modelare baza de date: Scheme Mongoose pentru board-uri, liste si card-uri
- GitHub Actions: CI/CD pentru deploy automat


## Structura Proiect
```
trello-app/
├── app/
│ ├── api/
│ │ ├── boards/
│ │ └── boards/[id]/
│ ├── board/[id]/
│ ├── page.js
│ └── layout.js
├── components/
│ ├── board/
│ │ ├── BoardHeader.js
│ │ ├── BoardLists.js
│ │ ├── CardItem.js
│ │ ├── CardModal.js
│ │ └── List.js
│ └── ui/
│ ├── Button.js
│ ├── Input.js
│ └── Modal.js
├── lib/
│ ├── mongodb.js
│ └── mongoUtils.js
├── models/
│ └── Board.js
└── public/
```

### Componente Principale
- **app/page.js** - Pagina principala cu lista board-urilor
- **app/HomeClient.js** - Client component pentru gestionarea board-urilor
- **app/board/[id]/page.js** - Pagina individuala pentru fiecare board
- **app/BoardCard.js** - Componenta pentru afisarea unui board in grid

### API Routes
- **app/api/boards/route.js** - Endpoint pentru operatii pe colectia de board-uri (GET, POST)
- **app/api/boards/[id]/route.js** - Endpoint pentru operatii pe un board specific (GET, PATCH, DELETE)

### Componente Board
- **components/board/BoardHeader.js** - Header board cu formular adaugare lista
- **components/board/BoardLists.js** - Container pentru toate listele unui board
- **components/board/List.js** - Componenta individuala pentru o lista
- **components/board/CardItem.js** - Componenta pentru afisarea unui card in lista
- **components/board/CardModal.js** - Modal pentru editarea detaliata a unui card

### Utilitare
- **lib/mongodb.js** - Configurare conexiune MongoDB
- **lib/mongoUtils.js** - Functii pentru transformarea datelor din MongoDB
- **models/Board.js** - Schema Mongoose pentru board-uri

## Model Date

### Schema Board
```
{
  name: String,
  lists: [ListSchema]
}
```

### Schema Lista
```
{
  _id: String,
  name: String,
  cards: [CardSchema]
}
```

### Schema Card
```
{
  _id: String,
  title: String,
  description: String
}
```

## Challenge-uri tehnice si solutii

- **Gestionarea ID-urilor in MongoDB**  
  *Problema:* MongoDB asteapta ObjectId pentru campul `_id`, dar frontend-ul genera string-uri  
  *Solutie:* Am folosit `strict: false` in schema Mongoose si `_id: String` pentru a accepta string IDs

- **Sincronizarea datelor intre server si client**  
  *Problema:* Datele nu se actualizau in timp real intre componente  
  *Solutie:* Am implementat re-fetch automat dupa fiecare operatie CRUD si state management local

- **Conexiune la baza de date pe Vercel**  
  *Problema:* Configurarea conexiunii MongoDB in mediu de productie  
  *Solutie:* Am folosit MongoDB Atlas cu IP whitelist pentru `0.0.0.0/0` si environment variables pe Vercel


## Instalare si rulare locala

1. **Cloneaza repository-ul**
   ```
   git clone https://github.com/AlexandraDragusin/trello-app.git
   cd trello-app
   ```
2. **Instaleaza dependintele**
	```
	npm install
	```
3. **Configureaza variabilele de mediu**

	Creeaza un fisier .env.local in radacina proiectului:
	```
	MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trello-app
	```
4. **Porneste aplicatia in modul de dezvoltare**
	```
	npm run dev
	```
	Aplicatia va fi disponibila la http://localhost:3000
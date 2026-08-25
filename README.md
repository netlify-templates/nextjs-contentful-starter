# Rappuarvio

Rappuarvio on suomalainen arvostelualusta kerrostaloille – vähän kuin Google Reviews,
mutta kerrostaloille. Nykyiset ja entiset asukkaat arvioivat taloja klikkaamalla
tähtiä muutamassa kategoriassa (äänieristys, rauhallisuus, ympäristö, kunnossapito,
turvallisuus, liikenneyhteydet) ja voivat halutessaan jättää myös kirjallisen
arvion. Käyttäjät voivat hakea taloja osoitteella, postinumerolla tai kaupungilla, ja
ehdottaa uusia taloja lisättäväksi. Moderaattori tarkistaa ja hyväksyy/hylkää kaikki
uudet talo-ehdotukset ennen julkaisua, ja järjestelmä estää saman talon lisäämisen
kahteen kertaan.

## Tekninen toteutus

- **Next.js 15** (App Router) + React 18, Tailwind CSS 4
- **PostgreSQL** + **Prisma ORM** tietovarastona
- **NextAuth** (credentials-kirjautuminen, bcrypt-salasanat, roolit `USER`/`ADMIN`)

## Ominaisuudet

- 🔍 Haku osoitteella / postinumerolla / kaupungilla, esim. "Sihtikuja 1, 90520, Oulu"
- ⭐ Arvostelu klikkaamalla 1–5 tähteä kuudessa kategoriassa + vapaaehtoiset
  kysymykset "Mikä oli hyvää", "Mikä oli huonoa" ja vapaa kommentti
- 🏠 Käyttäjät voivat ehdottaa puuttuvaa taloa – järjestelmä estää kaksoiskappaleet
  osoitteen/postinumeron/kaupungin perusteella
- 🛠️ Moderointinäkymä (`/admin`), jossa admin voi muokata tietoja ja
  hyväksyä/hylätä ehdotukset ennen julkaisua
- 👤 Yksi arvostelu käyttäjää kohden per talo (voi päivittää myöhemmin)

## Kehitysympäristön käyttöönotto

### 1. Riippuvuudet

```bash
npm install
```

### 2. Tietokanta

Luo Postgres-tietokanta ja aseta yhteysosoite `.env`-tiedostoon (katso
`.env.example`):

```bash
cp .env.example .env
# muokkaa DATABASE_URL, NEXTAUTH_SECRET
```

Aja migraatiot ja (valinnaisesti) täytä esimerkkidatalla:

```bash
npx prisma migrate dev
npm run db:seed
```

Siemendata luo ylläpitäjätunnuksen `admin@rappuarvio.fi` / `AdminSalasana123`,
kaksi esimerkkikäyttäjää sekä muutaman esimerkkitalon (yksi odottaa moderointia
`/admin`-näkymässä).

### 3. Kehityspalvelin

```bash
npm run dev
```

Sovellus löytyy osoitteesta [localhost:3000](http://localhost:3000).

## Tuotantoon vienti

`DATABASE_URL` tulee osoittaa oikeaan, pysyvään Postgres-tietokantaan (esim. Neon,
Supabase, Railway tai RDS) – paikallinen SQLite/tiedostopohjainen tietokanta ei
toimi serverless-ympäristöissä (esim. Netlify Functions), koska tiedostojärjestelmä
ei säily kutsujen välillä. Aseta myös tuotanto-`NEXTAUTH_SECRET` (esim.
`openssl rand -base64 32`) ja `NEXTAUTH_URL` sivuston osoitteeksi.

```bash
npm run build
npm run start
```

## Tietomalli

- `User` – käyttäjät, rooli `USER` tai `ADMIN`
- `Building` – kerrostalo: osoite, postinumero, kaupunki, tila
  (`PENDING`/`APPROVED`/`REJECTED`), sekä uniikki normalisoitu avain, joka estää
  kaksoiskappaleet
- `Review` – yhden käyttäjän arvostelu yhdestä talosta: kuusi 1–5-tähden
  kategoria-arvosanaa sekä vapaaehtoiset tekstikentät

-- Eliminazione del database esistente se presente
DROP DATABASE IF EXISTS animewave_db;

-- Creazione del database
CREATE DATABASE animewave_db;

-- Selezione del database da utilizzare
USE animewave_db;

-- Creazione della tabella 'users'
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    is_admin TINYINT(1) DEFAULT 0
);

-- Creazione della tabella 'studios'
CREATE TABLE studios (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Creazione della tabella 'types' con nome come chiave primaria
CREATE TABLE types (
    name VARCHAR(100) PRIMARY KEY NOT NULL
);

-- Creazione della tabella 'series'
CREATE TABLE series (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    alternative_title varchar(255) NOT NULL,
    release_date DATE NOT NULL,
    image_src VARCHAR(255) NOT NULL,
    studio_id INT NOT NULL,
    type_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL,
    previous_season INT NOT NULL DEFAULT 0,
    FOREIGN KEY (studio_id) REFERENCES studios(id),
    FOREIGN KEY (type_name) REFERENCES types(name)
);

-- Creazione della tabella 'episodes'
CREATE TABLE episodes (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    video_src VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,
    episode_number INT NOT NULL,
    series_id INT NOT NULL,
    FOREIGN KEY (series_id) REFERENCES series(id) ON DELETE CASCADE
);

-- Creazione della tabella 'genres'
CREATE TABLE genres (
    name VARCHAR(255) PRIMARY KEY NOT NULL
);

-- Creazione della tabella di associazione tra 'series' e 'genres'
CREATE TABLE series_has_genres (
    series_id INT NOT NULL,
    genre_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (series_id) REFERENCES series(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_name) REFERENCES genres(name) ON DELETE CASCADE,
    PRIMARY KEY (series_id, genre_name)
);

-- Creazione della tabella 'history'
CREATE TABLE history (
	series_id INT NOT NULL,
    user_id INT NOT NULL,
    watch_date DATETIME NOT NULL,
    FOREIGN KEY (series_id) REFERENCES series(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (series_id, user_id)
);

-- Creazione della tabella 'favorite'
CREATE TABLE favorite (
	series_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (series_id) REFERENCES series(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (series_id, user_id)
);

-- Creazione della tabella 'collections'
CREATE TABLE collections (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    color VARCHAR(20) NOT NULL,
    description TEXT DEFAULT "",
    last_update DATE NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Creazione della tabella di associazione tra 'collections' e 'series'
CREATE TABLE collections_has_series (
    collections_id INT NOT NULL,
    series_id INT NOT NULL,
    PRIMARY KEY (collections_id, series_id),
    FOREIGN KEY (collections_id) REFERENCES collections(id) ON DELETE CASCADE,
    FOREIGN KEY (series_id) REFERENCES series(id) ON DELETE CASCADE
);

-- Inserimento dati nella tabella 'users'
INSERT INTO users (username, name, surname, email, password, phone_number, description, is_admin) VALUES 
('JohnDoe_17', 'John', 'Doe', 'john.doe@gmail.com', 'd3b540e5444dcc607c61855eacb9cdfd16c7e06a02a4b80d067b114db8fd25ef', '+41791082989', 'Professional watcher', false),
('TheNicoGamer_13', 'Nicolas', 'Ghiggi', 'nicolas.ghiggi@gmail.com', 'd3b540e5444dcc607c61855eacb9cdfd16c7e06a02a4b80d067b114db8fd25ef', '+41791082989', 'Professional sleeper', false);
INSERT INTO users (username, name, surname, email, password, phone_number, description, is_admin) VALUES 
('Administrator', 'admin', 'first', 'admin.first@gmail.com', 'd3b540e5444dcc607c61855eacb9cdfd16c7e06a02a4b80d067b114db8fd25ef', '+41791082989', 'Professional drunk', true);

-- Inserimento dati nelle tabelle 'studios' e 'types'
INSERT INTO studios (name) VALUES ('MADHOUSE'), ('Studio Pierrot'), ('A-1 Pictures'), ('Studio Bind'), ('Sunrise'), ('Kyoto Animation'), ('Bones');
INSERT INTO studios (name) VALUES ('Actas'), ('Bandai Namco Pictures');
INSERT INTO types (name) VALUES ('TV'), ('TV Short'), ('OVA'), ('ONA'), ('Special'), ('Movie');

-- Inserimento dati nella tabella 'series'
INSERT INTO series (id, title, alternative_title, release_date, image_src, studio_id, type_name, description, status) VALUES
(1, 'Death Note', 'Death Note', '2006-10-04', 'death_note.jpg', 1, 'TV', 'Death Note è una serie anime che racconta la storia di Light Yagami, uno studente che trova un taccuino soprannaturale con il potere di uccidere chiunque il cui nome venga scritto al suo interno. Deciso a creare un mondo senza crimine, Light utilizza il Death Note per raggiungere il suo obiettivo, attirando l\'attenzione di un misterioso detective noto come L.', 'finished'),
(2, 'Tokyo Ghoul', 'Tokyo Ghoul', '2014-04-08', 'tokyo_ghoul.jpg', 2, 'TV', 'Tokyo Ghoul segue la storia di Ken Kaneki, uno studente universitario che diventa metà ghoul dopo un\'operazione salvavita. Con la sua nuova identità, Kaneki deve affrontare le sfide di una vita da ghoul e le tensioni tra esseri umani e ghoul.', 'finished'),
(3, 'Sword Art Online', 'Sword Art Online', '2012-07-08', 'sword_art_online.jpg', 3, 'TV', 'Sword Art Online narra le avventure di Kirito, un giocatore intrappolato in un MMORPG virtuale in cui la morte nel gioco significa morte nella vita reale. Kirito deve combattere per sopravvivere e trovare una via d\'uscita, mentre sviluppa relazioni con altri giocatori.', 'finished'),
(4, 'Mushoku Tensei: Jobless Reincarnation', 'Mushoku Tensei: Isekai Ittara Honki Dasu', '2021-01-11', 'mushoku_tensei.jpg', 4, 'TV', 'Un neet trentaquattrenne viene ucciso in un incidente stradale e si ritrova catapultato in un mondo magico. Invece di svegliarsi come un mago adulto, egli viene reincarnato in un bambino appena nato, conservando i ricordi della sua vita passata. Prima che possa muovere correttamente il proprio corpo, egli decide che non farà più gli stessi errori che ha compiuto nella sua prima vita e che, invece, vivrà senza rimpianti la nuova vita che gli è stata concessa. Dato che ha la conoscenza di un uomo di mezza età, all\'età di due anni è già diventato un prodigio e possiede poteri impensabili per chiunque sia suo coetaneo e anche più grande di lui. Iniziano così le cronache di Rudeus Greyrat, figlio dello spadaccino Paul e della guaritrice Zenith, che è entrato in un nuovo mondo per diventare il mago più forte di tutti i tempi, con poteri che rivaleggiano con quelli degli dei.', 'finished'),
(5, 'Code Geass: Lelouch of the Rebellion', 'Code Geass: Hangyaku no Lelouch', '2006-10-06', 'code_geass_lelouch_of_the_rebellion.jpg', 5, 'TV', 'Il 10 Agosto del 2010, il nuovo impero di britannia (la quale detiene più di un terzo del territorio mondiale) dichiara guerra al giappone... Con questa frase inizia questo anime, dotato di grosse potenzialità già vedendo il primo episodio. Finita la guerra e voltasi in favore della Britannia il giappone non avrà più un nome, non avrà più uno stato indipendente e sarà "dominato" dalle leggi della britannia. Il Giappone denominato Area 11 ed i suoi cittadini chiamati eleven saranno discriminati e sottomessi al volere dei britanni. Scuole per soli eleven, pochissime possibilità di integrarsi nella società a parte lo svolgere lavori umili di manovalanza e servitù. Essi possono essere trattati come bestie o addirittura essere uccisi per ragioni di poco conto. Nel vecchio quartiere di Shinjuku c\'è una banda di ribelli (considerati terroristi dai britanni) che combatte per riconquistare l\'indipendenza del giappone e per riavere i diritti umani e quel nome "nippon" per la propria nazione che tanto desiderano (nel corso dell\'anime vedremo che ci saranno più gruppi di questo tipo anche se appartenenti a diverse fazioni). Proprio nel momento di un\'azione condotta dai ribelli, Lelouch (che scopriremo sarà uno dei, se non IL protagonista) si troverà coinvolto in questa operazione con tutte le vicissitudini del caso. Lelouch prima della guerra era uno dei principi di Britannia che sembra aver perso la madre in un attentato nel quale la sorella è rimasta cieca e paralitica. Tutto questo Lelouch lo attribusce alla britannia che ha attaccato il giappone nonostante sapesse che i loro principini fossero li (ospiti del 1° ministro del giappone) e senza preoccuparsi delle loro vite. In quel preciso istante Lelouch decise di distruggere la britannia. Da allora sono passati 7 anni e... Nell\'operazione terroristica di cui accennavo poco più su, da una strana ragazza (C.C. che si pronuncia Scizu e che scopriremo avrà un ruolo fondamentale nell\'anime) Lelouch otterrà un potere tramite il quale, forse, potrà avverare quella promessa fatta sette anni prima. Da quì in poi si troverà in azioni condotte dai ribelli per poi diventare... La vera speranza per riportare il giappone a ciò che era un tempo: ZERO il capo nonchè stratega dei ribelli.', 'finished'),
(6, 'A Silent Voice', 'Koe no Katachi', '2016-09-17', 'a_silent_voice.jpg', 6, 'Movie', 'La storia racconta dell\'incontro tra due bambini: Shouya Ishida, un ragazzino molto vivace e Shouko Nishimiya, una bambina sorda. Inizialmente le cose tra i due non vanno bene poiché Shouya si diverte a prendere in giro Shouko e a maltrattarla per il suo handicap. Il loro rapporto però non è così semplice ed entrambi si ritroveranno, nel corso degli anni, ad attraversare parecchie difficoltà.', 'finished'),
(7, 'Josee, the Tiger and the Fish', 'Josee to Tora to Sakana-tachi', '2020-12-25', 'josee_to_tora_to_Sakana-tachi.jpg', 7, 'Movie', 'Lo studente universitario Tsuneo una mattina incontra una vecchia che spinge una enorme carrozzina: dentro c’è Kimiko, una ragazza colpita da paralisi cerebrale incapace di muovere le gambe. Tsuneo finisce per seguirle nella squallida abitazione che condividono, e nonostante il guscio in cui Kimiko sembra essersi rinchiusa, comincerà a farsi vivo sempre più spesso.', 'finished'),
(8, 'Lycoris Recoil', 'Lycoris Recoil', '2022-07-02', 'lycoris_recoil.jpg', 3, 'TV', '"LycoReco” è una caffetteria dall\'aspetto tradizionale giapponese situata nel centro di Tokyo. Ma lo squisito caffè e i dolci non sono le uniche cose che è possibile ordinare in loco! Dalla consegna di pacchi, ai ritiri e consegne nelle strade isolate di notte fino allo sterminio di zombi e mostri giganti…?! "Qualsiasi problema tu abbia, siamo qui per aiutarti! Risolveremo ogni genere di problema tu abbia!", questo è il motto di Chisato Nishikigi e Takina Inoue, le due ragazze protagoniste della serie che lavorano in questo bar così particolare.', 'finished'),
(9, 'Wistoria: Wand and Sword', 'Tsue to Tsurugi no Wistoria', '2024-07-07', 'wistoria_wand_and_sword.jpg', 9/* Corretto da 8-9*/, 'TV', 'Per mantenere una promessa fatta da bambino, Will Serfort sogna di diventare un Magia Vander, titolo che possono ricevere solo i maghi più potenti assieme al diritto di sedersi in cima alla Torre del mago. Tuttavia lui non possiede un briciolo di magia e non riesce a lanciare nemmeno il più semplice degli incantesimi. La sua vita appena iniziata l\'accademia di magia non sembra delle migliori: per guadagnare crediti deve abbattere più mostri possibili nei dungeon, ed è presente un professore che lo tratta con prepotenza a causa della sua condizione. Ma Will possiede una spada che solamente all\'apparenza è normale... che sia questa la chiave per riuscire a sbloccare il suo vero potenziale?', 'in progress');
INSERT INTO favorite (series_id, user_id) VALUES (1, 2), (2, 2), (3, 2), (4, 2), (5, 2), (6, 2), (7, 2), (8, 2), (9, 2);

-- Inserimento dati nella tabella 'episodes'
INSERT INTO episodes (video_src, series_id, release_date, episode_number) VALUES
-- Death Note
('death_note_ep1.mp4', 1, now(), 1),
('death_note_ep2.mp4', 1, now(), 2),
('death_note_ep3.mp4', 1, now(), 3),
('death_note_ep4.mp4', 1, now(), 4),
('death_note_ep5.mp4', 1, now(), 5),
('death_note_ep6.mp4', 1, now(), 6),
('death_note_ep7.mp4', 1, now(), 7),
('death_note_ep8.mp4', 1, now(), 8),
('death_note_ep9.mp4', 1, now(), 9),
('death_note_ep10.mp4', 1, now(), 10),
('death_note_ep11.mp4', 1, now(), 11),
('death_note_ep12.mp4', 1, now(), 12),
('death_note_ep13.mp4', 1, now(), 13),
('death_note_ep14.mp4', 1, now(), 14),
('death_note_ep15.mp4', 1, now(), 15),
('death_note_ep16.mp4', 1, now(), 16),
('death_note_ep17.mp4', 1, now(), 17),
('death_note_ep18.mp4', 1, now(), 18),
('death_note_ep19.mp4', 1, now(), 19),
('death_note_ep20.mp4', 1, now(), 20),
('death_note_ep21.mp4', 1, now(), 21),
('death_note_ep22.mp4', 1, now(), 22),
('death_note_ep23.mp4', 1, now(), 23),
('death_note_ep24.mp4', 1, now(), 24),
('death_note_ep25.mp4', 1, now(), 25),
('death_note_ep26.mp4', 1, now(), 26),
('death_note_ep27.mp4', 1, now(), 27),
('death_note_ep28.mp4', 1, now(), 28),
('death_note_ep29.mp4', 1, now(), 29),
('death_note_ep30.mp4', 1, now(), 30),
('death_note_ep31.mp4', 1, now(), 31),
('death_note_ep32.mp4', 1, now(), 32),
('death_note_ep33.mp4', 1, now(), 33),
('death_note_ep34.mp4', 1, now(), 34),
('death_note_ep35.mp4', 1, now(), 35),
('death_note_ep36.mp4', 1, now(), 36),
('death_note_ep37.mp4', 1, now(), 37);
INSERT INTO episodes (video_src, series_id, release_date, episode_number) VALUES
-- Tokyo Ghoul
('tokyo_ghoul_ep1.mp4', 2, now(), 1),
('tokyo_ghoul_ep2.mp4', 2, now(), 2),
('tokyo_ghoul_ep3.mp4', 2, now(), 3),
('tokyo_ghoul_ep4.mp4', 2, now(), 4),
('tokyo_ghoul_ep5.mp4', 2, now(), 5),
('tokyo_ghoul_ep6.mp4', 2, now(), 6),
('tokyo_ghoul_ep7.mp4', 2, now(), 7),
('tokyo_ghoul_ep8.mp4', 2, now(), 8),
('tokyo_ghoul_ep9.mp4', 2, now(), 9),
('tokyo_ghoul_ep10.mp4', 2, now(), 10),
('tokyo_ghoul_ep11.mp4', 2, now(), 11),
('tokyo_ghoul_ep12.mp4', 2, now(), 12);
INSERT INTO episodes (video_src, series_id, release_date, episode_number) VALUES
-- Sword Art Online
('sword_art_online_ep1.mp4', 3, now(), 1),
('sword_art_online_ep2.mp4', 3, now(), 2),
('sword_art_online_ep3.mp4', 3, now(), 3),
('sword_art_online_ep4.mp4', 3, now(), 4),
('sword_art_online_ep5.mp4', 3, now(), 5),
('sword_art_online_ep6.mp4', 3, now(), 6),
('sword_art_online_ep7.mp4', 3, now(), 7),
('sword_art_online_ep8.mp4', 3, now(), 8),
('sword_art_online_ep9.mp4', 3, now(), 9),
('sword_art_online_ep10.mp4', 3, now(), 10),
('sword_art_online_ep11.mp4', 3, now(), 11),
('sword_art_online_ep12.mp4', 3, now(), 12),
('sword_art_online_ep13.mp4', 3, now(), 13),
('sword_art_online_ep14.mp4', 3, now(), 14),
('sword_art_online_ep15.mp4', 3, now(), 15),
('sword_art_online_ep16.mp4', 3, now(), 16),
('sword_art_online_ep17.mp4', 3, now(), 17),
('sword_art_online_ep18.mp4', 3, now(), 18),
('sword_art_online_ep19.mp4', 3, now(), 19),
('sword_art_online_ep20.mp4', 3, now(), 20),
('sword_art_online_ep21.mp4', 3, now(), 21),
('sword_art_online_ep22.mp4', 3, now(), 22),
('sword_art_online_ep23.mp4', 3, now(), 23),
('sword_art_online_ep24.mp4', 3, now(), 24),
('sword_art_online_ep25.mp4', 3, now(), 25);
INSERT INTO episodes (video_src, series_id, release_date, episode_number) VALUES
-- Mushoku Tensei: Jobless Reincarnation
('mushoku_tensei_ep1.mp4', 4, now(), 1),
('mushoku_tensei_ep2.mp4', 4, now(), 2),
('mushoku_tensei_ep3.mp4', 4, now(), 3),
('mushoku_tensei_ep4.mp4', 4, now(), 4),
('mushoku_tensei_ep5.mp4', 4, now(), 5),
('mushoku_tensei_ep6.mp4', 4, now(), 6),
('mushoku_tensei_ep7.mp4', 4, now(), 7),
('mushoku_tensei_ep8.mp4', 4, now(), 8),
('mushoku_tensei_ep9.mp4', 4, now(), 9),
('mushoku_tensei_ep10.mp4', 4, now(), 10),
('mushoku_tensei_ep11.mp4', 4, now(), 11);
INSERT INTO episodes (video_src, series_id, release_date, episode_number) VALUES
-- Code Geass: Lelouch of the Rebellion
('code_geass_lelouch_of_the_rebellion_ep1.mp4', 5, now(), 1),
('code_geass_lelouch_of_the_rebellion_ep2.mp4', 5, now(), 2),
('code_geass_lelouch_of_the_rebellion_ep3.mp4', 5, now(), 3),
('code_geass_lelouch_of_the_rebellion_ep4.mp4', 5, now(), 4),
('code_geass_lelouch_of_the_rebellion_ep5.mp4', 5, now(), 5),
('code_geass_lelouch_of_the_rebellion_ep6.mp4', 5, now(), 6),
('code_geass_lelouch_of_the_rebellion_ep7.mp4', 5, now(), 7),
('code_geass_lelouch_of_the_rebellion_ep8.mp4', 5, now(), 8),
('code_geass_lelouch_of_the_rebellion_ep9.mp4', 5, now(), 9),
('code_geass_lelouch_of_the_rebellion_ep10.mp4', 5, now(), 10),
('code_geass_lelouch_of_the_rebellion_ep11.mp4', 5, now(), 11),
('code_geass_lelouch_of_the_rebellion_ep12.mp4', 5, now(), 12),
('code_geass_lelouch_of_the_rebellion_ep13.mp4', 5, now(), 13),
('code_geass_lelouch_of_the_rebellion_ep14.mp4', 5, now(), 14),
('code_geass_lelouch_of_the_rebellion_ep15.mp4', 5, now(), 15),
('code_geass_lelouch_of_the_rebellion_ep16.mp4', 5, now(), 16),
('code_geass_lelouch_of_the_rebellion_ep17.mp4', 5, now(), 17),
('code_geass_lelouch_of_the_rebellion_ep18.mp4', 5, now(), 18),
('code_geass_lelouch_of_the_rebellion_ep19.mp4', 5, now(), 19),
('code_geass_lelouch_of_the_rebellion_ep20.mp4', 5, now(), 20),
('code_geass_lelouch_of_the_rebellion_ep21.mp4', 5, now(), 21),
('code_geass_lelouch_of_the_rebellion_ep22.mp4', 5, now(), 22),
('code_geass_lelouch_of_the_rebellion_ep23.mp4', 5, now(), 23),
('code_geass_lelouch_of_the_rebellion_ep24.mp4', 5, now(), 24),
('code_geass_lelouch_of_the_rebellion_ep25.mp4', 5, now(), 25);
-- A Silent Voice
INSERT INTO episodes (video_src, series_id, release_date, episode_number) VALUES
('a_silent_voice.mp4', 6, now(), 1);
-- Josee to Tora to Sakana-tachi
INSERT INTO episodes (video_src, series_id, release_date, episode_number) VALUES
('josee_to_tora_to_Sakana-tachi.mp4', 7, now(), 1);
-- Lycoris Recoil
INSERT INTO episodes (video_src, series_id, release_date, episode_number) VALUES
('lycoris_recoil_ep1.mp4', 8, now(), 1),
('lycoris_recoil_ep2.mp4', 8, now(), 2),
('lycoris_recoil_ep3.mp4', 8, now(), 3),
('lycoris_recoil_ep4.mp4', 8, now(), 4),
('lycoris_recoil_ep5.mp4', 8, now(), 5),
('lycoris_recoil_ep6.mp4', 8, now(), 6),
('lycoris_recoil_ep7.mp4', 8, now(), 7),
('lycoris_recoil_ep8.mp4', 8, now(), 8),
('lycoris_recoil_ep9.mp4', 8, now(), 9),
('lycoris_recoil_ep10.mp4', 8, now(), 10),
('lycoris_recoil_ep11.mp4', 8, now(), 11),
('lycoris_recoil_ep12.mp4', 8, now(), 12),
('lycoris_recoil_ep13.mp4', 8, now(), 13);
-- Wistoria: Wand and Sword
INSERT INTO episodes (video_src, series_id, release_date, episode_number) VALUES
('wistoria_wand_and_sword_ep1.mp4', 9, now(), 1),
('wistoria_wand_and_sword_ep2.mp4', 9, now(), 2),
('wistoria_wand_and_sword_ep3.mp4', 9, now(), 3);

-- Inserimento dei generi aggiornati nella tabella genres
INSERT INTO genres (name) VALUES 
('Action'),
('Adventure'),
('Comedy'),
('Drama'),
('Fantasy'),
('Magic'),
('Mecha'),
('Military'),
('Horror'),
('Mystery'),
('Psychological'),
('Romance'),
('Science Fiction'),
('Supernatural'),
('Thriller'),
('Gore'),         
('Shounen'),      
('Seinen'),       
('Game'),         
('Ecchi'),        
('Isekai'),       
('Reincarnation'),
('School'),
('Slice of Life'),
('Super Power');

-- Inserimento delle associazioni tra serie e generi nella tabella series_has_genres
-- Death Note
INSERT INTO series_has_genres (series_id, genre_name) VALUES (1, 'Mystery'),(1, 'Psychological'),(1, 'Supernatural'),(1, 'Thriller');
-- Tokyo Ghoul
INSERT INTO series_has_genres (series_id, genre_name) VALUES (2, 'Action'),(2, 'Drama'),(2, 'Horror'),(2, 'Mystery'),(2, 'Gore'),(2, 'Psychological'),(2, 'Seinen'),(2, 'Supernatural');
-- Sword Art Online
INSERT INTO series_has_genres (series_id, genre_name) VALUES (3, 'Action'),(3, 'Adventure'),(3, 'Fantasy'),(3, 'Romance'),(3, 'Game');
-- Mushoku Tensei: Jobless Reincarnation
INSERT INTO series_has_genres (series_id, genre_name) VALUES (4, 'Adventure'),(4, 'Drama'),(4, 'Ecchi'),(4, 'Fantasy'),(4, 'Isekai'),(4, 'Reincarnation');
-- Code Geass: Lelouch of the Rebellion
INSERT INTO series_has_genres (series_id, genre_name) VALUES (5, 'Action'),(5, 'Drama'),(5, 'Science Fiction'),(5, 'Magic'),(5, 'Mecha'),(5, 'Military'),(5, 'School'),(5, 'Super Power'),(5, 'Thriller');
-- A Silent Voice
INSERT INTO series_has_genres (series_id, genre_name) VALUES (6, 'Drama'),(6, 'Romance'),(6, 'Shounen'),(6, 'Slice of Life');
-- Josee to Tora to Sakana-tachi
INSERT INTO series_has_genres (series_id, genre_name) VALUES (7, 'Drama'),(7, 'Romance'),(7, 'Slice of Life');
-- Lycoris Recoil
INSERT INTO series_has_genres (series_id, genre_name) VALUES (8, 'Action'),(8, 'Comedy'),(8, 'Slice of Life');
-- Wistoria: Wand and Sword
INSERT INTO series_has_genres (series_id, genre_name) VALUES (9, 'Action'),(9, 'Adventure'),(9, 'Fantasy'),(9, 'School'),(9, 'Shounen');
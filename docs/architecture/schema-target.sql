-- UPC-X: modelo OBJETIVO PostgreSQL 17. No es una migracion de produccion.
-- Ejecutar solamente en una base VACIA y aislada para validar el diseno.
-- V1 vigente: upcx-api/src/main/resources/db/migration/V1__marketplace.sql.
-- EXISTING = tabla de V1, con ampliaciones; PLANNED = tabla nueva.
BEGIN;

-- EXISTING
CREATE TABLE students (
  id uuid PRIMARY KEY,
  email varchar(254) NOT NULL UNIQUE CHECK (email = lower(email) AND email ~ '^[^@[:space:]]+@upc[.]edu[.]pe$'),
  name varchar(80) NOT NULL,
  password_hash text NOT NULL,
  verified boolean NOT NULL DEFAULT false,
  career varchar(100), academic_cycle smallint CHECK (academic_cycle BETWEEN 1 AND 20),
  preferred_language varchar(5) NOT NULL DEFAULT 'es' CHECK (preferred_language IN ('es','en')),
  payment_phone varchar(9) CHECK (payment_phone ~ '^[0-9]{9}$'),
  avatar_image_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
-- EXISTING
CREATE TABLE challenges (
  id uuid PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES students(id),
  purpose varchar(10) NOT NULL CHECK (purpose IN ('verify','reset')),
  secret_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  attempts integer NOT NULL DEFAULT 0 CHECK (attempts BETWEEN 0 AND 5),
  used boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (expires_at > created_at)
);
CREATE UNIQUE INDEX challenges_one_unused ON challenges(student_id,purpose) WHERE NOT used;
CREATE INDEX challenges_expiry ON challenges(expires_at);
-- EXISTING
CREATE TABLE sessions (
  token_hash text PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES students(id),
  expires_at timestamptz NOT NULL
);
CREATE INDEX sessions_expiry ON sessions(expires_at);
CREATE INDEX sessions_student ON sessions(student_id);
-- EXISTING
CREATE TABLE images (
  id uuid PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES students(id),
  object_key text NOT NULL UNIQUE,
  content_type varchar(30) NOT NULL CHECK (content_type IN ('image/png','image/jpeg')),
  byte_size bigint NOT NULL CHECK (byte_size > 0),
  purpose varchar(10) NOT NULL CHECK (purpose IN ('listing','avatar','evidence','message')),
  visibility varchar(7) NOT NULL CHECK (visibility IN ('public','private')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (purpose NOT IN ('evidence','message') OR visibility = 'private')
);
ALTER TABLE students ADD FOREIGN KEY (avatar_image_id) REFERENCES images(id);
-- PLANNED
CREATE TABLE campuses (
  id uuid PRIMARY KEY, name varchar(30) NOT NULL UNIQUE, active boolean NOT NULL DEFAULT true
);
-- PLANNED
CREATE TABLE categories (
  id uuid PRIMARY KEY, code varchar(30) NOT NULL UNIQUE,
  name_es varchar(60) NOT NULL, name_en varchar(60) NOT NULL,
  active boolean NOT NULL DEFAULT true
);
-- EXISTING
CREATE TABLE listings (
  id uuid PRIMARY KEY,
  seller_id uuid NOT NULL REFERENCES students(id),
  category_id uuid NOT NULL REFERENCES categories(id),
  campus_id uuid NOT NULL REFERENCES campuses(id),
  title varchar(100) NOT NULL, description varchar(2000) NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  type varchar(10) NOT NULL CHECK (type IN ('product','service','tutoring')),
  condition varchar(10) CHECK (condition IN ('new','like_new','used')),
  continuous boolean NOT NULL DEFAULT false,
  status varchar(12) NOT NULL DEFAULT 'available' CHECK (status IN ('available','paused','reserved','sold','withdrawn')),
  under_review boolean NOT NULL DEFAULT false,
  reserved_deal_id uuid UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((type = 'product' AND condition IS NOT NULL) OR (type <> 'product' AND condition IS NULL)),
  CHECK (NOT continuous OR (reserved_deal_id IS NULL AND status NOT IN ('reserved','sold'))),
  CHECK (status NOT IN ('reserved','sold') OR reserved_deal_id IS NOT NULL),
  CHECK (reserved_deal_id IS NULL OR status IN ('reserved','sold'))
);
CREATE INDEX listings_discovery ON listings(status,campus_id,created_at DESC);
CREATE INDEX listings_category ON listings(category_id,status,price);
-- PLANNED
CREATE TABLE listing_images (
  listing_id uuid NOT NULL REFERENCES listings(id),
  image_id uuid NOT NULL REFERENCES images(id),
  position smallint NOT NULL CHECK (position >= 0),
  is_cover boolean NOT NULL DEFAULT false,
  PRIMARY KEY (listing_id,image_id), UNIQUE (listing_id,position)
);
CREATE UNIQUE INDEX listing_one_cover ON listing_images(listing_id) WHERE is_cover;
-- PLANNED
CREATE TABLE favorites (
  student_id uuid NOT NULL REFERENCES students(id),
  listing_id uuid NOT NULL REFERENCES listings(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (student_id,listing_id)
);
-- EXISTING
CREATE TABLE conversations (
  id uuid PRIMARY KEY,
  listing_id uuid NOT NULL REFERENCES listings(id),
  buyer_id uuid NOT NULL REFERENCES students(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (listing_id,buyer_id)
);
-- EXISTING
CREATE TABLE messages (
  id uuid PRIMARY KEY,
  conversation_id uuid NOT NULL REFERENCES conversations(id),
  sender_id uuid NOT NULL REFERENCES students(id),
  kind varchar(8) NOT NULL DEFAULT 'text' CHECK (kind IN ('text','image','evidence')),
  content varchar(2000),
  image_id uuid REFERENCES images(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (id,conversation_id),
  CHECK ((kind = 'text' AND content IS NOT NULL AND length(trim(content)) > 0 AND image_id IS NULL)
    OR (kind = 'image' AND image_id IS NOT NULL)
    OR (kind = 'evidence' AND image_id IS NULL))
);
CREATE INDEX messages_conversation ON messages(conversation_id,created_at,id);
-- EXISTING
CREATE TABLE deals (
  id uuid PRIMARY KEY,
  conversation_id uuid NOT NULL UNIQUE REFERENCES conversations(id),
  campus_id uuid NOT NULL REFERENCES campuses(id),
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  meeting_point varchar(200) NOT NULL, meeting_at timestamptz NOT NULL,
  buyer_accepted boolean NOT NULL DEFAULT false, seller_accepted boolean NOT NULL DEFAULT false,
  buyer_confirmed boolean NOT NULL DEFAULT false, seller_confirmed boolean NOT NULL DEFAULT false,
  status varchar(12) NOT NULL DEFAULT 'proposed' CHECK (status IN ('proposed','agreed','completed','cancelled','no_show')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (id,conversation_id),
  CHECK (status <> 'completed' OR (buyer_confirmed AND seller_confirmed)),
  CHECK (status NOT IN ('agreed','completed') OR (buyer_accepted AND seller_accepted)),
  CHECK (NOT buyer_confirmed OR buyer_accepted),
  CHECK (NOT seller_confirmed OR seller_accepted)
);
ALTER TABLE listings ADD FOREIGN KEY (reserved_deal_id) REFERENCES deals(id);
CREATE INDEX deals_meeting ON deals(status,meeting_at);
-- EXISTING
CREATE TABLE reviews (
  id uuid PRIMARY KEY,
  deal_id uuid NOT NULL REFERENCES deals(id),
  reviewer_id uuid NOT NULL REFERENCES students(id),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment varchar(1000), created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (deal_id,reviewer_id)
);
-- PLANNED
CREATE TABLE payment_evidences (
  id uuid PRIMARY KEY,
  deal_id uuid NOT NULL,
  conversation_id uuid NOT NULL,
  message_id uuid NOT NULL UNIQUE,
  image_id uuid NOT NULL REFERENCES images(id),
  uploaded_by uuid NOT NULL REFERENCES students(id),
  method varchar(5) NOT NULL CHECK (method IN ('yape','plin','other')),
  amount numeric(10,2) NOT NULL CHECK (amount > 0),
  status varchar(8) NOT NULL DEFAULT 'sent' CHECK (status IN ('sent','received','disputed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (deal_id,conversation_id) REFERENCES deals(id,conversation_id),
  FOREIGN KEY (message_id,conversation_id) REFERENCES messages(id,conversation_id)
);
-- PLANNED
CREATE TABLE deal_events (
  id uuid PRIMARY KEY,
  deal_id uuid NOT NULL REFERENCES deals(id),
  actor_id uuid NOT NULL REFERENCES students(id),
  event_type varchar(20) NOT NULL CHECK (event_type IN ('proposed','accepted','confirmed','cancelled','no_show_reported')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX deal_events_history ON deal_events(deal_id,created_at,id);
-- PLANNED
CREATE TABLE reports (
  id uuid PRIMARY KEY,
  reporter_id uuid NOT NULL REFERENCES students(id),
  listing_id uuid REFERENCES listings(id),
  deal_id uuid REFERENCES deals(id),
  reason varchar(30) NOT NULL, detail varchar(2000) NOT NULL,
  status varchar(10) NOT NULL DEFAULT 'open' CHECK (status IN ('open','reviewing','closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((listing_id IS NOT NULL)::integer + (deal_id IS NOT NULL)::integer = 1)
);
-- PLANNED
CREATE TABLE notifications (
  id uuid PRIMARY KEY,
  recipient_id uuid NOT NULL REFERENCES students(id),
  deal_id uuid REFERENCES deals(id),
  message_id uuid REFERENCES messages(id),
  kind varchar(30) NOT NULL, read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX notifications_inbox ON notifications(recipient_id,created_at DESC);
-- PLANNED
CREATE TABLE support_tickets (
  id uuid PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES students(id),
  subject varchar(100) NOT NULL, body varchar(2000) NOT NULL,
  status varchar(10) NOT NULL DEFAULT 'open' CHECK (status IN ('open','reviewing','closed')),
  created_at timestamptz NOT NULL DEFAULT now()
);
COMMIT;

-- Reglas ENTRE filas: NO se simulan con CHECK que consulte otras tablas.
-- API transaccional: comprador != vendedor; remitente/autor pertenece al hilo;
-- reseña solo de entrega completada; reserva apunta a acuerdo del mismo aviso;
-- al publicar, >=1 foto propia y exactamente 1 portada; sede de acuerdo = aviso;
-- evidencia con mensaje kind=evidence e imagen propia/private/purpose=evidence;
-- no_show es declaración, no culpabilidad; solo después de meeting_at y por participante.
-- Lock order: listings FOR UPDATE -> deals FOR UPDATE. Misma transacción para
-- aceptaciones/reserva, cierre/disponibilidad, eventos y notificaciones.

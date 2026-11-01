-- UPC-X · Esquema PostgreSQL 17 de la sección 4.10.
-- Obtenido con pg_dump --schema-only tras aplicar las migraciones Flyway V1–V13 de upcx-api.
-- 17 tablas y 36 claves foráneas. Fuente de verdad: src/main/resources/db/migration.

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.11
-- Dumped by pg_dump version 17.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: challenges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.challenges (
    id uuid NOT NULL,
    student_id uuid NOT NULL,
    purpose character varying(10) NOT NULL,
    secret_hash text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    attempts integer DEFAULT 0 NOT NULL,
    used boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    pending_name character varying(80),
    pending_password_hash text,
    CONSTRAINT challenges_purpose_check CHECK (((purpose)::text = ANY ((ARRAY['verify'::character varying, 'reset'::character varying, 'login'::character varying])::text[])))
);


--
-- Name: conversation_reads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conversation_reads (
    conversation_id uuid NOT NULL,
    student_id uuid NOT NULL,
    read_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: conversations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conversations (
    id uuid NOT NULL,
    listing_id uuid NOT NULL,
    buyer_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_activity_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: deal_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deal_events (
    id uuid NOT NULL,
    deal_id uuid NOT NULL,
    actor_id uuid,
    type character varying(20) NOT NULL,
    reason character varying(300),
    created_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    CONSTRAINT deal_events_type_check CHECK (((type)::text = ANY ((ARRAY['proposed'::character varying, 'revised'::character varying, 'accepted'::character varying, 'confirmed'::character varying, 'cancelled'::character varying, 'no_show_reported'::character varying, 'expired'::character varying])::text[])))
);


--
-- Name: deals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deals (
    id uuid NOT NULL,
    conversation_id uuid NOT NULL,
    price numeric(10,2) NOT NULL,
    campus character varying(30) NOT NULL,
    meeting_point character varying(200) NOT NULL,
    meeting_at timestamp with time zone NOT NULL,
    buyer_accepted boolean DEFAULT false NOT NULL,
    seller_accepted boolean DEFAULT false NOT NULL,
    buyer_confirmed boolean DEFAULT false NOT NULL,
    seller_confirmed boolean DEFAULT false NOT NULL,
    status character varying(12) DEFAULT 'proposed'::character varying NOT NULL,
    proposer_id uuid,
    created_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    updated_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    revision integer DEFAULT 1 NOT NULL,
    CONSTRAINT deals_check CHECK ((((status)::text <> 'completed'::text) OR (buyer_confirmed AND seller_confirmed))),
    CONSTRAINT deals_check1 CHECK ((((status)::text <> ALL ((ARRAY['agreed'::character varying, 'completed'::character varying])::text[])) OR (buyer_accepted AND seller_accepted))),
    CONSTRAINT deals_price_check CHECK ((price >= (0)::numeric)),
    CONSTRAINT deals_revision_check CHECK ((revision >= 1)),
    CONSTRAINT deals_status_check CHECK (((status)::text = ANY ((ARRAY['proposed'::character varying, 'agreed'::character varying, 'completed'::character varying, 'cancelled'::character varying, 'no_show'::character varying])::text[])))
);


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.favorites (
    student_id uuid NOT NULL,
    listing_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.images (
    id uuid NOT NULL,
    owner_id uuid NOT NULL,
    content_type text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    object_key text NOT NULL,
    purpose character varying(20) DEFAULT 'listing'::character varying NOT NULL,
    CONSTRAINT images_purpose_check CHECK (((purpose)::text = ANY ((ARRAY['listing'::character varying, 'payment_evidence'::character varying])::text[])))
);


--
-- Name: listing_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.listing_images (
    listing_id uuid NOT NULL,
    image_id uuid NOT NULL,
    "position" integer NOT NULL,
    CONSTRAINT listing_images_position_check CHECK ((("position" >= 0) AND ("position" <= 4)))
);


--
-- Name: listings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.listings (
    id uuid NOT NULL,
    seller_id uuid NOT NULL,
    title character varying(100) NOT NULL,
    description character varying(2000) NOT NULL,
    price numeric(10,2) NOT NULL,
    campus character varying(30) NOT NULL,
    category character varying(30) NOT NULL,
    condition character varying(20),
    image_id uuid NOT NULL,
    status character varying(12) DEFAULT 'available'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    reserved_deal_id uuid,
    type character varying(10) DEFAULT 'product'::character varying NOT NULL,
    continuous boolean DEFAULT false NOT NULL,
    under_review boolean DEFAULT false NOT NULL,
    CONSTRAINT listings_campus_check CHECK (((campus)::text = ANY ((ARRAY['Monterrico'::character varying, 'San Miguel'::character varying, 'San Isidro'::character varying, 'Villa'::character varying])::text[]))),
    CONSTRAINT listings_condition_check CHECK (((condition IS NULL) OR ((condition)::text = ANY ((ARRAY['Nuevo'::character varying, 'Como nuevo'::character varying, 'Usado'::character varying])::text[])))),
    CONSTRAINT listings_continuous_check CHECK (((NOT continuous) OR ((reserved_deal_id IS NULL) AND ((status)::text <> ALL ((ARRAY['reserved'::character varying, 'sold'::character varying])::text[]))))),
    CONSTRAINT listings_price_check CHECK ((price >= (0)::numeric)),
    CONSTRAINT listings_status_check CHECK (((status)::text = ANY ((ARRAY['available'::character varying, 'paused'::character varying, 'reserved'::character varying, 'sold'::character varying, 'withdrawn'::character varying])::text[]))),
    CONSTRAINT listings_type_check CHECK (((type)::text = ANY ((ARRAY['product'::character varying, 'service'::character varying, 'tutoring'::character varying])::text[]))),
    CONSTRAINT listings_type_condition_check CHECK ((((type)::text = 'product'::text) OR (condition IS NULL)))
);


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id uuid NOT NULL,
    conversation_id uuid NOT NULL,
    sender_id uuid NOT NULL,
    content character varying(2000) NOT NULL,
    created_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    client_id uuid
);


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id uuid NOT NULL,
    recipient_id uuid NOT NULL,
    kind character varying(40) NOT NULL,
    deal_id uuid NOT NULL,
    conversation_id uuid NOT NULL,
    actor_id uuid,
    read_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    CONSTRAINT notifications_check CHECK (((actor_id IS NULL) OR (actor_id <> recipient_id))),
    CONSTRAINT notifications_kind_check CHECK (((kind)::text = ANY ((ARRAY['deal_proposed'::character varying, 'deal_revised'::character varying, 'deal_agreed'::character varying, 'deal_cancelled'::character varying, 'deal_no_show'::character varying, 'payment_evidence_sent'::character varying, 'payment_evidence_received'::character varying, 'payment_evidence_disputed'::character varying, 'deal_completed'::character varying, 'review_received'::character varying, 'deal_expired'::character varying])::text[])))
);


--
-- Name: payment_evidences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_evidences (
    id uuid NOT NULL,
    conversation_id uuid NOT NULL,
    deal_id uuid NOT NULL,
    author_id uuid NOT NULL,
    image_id uuid NOT NULL,
    image_purpose character varying(20) DEFAULT 'payment_evidence'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    method character varying(5),
    amount numeric(10,2),
    reference character varying(4),
    status character varying(8) DEFAULT 'sent'::character varying NOT NULL,
    reviewed_by uuid,
    reviewed_at timestamp with time zone,
    note character varying(300),
    replaces_id uuid,
    CONSTRAINT payment_evidences_amount_check CHECK ((amount > (0)::numeric)),
    CONSTRAINT payment_evidences_image_purpose_check CHECK (((image_purpose)::text = 'payment_evidence'::text)),
    CONSTRAINT payment_evidences_method_check CHECK (((method)::text = ANY ((ARRAY['yape'::character varying, 'plin'::character varying, 'other'::character varying])::text[]))),
    CONSTRAINT payment_evidences_note_check CHECK (((note IS NULL) OR ((status)::text = 'disputed'::text))),
    CONSTRAINT payment_evidences_reference_check CHECK (((reference)::text ~ '^[A-Za-z0-9]{1,4}$'::text)),
    CONSTRAINT payment_evidences_review_check CHECK ((num_nulls(reviewed_by, reviewed_at) =
CASE
    WHEN ((status)::text = 'sent'::text) THEN 2
    ELSE 0
END)),
    CONSTRAINT payment_evidences_reviewer_check CHECK ((reviewed_by <> author_id)),
    CONSTRAINT payment_evidences_status_check CHECK (((status)::text = ANY ((ARRAY['sent'::character varying, 'received'::character varying, 'disputed'::character varying])::text[])))
);


--
-- Name: reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reports (
    id uuid NOT NULL,
    reporter_id uuid NOT NULL,
    listing_id uuid NOT NULL,
    deal_id uuid,
    reason character varying(30) NOT NULL,
    detail character varying(1000),
    status character varying(10) DEFAULT 'open'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    CONSTRAINT reports_deal_id_check CHECK ((deal_id IS NULL)),
    CONSTRAINT reports_reason_check CHECK (((reason)::text = ANY ((ARRAY['prohibited_item'::character varying, 'misleading'::character varying, 'suspected_fraud'::character varying, 'offensive'::character varying, 'other'::character varying])::text[]))),
    CONSTRAINT reports_status_check CHECK (((status)::text = ANY ((ARRAY['open'::character varying, 'reviewing'::character varying, 'closed'::character varying])::text[])))
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    id uuid NOT NULL,
    deal_id uuid NOT NULL,
    reviewer_id uuid NOT NULL,
    rating integer NOT NULL,
    comment character varying(1000),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    token_hash text NOT NULL,
    student_id uuid NOT NULL,
    expires_at timestamp with time zone NOT NULL
);


--
-- Name: students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.students (
    id uuid NOT NULL,
    email character varying(254) NOT NULL,
    name character varying(80) NOT NULL,
    password_hash text,
    verified boolean DEFAULT false NOT NULL,
    campus character varying(30),
    career character varying(80),
    cycle character varying(20),
    language character varying(5) DEFAULT 'es'::character varying NOT NULL,
    payment_phone character varying(20),
    CONSTRAINT students_campus_check CHECK (((campus)::text = ANY ((ARRAY['Monterrico'::character varying, 'San Miguel'::character varying, 'San Isidro'::character varying, 'Villa'::character varying])::text[]))),
    CONSTRAINT students_email_check CHECK (((email)::text ~ '^[^@[:space:]]+@upc\.edu\.pe$'::text)),
    CONSTRAINT students_language_check CHECK (((language)::text = ANY ((ARRAY['es'::character varying, 'en'::character varying])::text[])))
);


--
-- Name: support_tickets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.support_tickets (
    id uuid NOT NULL,
    student_id uuid,
    subject character varying(100) NOT NULL,
    body character varying(2000) NOT NULL,
    status character varying(10) DEFAULT 'open'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    contact_email character varying(254),
    CONSTRAINT support_ticket_contact CHECK ((((student_id IS NOT NULL) AND (contact_email IS NULL)) OR ((student_id IS NULL) AND (contact_email IS NOT NULL) AND (length(btrim((contact_email)::text)) > 0)))),
    CONSTRAINT support_tickets_body_check CHECK ((length(btrim((body)::text)) > 0)),
    CONSTRAINT support_tickets_status_check CHECK (((status)::text = ANY ((ARRAY['open'::character varying, 'reviewing'::character varying, 'closed'::character varying])::text[]))),
    CONSTRAINT support_tickets_subject_check CHECK ((length(btrim((subject)::text)) > 0))
);


--
-- Name: challenges challenges_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.challenges
    ADD CONSTRAINT challenges_pkey PRIMARY KEY (id);


--
-- Name: conversation_reads conversation_reads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation_reads
    ADD CONSTRAINT conversation_reads_pkey PRIMARY KEY (conversation_id, student_id);


--
-- Name: conversations conversations_listing_id_buyer_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_listing_id_buyer_id_key UNIQUE (listing_id, buyer_id);


--
-- Name: conversations conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);


--
-- Name: deal_events deal_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deal_events
    ADD CONSTRAINT deal_events_pkey PRIMARY KEY (id);


--
-- Name: deals deals_conversation_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deals
    ADD CONSTRAINT deals_conversation_unique UNIQUE (id, conversation_id);


--
-- Name: deals deals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deals
    ADD CONSTRAINT deals_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (student_id, listing_id);


--
-- Name: images images_object_key_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_object_key_unique UNIQUE (object_key);


--
-- Name: images images_owner_purpose_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_owner_purpose_unique UNIQUE (id, owner_id, purpose);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: listing_images listing_images_listing_id_position_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_images
    ADD CONSTRAINT listing_images_listing_id_position_key UNIQUE (listing_id, "position");


--
-- Name: listing_images listing_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_images
    ADD CONSTRAINT listing_images_pkey PRIMARY KEY (listing_id, image_id);


--
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: payment_evidences payment_evidences_author_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_evidences
    ADD CONSTRAINT payment_evidences_author_unique UNIQUE (id, deal_id, author_id);


--
-- Name: payment_evidences payment_evidences_image_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_evidences
    ADD CONSTRAINT payment_evidences_image_id_key UNIQUE (image_id);


--
-- Name: payment_evidences payment_evidences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_evidences
    ADD CONSTRAINT payment_evidences_pkey PRIMARY KEY (id);


--
-- Name: payment_evidences payment_evidences_replaces_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_evidences
    ADD CONSTRAINT payment_evidences_replaces_id_key UNIQUE (replaces_id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_deal_id_reviewer_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_deal_id_reviewer_id_key UNIQUE (deal_id, reviewer_id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (token_hash);


--
-- Name: students students_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_email_key UNIQUE (email);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: support_tickets support_tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.support_tickets
    ADD CONSTRAINT support_tickets_pkey PRIMARY KEY (id);


--
-- Name: challenges_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX challenges_student ON public.challenges USING btree (student_id, created_at DESC);


--
-- Name: conversations_activity; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX conversations_activity ON public.conversations USING btree (last_activity_at DESC);


--
-- Name: conversations_buyer; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX conversations_buyer ON public.conversations USING btree (buyer_id);


--
-- Name: deal_events_history; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX deal_events_history ON public.deal_events USING btree (deal_id, created_at, id);


--
-- Name: deals_conversation_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX deals_conversation_created ON public.deals USING btree (conversation_id, created_at DESC, id DESC);


--
-- Name: deals_one_active; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX deals_one_active ON public.deals USING btree (conversation_id) WHERE ((status)::text = ANY ((ARRAY['proposed'::character varying, 'agreed'::character varying])::text[]));


--
-- Name: favorites_student_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX favorites_student_created ON public.favorites USING btree (student_id, created_at DESC);


--
-- Name: listings_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX listings_created ON public.listings USING btree (created_at DESC);


--
-- Name: listings_seller_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX listings_seller_created ON public.listings USING btree (seller_id, created_at DESC);


--
-- Name: messages_client_delivery; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX messages_client_delivery ON public.messages USING btree (conversation_id, sender_id, client_id) WHERE (client_id IS NOT NULL);


--
-- Name: messages_conversation; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_conversation ON public.messages USING btree (conversation_id, created_at);


--
-- Name: messages_cursor; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_cursor ON public.messages USING btree (conversation_id, created_at, id);


--
-- Name: notifications_recipient; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX notifications_recipient ON public.notifications USING btree (recipient_id, created_at DESC, id DESC);


--
-- Name: notifications_unread; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX notifications_unread ON public.notifications USING btree (recipient_id) WHERE (read_at IS NULL);


--
-- Name: payment_evidences_conversation; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payment_evidences_conversation ON public.payment_evidences USING btree (conversation_id, created_at);


--
-- Name: reports_listing_open; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reports_listing_open ON public.reports USING btree (listing_id) WHERE ((status)::text = ANY ((ARRAY['open'::character varying, 'reviewing'::character varying])::text[]));


--
-- Name: reports_one_open_per_student_listing; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX reports_one_open_per_student_listing ON public.reports USING btree (reporter_id, listing_id) WHERE ((status)::text = ANY ((ARRAY['open'::character varying, 'reviewing'::character varying])::text[]));


--
-- Name: reports_queue; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reports_queue ON public.reports USING btree (status, created_at, id);


--
-- Name: sessions_expiry; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_expiry ON public.sessions USING btree (expires_at);


--
-- Name: support_tickets_queue; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX support_tickets_queue ON public.support_tickets USING btree (status, created_at, id);


--
-- Name: support_tickets_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX support_tickets_student ON public.support_tickets USING btree (student_id, created_at DESC, id DESC);


--
-- Name: challenges challenges_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.challenges
    ADD CONSTRAINT challenges_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: conversation_reads conversation_reads_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation_reads
    ADD CONSTRAINT conversation_reads_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- Name: conversation_reads conversation_reads_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation_reads
    ADD CONSTRAINT conversation_reads_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: conversations conversations_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.students(id);


--
-- Name: conversations conversations_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id);


--
-- Name: deal_events deal_events_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deal_events
    ADD CONSTRAINT deal_events_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES public.students(id);


--
-- Name: deal_events deal_events_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deal_events
    ADD CONSTRAINT deal_events_deal_id_fkey FOREIGN KEY (deal_id) REFERENCES public.deals(id);


--
-- Name: deals deals_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deals
    ADD CONSTRAINT deals_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id);


--
-- Name: deals deals_proposer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deals
    ADD CONSTRAINT deals_proposer_id_fkey FOREIGN KEY (proposer_id) REFERENCES public.students(id);


--
-- Name: favorites favorites_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id);


--
-- Name: favorites favorites_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: images images_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.students(id);


--
-- Name: listing_images listing_images_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_images
    ADD CONSTRAINT listing_images_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(id);


--
-- Name: listing_images listing_images_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_images
    ADD CONSTRAINT listing_images_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: listings listings_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(id);


--
-- Name: listings listings_reserved_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_reserved_deal_id_fkey FOREIGN KEY (reserved_deal_id) REFERENCES public.deals(id);


--
-- Name: listings listings_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.students(id);


--
-- Name: messages messages_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id);


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.students(id);


--
-- Name: notifications notifications_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES public.students(id) ON DELETE SET NULL;


--
-- Name: notifications notifications_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_deal_id_fkey FOREIGN KEY (deal_id) REFERENCES public.deals(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_recipient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: payment_evidences payment_evidences_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_evidences
    ADD CONSTRAINT payment_evidences_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.students(id);


--
-- Name: payment_evidences payment_evidences_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_evidences
    ADD CONSTRAINT payment_evidences_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id);


--
-- Name: payment_evidences payment_evidences_deal_id_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_evidences
    ADD CONSTRAINT payment_evidences_deal_id_conversation_id_fkey FOREIGN KEY (deal_id, conversation_id) REFERENCES public.deals(id, conversation_id);


--
-- Name: payment_evidences payment_evidences_image_id_author_id_image_purpose_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_evidences
    ADD CONSTRAINT payment_evidences_image_id_author_id_image_purpose_fkey FOREIGN KEY (image_id, author_id, image_purpose) REFERENCES public.images(id, owner_id, purpose);


--
-- Name: payment_evidences payment_evidences_replaces_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_evidences
    ADD CONSTRAINT payment_evidences_replaces_fkey FOREIGN KEY (replaces_id, deal_id, author_id) REFERENCES public.payment_evidences(id, deal_id, author_id);


--
-- Name: payment_evidences payment_evidences_reviewed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_evidences
    ADD CONSTRAINT payment_evidences_reviewed_by_fkey FOREIGN KEY (reviewed_by) REFERENCES public.students(id);


--
-- Name: reports reports_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_deal_id_fkey FOREIGN KEY (deal_id) REFERENCES public.deals(id) ON DELETE CASCADE;


--
-- Name: reports reports_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: reports reports_reporter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_reporter_id_fkey FOREIGN KEY (reporter_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_deal_id_fkey FOREIGN KEY (deal_id) REFERENCES public.deals(id);


--
-- Name: reviews reviews_reviewer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_reviewer_id_fkey FOREIGN KEY (reviewer_id) REFERENCES public.students(id);


--
-- Name: sessions sessions_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: support_tickets support_tickets_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.support_tickets
    ADD CONSTRAINT support_tickets_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--



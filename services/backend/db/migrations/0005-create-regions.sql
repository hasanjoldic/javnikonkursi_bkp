CREATE TABLE IF NOT EXISTS regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  title TEXT UNIQUE NOT NULL,
  order_priority INT NOT NULL DEFAULT 0,

  _created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  _updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ON regions(title);
CREATE INDEX ON regions(_created_at);
CREATE INDEX ON regions(_updated_at);

DROP TRIGGER IF EXISTS a_regions_timestamp_trigger ON regions;

CREATE TRIGGER a_regions_timestamp_trigger
  BEFORE UPDATE ON regions
  FOR EACH ROW EXECUTE PROCEDURE timestamp_trigger();

INSERT INTO regions (title, order_priority) VALUES ('Unsko-sanski kanton', 100);
INSERT INTO regions (title, order_priority) VALUES ('Posavski kanton', 200);
INSERT INTO regions (title, order_priority) VALUES ('Tuzlanski kanton', 300);
INSERT INTO regions (title, order_priority) VALUES ('Zeničko-dobojski kanton', 400);
INSERT INTO regions (title, order_priority) VALUES ('Bosansko-podrinjski kanton', 500);
INSERT INTO regions (title, order_priority) VALUES ('Srednjobosanski kanton', 600);
INSERT INTO regions (title, order_priority) VALUES ('Hercegovačko-neretvanski kanton', 700);
INSERT INTO regions (title, order_priority) VALUES ('Zapadnohercegovački kanton', 800);
INSERT INTO regions (title, order_priority) VALUES ('Kanton Sarajevo', 900);
INSERT INTO regions (title, order_priority) VALUES ('Kanton 10', 1000);
INSERT INTO regions (title, order_priority) VALUES ('Banjalučka regija', 1100);
INSERT INTO regions (title, order_priority) VALUES ('Dobojsko-bijeljinska regija', 1200);
INSERT INTO regions (title, order_priority) VALUES ('Sarajevsko-zvornička regija', 1300);
INSERT INTO regions (title, order_priority) VALUES ('Trebinjsko-fočanska regija', 1400);
INSERT INTO regions (title, order_priority) VALUES ('Brčko distrikt', 1500);
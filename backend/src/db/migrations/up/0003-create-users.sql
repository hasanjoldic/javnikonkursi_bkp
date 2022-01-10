CREATE TABLE IF NOT EXISTS whitelisted_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  email VARCHAR(255) UNIQUE NOT NULL,

  _created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  _updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ON whitelisted_emails(email);
CREATE INDEX ON whitelisted_emails(_created_at);
CREATE INDEX ON whitelisted_emails(_updated_at);

DROP TRIGGER IF EXISTS a_whitelisted_emails_timestamp_trigger ON whitelisted_emails;

CREATE TRIGGER a_whitelisted_emails_timestamp_trigger
  BEFORE UPDATE ON whitelisted_emails
  FOR EACH ROW EXECUTE PROCEDURE timestamp_trigger();

CREATE TYPE user_roles AS ENUM ('app_user', 'admin', 'super_admin');

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  role user_roles NOT NULL DEFAULT 'app_user',
  email VARCHAR(255) UNIQUE NOT NULL,
  is_email_verified BOOLEAN DEFAULT false,
  password TEXT,

  full_name TEXT NOT NULL,

  _created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  _updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ON users(role);
CREATE INDEX ON users(full_name);
CREATE INDEX ON users(_created_at);
CREATE INDEX ON users(_updated_at);

DROP TRIGGER IF EXISTS a_users_timestamp_trigger ON users;

CREATE TRIGGER a_users_timestamp_trigger
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE PROCEDURE timestamp_trigger();

CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),

  token TEXT NOT NULL,

  _created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  _updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ON refresh_tokens(user_id);
CREATE INDEX ON refresh_tokens(_created_at);
CREATE INDEX ON refresh_tokens(_updated_at);

DROP TRIGGER IF EXISTS a_refresh_tokens_timestamp_trigger ON refresh_tokens;

CREATE TRIGGER a_refresh_tokens_timestamp_trigger
  BEFORE UPDATE ON refresh_tokens
  FOR EACH ROW EXECUTE PROCEDURE timestamp_trigger();


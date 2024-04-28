DROP TABLE IF EXISTS audit_log;
CREATE TABLE audit_log (
    id serial PRIMARY KEY,
    table_name TEXT,
    record_id TEXT,
    operation_type TEXT,
    changed_at TIMESTAMP DEFAULT now(),
    changed_by text,
    original_values jsonb,
    new_values jsonb
);


CREATE OR REPLACE FUNCTION ballots_audit_trigger() RETURNS TRIGGER AS $$
DECLARE
    new_data jsonb;
    old_data jsonb;
    key text;
    new_values jsonb;
    old_values jsonb;
    user_id text;
BEGIN

    user_id := current_setting('audit.user_id', true);

    IF user_id IS NULL THEN
        user_id := current_user;
    END IF;

    new_values := '{}';
    old_values := '{}';

    IF TG_OP = 'INSERT' THEN
        new_data := to_jsonb(NEW);
        new_values := new_data;

    ELSIF TG_OP = 'UPDATE' THEN
        new_data := to_jsonb(NEW);
        old_data := to_jsonb(OLD);

        FOR key IN SELECT jsonb_object_keys(new_data) INTERSECT SELECT jsonb_object_keys(old_data)
        LOOP
            IF new_data ->> key != old_data ->> key THEN
                new_values := new_values || jsonb_build_object(key, new_data ->> key);
                old_values := old_values || jsonb_build_object(key, old_data ->> key);
            END IF;
        END LOOP;

    ELSIF TG_OP = 'DELETE' THEN
        old_data := to_jsonb(OLD);
        old_values := old_data;

        FOR key IN SELECT jsonb_object_keys(old_data)
        LOOP
            old_values := old_values || jsonb_build_object(key, old_data ->> key);
        END LOOP;

    END IF;

    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, operation_type, changed_by, original_values, new_values)
        VALUES (TG_TABLE_NAME, NEW.ballotid, TG_OP, user_id, old_values, new_values);

        RETURN NEW;
    ELSE
        INSERT INTO audit_log (table_name, record_id, operation_type, changed_by, original_values, new_values)
        VALUES (TG_TABLE_NAME, OLD.ballotid, TG_OP, user_id, old_values, new_values);

        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION votes_audit_trigger() RETURNS TRIGGER AS $$
DECLARE
    new_data jsonb;
    old_data jsonb;
    key text;
    new_values jsonb;
    old_values jsonb;
    user_id text;
BEGIN

    user_id := current_setting('audit.user_id', true);

    IF user_id IS NULL THEN
        user_id := current_user;
    END IF;

    new_values := '{}';
    old_values := '{}';

    IF TG_OP = 'INSERT' THEN
        new_data := to_jsonb(NEW);
        new_values := new_data;

    ELSIF TG_OP = 'UPDATE' THEN
        new_data := to_jsonb(NEW);
        old_data := to_jsonb(OLD);

        FOR key IN SELECT jsonb_object_keys(new_data) INTERSECT SELECT jsonb_object_keys(old_data)
        LOOP
            IF new_data ->> key != old_data ->> key THEN
                new_values := new_values || jsonb_build_object(key, new_data ->> key);
                old_values := old_values || jsonb_build_object(key, old_data ->> key);
            END IF;
        END LOOP;

    ELSIF TG_OP = 'DELETE' THEN
        old_data := to_jsonb(OLD);
        old_values := old_data;

        FOR key IN SELECT jsonb_object_keys(old_data)
        LOOP
            old_values := old_values || jsonb_build_object(key, old_data ->> key);
        END LOOP;

    END IF;

    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, operation_type, changed_by, original_values, new_values)
        VALUES (TG_TABLE_NAME, NEW.voteid, TG_OP, user_id, old_values, new_values);

        RETURN NEW;
    ELSE
        INSERT INTO audit_log (table_name, record_id, operation_type, changed_by, original_values, new_values)
        VALUES (TG_TABLE_NAME, OLD.voteid, TG_OP, user_id, old_values, new_values);

        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION users_audit_trigger() RETURNS TRIGGER AS $$
DECLARE
    new_data jsonb;
    old_data jsonb;
    key text;
    new_values jsonb;
    old_values jsonb;
    user_id text;
BEGIN

    user_id := current_setting('audit.user_id', true);

    IF user_id IS NULL THEN
        user_id := current_user;
    END IF;

    new_values := '{}';
    old_values := '{}';

    IF TG_OP = 'INSERT' THEN
        new_data := to_jsonb(NEW);
        new_values := new_data;

    ELSIF TG_OP = 'UPDATE' THEN
        new_data := to_jsonb(NEW);
        old_data := to_jsonb(OLD);

        FOR key IN SELECT jsonb_object_keys(new_data) INTERSECT SELECT jsonb_object_keys(old_data)
        LOOP
            IF new_data ->> key != old_data ->> key THEN
                new_values := new_values || jsonb_build_object(key, new_data ->> key);
                old_values := old_values || jsonb_build_object(key, old_data ->> key);
            END IF;
        END LOOP;

    ELSIF TG_OP = 'DELETE' THEN
        old_data := to_jsonb(OLD);
        old_values := old_data;

        FOR key IN SELECT jsonb_object_keys(old_data)
        LOOP
            old_values := old_values || jsonb_build_object(key, old_data ->> key);
        END LOOP;

    END IF;

    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, operation_type, changed_by, original_values, new_values)
        VALUES (TG_TABLE_NAME, NEW.username, TG_OP, user_id, old_values, new_values);

        RETURN NEW;
    ELSE
        INSERT INTO audit_log (table_name, record_id, operation_type, changed_by, original_values, new_values)
        VALUES (TG_TABLE_NAME, OLD.username, TG_OP, user_id, old_values, new_values);

        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION society_audit_trigger() RETURNS TRIGGER AS $$
DECLARE
    new_data jsonb;
    old_data jsonb;
    key text;
    new_values jsonb;
    old_values jsonb;
    user_id text;
BEGIN

    user_id := current_setting('audit.user_id', true);

    IF user_id IS NULL THEN
        user_id := current_user;
    END IF;

    new_values := '{}';
    old_values := '{}';

    IF TG_OP = 'INSERT' THEN
        new_data := to_jsonb(NEW);
        new_values := new_data;

    ELSIF TG_OP = 'UPDATE' THEN
        new_data := to_jsonb(NEW);
        old_data := to_jsonb(OLD);

        FOR key IN SELECT jsonb_object_keys(new_data) INTERSECT SELECT jsonb_object_keys(old_data)
        LOOP
            IF new_data ->> key != old_data ->> key THEN
                new_values := new_values || jsonb_build_object(key, new_data ->> key);
                old_values := old_values || jsonb_build_object(key, old_data ->> key);
            END IF;
        END LOOP;

    ELSIF TG_OP = 'DELETE' THEN
        old_data := to_jsonb(OLD);
        old_values := old_data;

        FOR key IN SELECT jsonb_object_keys(old_data)
        LOOP
            old_values := old_values || jsonb_build_object(key, old_data ->> key);
        END LOOP;

    END IF;

    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, operation_type, changed_by, original_values, new_values)
        VALUES (TG_TABLE_NAME, NEW.societyid, TG_OP, user_id, old_values, new_values);

        RETURN NEW;
    ELSE
        INSERT INTO audit_log (table_name, record_id, operation_type, changed_by, original_values, new_values)
        VALUES (TG_TABLE_NAME, OLD.societyid, TG_OP, user_id, old_values, new_values);

        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION ballotitem_audit_trigger() RETURNS TRIGGER AS $$
DECLARE
    new_data jsonb;
    old_data jsonb;
    key text;
    new_values jsonb;
    old_values jsonb;
    user_id text;
BEGIN

    user_id := current_setting('audit.user_id', true);

    IF user_id IS NULL THEN
        user_id := current_user;
    END IF;

    new_values := '{}';
    old_values := '{}';

    IF TG_OP = 'INSERT' THEN
        new_data := to_jsonb(NEW);
        new_values := new_data;

    ELSIF TG_OP = 'UPDATE' THEN
        new_data := to_jsonb(NEW);
        old_data := to_jsonb(OLD);

        FOR key IN SELECT jsonb_object_keys(new_data) INTERSECT SELECT jsonb_object_keys(old_data)
        LOOP
            IF new_data ->> key != old_data ->> key THEN
                new_values := new_values || jsonb_build_object(key, new_data ->> key);
                old_values := old_values || jsonb_build_object(key, old_data ->> key);
            END IF;
        END LOOP;

    ELSIF TG_OP = 'DELETE' THEN
        old_data := to_jsonb(OLD);
        old_values := old_data;

        FOR key IN SELECT jsonb_object_keys(old_data)
        LOOP
            old_values := old_values || jsonb_build_object(key, old_data ->> key);
        END LOOP;

    END IF;

    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, operation_type, changed_by, original_values, new_values)
        VALUES (TG_TABLE_NAME, NEW.itemid, TG_OP, user_id, old_values, new_values);

        RETURN NEW;
    ELSE
        INSERT INTO audit_log (table_name, record_id, operation_type, changed_by, original_values, new_values)
        VALUES (TG_TABLE_NAME, OLD.itemid, TG_OP, user_id, old_values, new_values);

        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION candidate_audit_trigger() RETURNS TRIGGER AS $$
DECLARE
    new_data jsonb;
    old_data jsonb;
    key text;
    new_values jsonb;
    old_values jsonb;
    user_id text;
BEGIN

    user_id := current_setting('audit.user_id', true);

    IF user_id IS NULL THEN
        user_id := current_user;
    END IF;

    new_values := '{}';
    old_values := '{}';

    IF TG_OP = 'INSERT' THEN
        new_data := to_jsonb(NEW);
        new_values := new_data;

    ELSIF TG_OP = 'UPDATE' THEN
        new_data := to_jsonb(NEW);
        old_data := to_jsonb(OLD);

        FOR key IN SELECT jsonb_object_keys(new_data) INTERSECT SELECT jsonb_object_keys(old_data)
        LOOP
            IF new_data ->> key != old_data ->> key THEN
                new_values := new_values || jsonb_build_object(key, new_data ->> key);
                old_values := old_values || jsonb_build_object(key, old_data ->> key);
            END IF;
        END LOOP;

    ELSIF TG_OP = 'DELETE' THEN
        old_data := to_jsonb(OLD);
        old_values := old_data;

        FOR key IN SELECT jsonb_object_keys(old_data)
        LOOP
            old_values := old_values || jsonb_build_object(key, old_data ->> key);
        END LOOP;

    END IF;

    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, operation_type, changed_by, original_values, new_values)
        VALUES (TG_TABLE_NAME, NEW.candidateid, TG_OP, user_id, old_values, new_values);

        RETURN NEW;
    ELSE
        INSERT INTO audit_log (table_name, record_id, operation_type, changed_by, original_values, new_values)
        VALUES (TG_TABLE_NAME, OLD.candidateid, TG_OP, user_id, old_values, new_values);

        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER ballots_audit_log_trigger
    BEFORE INSERT OR UPDATE OR DELETE 
 ON ballots
    FOR EACH ROW
    EXECUTE FUNCTION ballots_audit_trigger(); 


CREATE TRIGGER votes_audit_log_trigger
    BEFORE INSERT OR UPDATE OR DELETE 
 ON votes
    FOR EACH ROW
    EXECUTE FUNCTION votes_audit_trigger(); 

CREATE TRIGGER ballotitem_audit_log_trigger
    BEFORE INSERT OR UPDATE OR DELETE 
 ON ballotitem
    FOR EACH ROW
    EXECUTE FUNCTION ballotitem_audit_trigger(); 

CREATE TRIGGER society_audit_log_trigger
    BEFORE INSERT OR UPDATE OR DELETE 
 ON society
    FOR EACH ROW
    EXECUTE FUNCTION society_audit_trigger(); 

CREATE TRIGGER users_audit_log_trigger
    BEFORE INSERT OR UPDATE OR DELETE 
 ON users
    FOR EACH ROW
    EXECUTE FUNCTION users_audit_trigger(); 

CREATE TRIGGER candidate_audit_log_trigger
    BEFORE INSERT OR UPDATE OR DELETE 
 ON candidate
    FOR EACH ROW
    EXECUTE FUNCTION candidate_audit_trigger(); 



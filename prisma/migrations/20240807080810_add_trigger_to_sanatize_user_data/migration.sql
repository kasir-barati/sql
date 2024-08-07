-- TODO: This function won't sanitize \t, \r, and \n. TBF it was a freaking nightmare to find a real regex for replacing trailing and leading whitespace characters. Therefore I just skipped it :/

-- #region: Function
CREATE OR REPLACE FUNCTION trim_user_data()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS
$$
BEGIN
    NEW.email = TRIM(BOTH ' ' FROM  NEW.email);
    IF NEW.last_name IS NOT NULL THEN
        NEW.last_name = TRIM(BOTH ' ' FROM NEW.last_name);
    END IF;
    IF NEW.first_name IS NOT NULL THEN
        NEW.first_name = TRIM(BOTH ' ' FROM NEW.first_name);
    END IF;
    IF NEW.middle_name IS NOT NULL THEN
        NEW.middle_name = TRIM(BOTH ' ' FROM NEW.middle_name);
    END IF;
    IF NEW.city_id IS NOT NULL THEN
        NEW.city_id = TRIM(BOTH ' ' FROM NEW.city_id);
    END IF;
    return NEW;
END;
$$;
-- #endregion

-- #region: before insert
CREATE OR REPLACE TRIGGER before_insert_trim_user_data_trigger
BEFORE INSERT
ON users
FOR EACH ROW
EXECUTE FUNCTION trim_user_data();
-- #endregion

-- #region: before update
CREATE OR REPLACE TRIGGER before_update_trim_user_data_trigger
BEFORE UPDATE
ON users
FOR EACH ROW
EXECUTE FUNCTION trim_user_data();
-- #endregion
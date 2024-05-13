/* Replace with your SQL commands */
BEGIN

ALTER TABLE project_categories 
ADD COLUMN PRIMARY KEY(id_project, id_category)

COMMIT;
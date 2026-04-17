-- Hero Slides
CREATE TABLE IF NOT EXISTS hero_slides (
  id TEXT PRIMARY KEY,
  badge TEXT NOT NULL,
  title TEXT NOT NULL,
  highlight TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  bg_image_url TEXT NOT NULL,
  primary_cta_label TEXT NOT NULL,
  primary_cta_href TEXT NOT NULL,
  secondary_cta_label TEXT NOT NULL,
  secondary_cta_href TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Product Categories
CREATE TABLE IF NOT EXISTS product_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  order_index INTEGER NOT NULL DEFAULT 0
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  market TEXT,
  specs TEXT,
  image_url TEXT,
  video_url TEXT,
  how_it_works TEXT,
  is_published INTEGER NOT NULL DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Product Features (list items)
CREATE TABLE IF NOT EXISTS product_features (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  text TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product Applications
CREATE TABLE IF NOT EXISTS product_applications (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  text TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product How To Operate (steps)
CREATE TABLE IF NOT EXISTS product_operate_steps (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  text TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Technical Specs (key-value cards)
CREATE TABLE IF NOT EXISTS product_tech_specs (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product Models (for multi-model products like Paddy Husker)
CREATE TABLE IF NOT EXISTS product_models (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  model_name TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Model Spec Columns (table column headers)
CREATE TABLE IF NOT EXISTS model_spec_columns (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  label TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Model Spec Cells (the actual table values)
CREATE TABLE IF NOT EXISTS model_spec_cells (
  id TEXT PRIMARY KEY,
  model_id TEXT NOT NULL,
  column_id TEXT NOT NULL,
  value TEXT NOT NULL,
  FOREIGN KEY (model_id) REFERENCES product_models(id) ON DELETE CASCADE,
  FOREIGN KEY (column_id) REFERENCES model_spec_columns(id) ON DELETE CASCADE
);

-- Product Gallery Images
CREATE TABLE IF NOT EXISTS product_images (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  url TEXT NOT NULL,
  alt TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  num TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  detailed_description TEXT,
  image_url TEXT,
  size TEXT DEFAULT 'sm',
  case_study TEXT,
  icon TEXT DEFAULT 'Globe',
  tag TEXT DEFAULT '',
  is_published INTEGER NOT NULL DEFAULT 1,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Service Features (tags)
CREATE TABLE IF NOT EXISTS service_features (
  id TEXT PRIMARY KEY,
  service_id TEXT NOT NULL,
  text TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Service Benefits
CREATE TABLE IF NOT EXISTS service_benefits (
  id TEXT PRIMARY KEY,
  service_id TEXT NOT NULL,
  text TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Service Process Steps
CREATE TABLE IF NOT EXISTS service_process_steps (
  id TEXT PRIMARY KEY,
  service_id TEXT NOT NULL,
  text TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
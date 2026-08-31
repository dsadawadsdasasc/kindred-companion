CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handle text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  brand text,
  category_slug text NOT NULL,
  price numeric NOT NULL,
  compare_at_price numeric,
  image_url text,
  image_urls text[] NOT NULL DEFAULT '{}',
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT TO anon, authenticated USING (true);

CREATE INDEX products_category_slug_idx ON public.products (category_slug);

INSERT INTO public.products (handle, title, brand, category_slug, price, compare_at_price, stock) VALUES
('samsung-galaxy-s25-ultra-512gb','Samsung Galaxy S25 Ultra 512GB','Samsung','androids',8999.9,9999.0,16),
('xiaomi-15-ultra-512gb','Xiaomi 15 Ultra 512GB','Xiaomi','androids',8099.9,8999.0,24),
('google-pixel-10-pro-256gb','Google Pixel 10 Pro 256GB','Google','androids',7649.9,8499.0,10),
('samsung-galaxy-z-flip7-256gb','Samsung Galaxy Z Flip7 256GB','Samsung','androids',7199.9,7999.0,11),
('samsung-galaxy-s25-256gb','Samsung Galaxy S25+ 256GB','Samsung','androids',6119.9,6799.0,23),
('google-pixel-8a-128gb','Google Pixel 8a 128GB','Google','androids',2999.9,3599.9,12),
('motorola-edge-60-pro-512gb','Motorola Edge 60 Pro 512GB','Motorola','androids',2969.9,3299.0,17),
('samsung-galaxy-s24-fe-256gb','Samsung Galaxy S24 FE 256GB','Samsung','androids',2899.9,3499.9,12),
('motorola-edge-60-fusion-256gb','Motorola Edge 60 Fusion 256GB','Motorola','androids',2699.9,3199.9,12),
('realme-13-pro-plus-256gb','Realme 13 Pro+ 5G 256GB','Realme','androids',2499.9,2999.9,12),
('xiaomi-poco-x7-pro-512gb','Xiaomi Poco X7 Pro 512GB','Xiaomi','androids',2299.9,2799.9,12),
('samsung-galaxy-a36-5g-256gb','Samsung Galaxy A36 5G 256GB','Samsung','androids',1999.9,2499.9,12),
('motorola-edge-50-neo-256gb','Motorola Edge 50 Neo 256GB','Motorola','androids',1799.9,2199.9,12),
('xiaomi-redmi-note-14-256gb','Xiaomi Redmi Note 14 256GB','Xiaomi','androids',1399.9,1699.9,12),
('samsung-galaxy-a16-5g-128gb','Samsung Galaxy A16 5G 128GB','Samsung','androids',1149.9,1399.9,12),
('motorola-moto-g35-5g-128gb','Motorola Moto G35 5G 128GB','Motorola','androids',949.9,1199.9,12),
('playstation-5-pro-2tb','PlayStation 5 Pro 2TB','Sony','consoles',6749.9,7499.99,20),
('steam-deck-oled-1tb','Steam Deck OLED 1TB','Valve','consoles',4949.9,5499.0,15),
('xbox-series-x-1tb','Xbox Series X 1TB','Microsoft','consoles',4229.9,4699.0,14),
('nintendo-switch-2','Nintendo Switch 2','Nintendo','consoles',4049.9,4499.0,8),
('playstation-5-slim-digital','PlayStation 5 Slim Digital','Sony','consoles',3699.9,3799.0,7),
('xbox-series-s-1tb-branco','Xbox Series S 1TB Branco','Microsoft','consoles',2519.9,2799.0,21),
('iphone-18-pro-max-1tb','iPhone 18 Pro Max 1TB','Apple','iphones',19990.9,null,12),
('iphone-17-pro-max-512gb','iPhone 17 Pro Max 512GB — Laranja Cósmico','Apple','iphones',12499.9,null,14),
('iphone-16-pro-256gb','iPhone 16 Pro 256GB','Apple','iphones',7649.9,8499.0,15),
('iphone-16e-128gb','iPhone 16e 128GB','Apple','iphones',4319.9,4799.0,22),
('iphone-15-128gb','iPhone 15 128GB','Apple','iphones',4049.9,4499.0,9),
('macbook-pro-m4-max-16-48gb','MacBook Pro M4 Max 16" 48GB','Apple','macbooks',30599.9,36999.0,5),
('macbook-pro-m4-pro-14-24gb','MacBook Pro M4 Pro 14" 24GB','Apple','macbooks',19899.9,23999.0,18),
('macbook-pro-m4-14-16gb-512gb','MacBook Pro M4 14" 16GB 512GB','Apple','macbooks',14899.9,17999.0,12),
('macbook-air-m4-15-24gb-512gb','MacBook Air M4 15" 24GB 512GB','Apple','macbooks',11599.9,13999.0,11),
('macbook-air-m4-13-16gb-512gb','MacBook Air M4 13" 16GB 512GB','Apple','macbooks',9099.9,10999.0,24),
('macbook-pro-m3-14-8gb-512gb','MacBook Pro M3 14" 8GB 512GB','Apple','macbooks',8699.9,11499.9,12),
('macbook-air-m3-15-8gb-256gb','MacBook Air M3 15" 8GB 256GB','Apple','macbooks',6899.9,8999.9,12),
('macbook-air-m3-13-8gb-256gb','MacBook Air M3 13" 8GB 256GB','Apple','macbooks',6799.9,8299.0,19),
('macbook-air-m2-13-8gb-256gb','MacBook Air M2 13" 8GB 256GB','Apple','macbooks',5499.9,7299.9,12),
('macbook-air-m1-13-8gb-256gb','MacBook Air M1 13" 8GB 256GB','Apple','macbooks',4599.9,6499.9,12),
('monitor-samsung-odyssey-g9-49-240hz','Monitor Samsung Odyssey G9 49" 240Hz','Samsung','monitores',8549.9,9499.0,15),
('monitor-lg-ultragear-oled-27-240hz','Monitor LG UltraGear OLED 27" 240Hz','LG','monitores',5219.9,5799.0,8),
('monitor-dell-ultrasharp-4k-32-ips','Monitor Dell UltraSharp 4K 32" IPS','Dell','monitores',5039.9,5599.0,22),
('monitor-asus-proart-27-4k-calibrado','Monitor ASUS ProArt 27" 4K Calibrado','ASUS','monitores',4319.9,4799.0,16),
('monitor-aoc-agon-27-qhd-180hz','Monitor AOC Agon 27" QHD 180Hz','AOC','monitores',1709.9,1899.0,9),
('monitor-gigabyte-27-qhd-165hz','Monitor Gigabyte 27" QHD 165Hz','Gigabyte','monitores',1394.9,1549.0,23),
('notebook-asus-rog-zephyrus-g14-oled','Notebook ASUS ROG Zephyrus G14 OLED','ASUS','notebooks',14399.9,15999.0,16),
('notebook-dell-xps-14-ultra-7-32gb','Notebook Dell XPS 14 Ultra 7 32GB','Dell','notebooks',13499.9,14999.0,22),
('notebook-lenovo-legion-5i-rtx-5070','Notebook Lenovo Legion 5i RTX 5070','Lenovo','notebooks',10799.9,11999.0,9),
('notebook-acer-nitro-v15-rtx-4060','Notebook Acer Nitro V15 RTX 4060','Acer','notebooks',5849.9,6499.0,23),
('notebook-samsung-book4-i7-16gb','Notebook Samsung Book4 i7 16GB','Samsung','notebooks',4499.9,4999.0,10),
('notebook-lenovo-ideapad-slim-3-ryzen-7','Notebook Lenovo IdeaPad Slim 3 Ryzen 7','Lenovo','notebooks',3149.9,3499.0,17),
('placa-de-video-rtx-5080-16gb','Placa de Vídeo RTX 5080 16GB','NVIDIA','pc',11699.9,12999.0,20),
('pc-gamer-ryzen-7-7800x3d-rtx-5070-ti','PC Gamer Ryzen 7 7800X3D + RTX 5070 Ti','Nova Build','pc',11249.9,12499.0,6),
('placa-de-video-radeon-rx-9070-xt-16gb','Placa de Vídeo Radeon RX 9070 XT 16GB','AMD','pc',6299.9,6999.0,7),
('pc-gamer-intel-i5-14400f-rtx-4060','PC Gamer Intel i5-14400F + RTX 4060','Nova Build','pc',5399.9,5999.0,13),
('processador-ryzen-9-9950x','Processador Ryzen 9 9950X','AMD','pc',4499.9,4999.0,14),
('processador-intel-core-ultra-9-285k','Processador Intel Core Ultra 9 285K','Intel','pc',3959.9,4399.0,21),
('pc-gamer-ryzen-5-rx-6600','PC Gamer Ryzen 5 5600 RX 6600 16GB','Kabum','pc',1999.9,2499.9,12),
('pc-gamer-entrada-i3-gtx-1650','PC Gamer i3 12100F GTX 1650 16GB','Pichau','pc',1899.9,2299.9,12),
('pc-office-ryzen-3-8gb-256gb','PC Office Ryzen 3 5300G 8GB 256GB SSD','Positivo','pc',1099.9,1349.9,12),
('placa-de-video-gtx-1650-4gb','Placa de Vídeo GeForce GTX 1650 4GB GDDR6','Galax','pc',899.9,1099.9,12),
('processador-ryzen-5-5600','Processador AMD Ryzen 5 5600 AM4','AMD','pc',749.9,949.9,12),
('gabinete-pc-lite-athlon-3000g','PC Lite Athlon 3000G 8GB 240GB SSD','Multilaser','pc',699.9,899.9,12),
('headset-steelseries-arctis-nova-pro','Headset SteelSeries Arctis Nova Pro','SteelSeries','perifericos',2249.9,2499.0,18),
('teclado-mecanico-keychron-k8-pro','Teclado Mecânico Keychron K8 Pro','Keychron','perifericos',1034.9,1149.0,11),
('mouse-logitech-g-pro-x-superlight-2','Mouse Logitech G Pro X Superlight 2','Logitech','perifericos',899.9,999.0,24),
('headset-hyperx-cloud-iii-wireless','Headset HyperX Cloud III Wireless','HyperX','perifericos',854.9,949.0,10),
('mouse-razer-deathadder-v3-pro','Mouse Razer DeathAdder V3 Pro','Razer','perifericos',809.9,899.0,5),
('teclado-logitech-mx-keys-s','Teclado Logitech MX Keys S','Logitech','perifericos',809.9,899.0,17),
('apple-watch-ultra-3-titanio-49mm','Apple Watch Ultra 3 Titânio 49mm','Apple','smartwatches',8549.9,9499.0,19),
('apple-watch-series-11-gps-46mm','Apple Watch Series 11 GPS 46mm','Apple','smartwatches',4139.9,4599.0,12),
('garmin-forerunner-265-music','Garmin Forerunner 265 Music','Garmin','smartwatches',3329.9,3699.0,13),
('huawei-watch-gt-5-pro-46mm','Huawei Watch GT 5 Pro 46mm','Huawei','smartwatches',2789.9,3099.0,7),
('samsung-galaxy-watch7-44mm','Samsung Galaxy Watch7 44mm','Samsung','smartwatches',2159.9,2399.0,6),
('amazfit-gtr-4-superspeed','Amazfit GTR 4 Superspeed','Amazfit','smartwatches',1169.9,1299.0,20),
('smart-tv-sony-bravia-8-ii-65','Smart TV Sony BRAVIA 8 II 65"','Sony','televisoes',14399.9,15999.0,19),
('smart-tv-samsung-neo-qled-qn90d-75','Smart TV Samsung Neo QLED QN90D 75"','Samsung','televisoes',13049.9,14499.0,5),
('smart-tv-lg-oled-evo-c5-65','Smart TV LG OLED evo C5 65"','LG','televisoes',11699.9,12999.0,18),
('smart-tv-tcl-qd-mini-led-c755-65','Smart TV TCL QD-Mini LED C755 65"','TCL','televisoes',6749.9,7499.0,12),
('smart-tv-philips-ambilight-the-one-55','Smart TV Philips Ambilight The One 55"','Philips','televisoes',4139.9,4599.0,6),
('smart-tv-samsung-crystal-uhd-du8000-50','Smart TV Samsung Crystal UHD DU8000 50"','Samsung','televisoes',2609.9,2899.0,13),
('smart-tv-samsung-43-crystal-uhd','Smart TV Samsung 43" Crystal UHD 4K','Samsung','televisoes',1999.9,2399.9,12),
('smart-tv-lg-43-4k-uhd-ai','Smart TV LG 43" 4K UHD AI ThinQ','LG','televisoes',1899.9,2299.9,12),
('smart-tv-philco-43-full-hd','Smart TV Philco 43" Full HD Roku TV','Philco','televisoes',1399.9,1699.9,12),
('smart-tv-tcl-32-hd-google-tv','Smart TV TCL 32" HD Google TV','TCL','televisoes',1099.9,1399.9,12);

UPDATE public.products SET image_url = '/products/' || handle || '.jpg';
UPDATE public.products SET description = title || ' — produto oficial ' || brand || ' com garantia de 12 meses, nota fiscal e envio expresso pela Nova Store.';

UPDATE public.products SET description='Pixel 8a com chip Tensor G3, 8GB RAM, 128GB e câmera com IA do Google.' WHERE handle='google-pixel-8a-128gb';
UPDATE public.products SET description='Galaxy S24 FE com Exynos 2400e, 8GB RAM, 256GB, câmera 50MP e Galaxy AI.' WHERE handle='samsung-galaxy-s24-fe-256gb';
UPDATE public.products SET description='Edge 60 Fusion com tela curva pOLED 120Hz, 12GB RAM, 256GB e IP68.' WHERE handle='motorola-edge-60-fusion-256gb';
UPDATE public.products SET description='Realme 13 Pro+ com câmera periscópica 3x, 12GB RAM, 256GB e tela curva AMOLED.' WHERE handle='realme-13-pro-plus-256gb';
UPDATE public.products SET description='Poco X7 Pro com Dimensity 8400, 12GB RAM, 512GB e carga rápida de 90W.' WHERE handle='xiaomi-poco-x7-pro-512gb';
UPDATE public.products SET description='Galaxy A36 5G com Super AMOLED 120Hz, 8GB RAM, 256GB e resistência IP67.' WHERE handle='samsung-galaxy-a36-5g-256gb';
UPDATE public.products SET description='Edge 50 Neo com tela pOLED 6.4", 8GB RAM, 256GB e câmera 50MP com OIS.' WHERE handle='motorola-edge-50-neo-256gb';
UPDATE public.products SET description='Redmi Note 14 com tela AMOLED 120Hz, 8GB RAM, 256GB e câmera de 108MP.' WHERE handle='xiaomi-redmi-note-14-256gb';
UPDATE public.products SET description='Galaxy A16 5G com tela Super AMOLED 6.7", 4GB RAM, 128GB e câmera tripla 50MP.' WHERE handle='samsung-galaxy-a16-5g-128gb';
UPDATE public.products SET description='Moto G35 5G com tela 6.7" 120Hz, 8GB RAM, 128GB e bateria 5000mAh.' WHERE handle='motorola-moto-g35-5g-128gb';
UPDATE public.products SET description='iPhone 18 Pro Max 1TB — o topo de linha da Apple, chip A20 Pro, câmera de 48MP e tela ProMotion de 6,9". Comprando junto com qualquer outro produto Apple você garante 15% de desconto no item adicional.' WHERE handle='iphone-18-pro-max-1tb';
UPDATE public.products SET description='iPhone 17 Pro Max 512GB — produto oficial Apple com garantia de 12 meses, nota fiscal e envio expresso pela Nova Store.' WHERE handle='iphone-17-pro-max-512gb';
UPDATE public.products SET description='MacBook Pro 14" com chip M3, tela Liquid Retina XDR e SSD de 512GB.' WHERE handle='macbook-pro-m3-14-8gb-512gb';
UPDATE public.products SET description='MacBook Air M3 de 15 polegadas com 8GB unificada, SSD 256GB e alto-falantes de seis drivers.' WHERE handle='macbook-air-m3-15-8gb-256gb';
UPDATE public.products SET description='MacBook Air M2 com tela Liquid Retina 13.6", 8GB e SSD 256GB.' WHERE handle='macbook-air-m2-13-8gb-256gb';
UPDATE public.products SET description='MacBook Air com chip M1, 8GB de memória unificada, SSD 256GB e até 18h de bateria.' WHERE handle='macbook-air-m1-13-8gb-256gb';
UPDATE public.products SET description='PC gamer com Ryzen 5 5600, Radeon RX 6600 8GB, 16GB DDR4 e SSD 500GB NVMe.' WHERE handle='pc-gamer-ryzen-5-rx-6600';
UPDATE public.products SET description='PC gamer de entrada com Core i3-12100F, GTX 1650 4GB, 16GB DDR4 e SSD 480GB.' WHERE handle='pc-gamer-entrada-i3-gtx-1650';
UPDATE public.products SET description='Computador para escritório com Ryzen 3 5300G, gráficos Radeon integrados, 8GB e SSD NVMe 256GB.' WHERE handle='pc-office-ryzen-3-8gb-256gb';
UPDATE public.products SET description='Placa de vídeo GTX 1650 4GB GDDR6, dual fan, ideal para jogos em 1080p.' WHERE handle='placa-de-video-gtx-1650-4gb';
UPDATE public.products SET description='Processador Ryzen 5 5600, 6 núcleos e 12 threads, até 4.4GHz, soquete AM4.' WHERE handle='processador-ryzen-5-5600';
UPDATE public.products SET description='PC de entrada com AMD Athlon 3000G, 8GB DDR4 e SSD 240GB. Ideal para estudos, trabalho e navegação.' WHERE handle='gabinete-pc-lite-athlon-3000g';
UPDATE public.products SET description='Smart TV Samsung 43 polegadas Crystal UHD 4K com Tizen, Gaming Hub e HDR.' WHERE handle='smart-tv-samsung-43-crystal-uhd';
UPDATE public.products SET description='Smart TV LG 43 polegadas 4K UHD com processador a5 AI, WebOS e HDR10 Pro.' WHERE handle='smart-tv-lg-43-4k-uhd-ai';
UPDATE public.products SET description='Smart TV 43 polegadas Full HD com Roku TV integrado, Dolby Audio e 3 HDMI.' WHERE handle='smart-tv-philco-43-full-hd';
UPDATE public.products SET description='Smart TV 32 polegadas HD com Google TV, HDR, Wi-Fi e comando de voz.' WHERE handle='smart-tv-tcl-32-hd-google-tv';

UPDATE public.products SET image_urls=ARRAY['/products/iphone-18-pro-max-1tb.jpg','/products/iphone-18-pro-max-1tb-2.jpg','/products/iphone-18-pro-max-1tb-3.jpg']::text[] WHERE handle='iphone-18-pro-max-1tb';
UPDATE public.products SET image_urls=ARRAY['/products/iphone-17-pro-max-512gb.jpg','/products/iphone-17-pro-max-512gb-2.jpg','/products/iphone-17-pro-max-512gb-3.jpg']::text[] WHERE handle='iphone-17-pro-max-512gb';
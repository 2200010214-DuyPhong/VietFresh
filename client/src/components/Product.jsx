import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate, useLocation } from "react-router-dom";

const farmProducts = [
  {id: 1, name: "Lúa", price: 15000, image:"https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c80785cba59a256b57659c0ac9f1a3d1ba41a7293c8d8f68463509382f086649c27d874f9efb0c8972265f49d8f86164867992/cay-lua-8173.jpg", category: "Cây lương thực",},
  {id: 2, name: "Ngô (Bắp)", price: 12000, image:"https://transoceanmart.com/wp-content/uploads/2020/09/bap-my-trai.png", category: "Cây lương thực",},
  {id: 3, name: "Khoai Lang", price: 10000, image:"https://dalatfarm.net/wp-content/uploads/2021/07/khoai-lang-mat-dalat.jpg", category: "Cây lương thực",},
  {id: 4, name: "Khoai Tây", price: 20000, image:"https://kingfoodmart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fsc_pcm_product%2Fprod%2F2023%2F11%2F23%2F18464-8936117057007.jpg&w=3840&q=75", category: "Cây lương thực",},
  {id: 5, name: "Sắn (Mì)", price: 80000, image:"https://media.istockphoto.com/id/1192869169/vi/anh/%C4%91%E1%BB%91i-t%C6%B0%E1%BB%A3ng-duy-nh%E1%BA%A5t-c%E1%BB%A7a-r%E1%BB%85-s%E1%BA%AFn-t%C6%B0%C6%A1i-%C4%91%C6%B0%E1%BB%A3c-ph%C3%A2n-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=612x612&w=0&k=20&c=bEgi92qqfSP-zYVkioCPRHMifvBcCm_vmOs5srXyQec=", category: "Cây lương thực",},
  {id: 6, name: "Lúa mì", price: 25000, image: "https://agrimexco.com.vn/uploadwb/hinhsp/lua_mi_cho_gia_suc_8738201892815_b_.jpg", category: "Cây lương thực" },
  {id: 7, name: "Đại mạch", price: 220000, image: "https://namlimxanh.vn/data/images/dldt/701_dai-mach05.jpg", category: "Cây lương thực" },
  {id: 8, name: "Kê", price: 18000, image: "https://pos.nvncdn.com/110b33-159535/ps/20240505_34lHvVANlW.jpeg?v=1714921729", category: "Cây lương thực" },
  {id: 9, name: "Yến mạch", price: 40000, image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_1_27_638419857238548089_yen-mach-an-lien-1.jpg", category: "Cây lương thực" },
  {id: 10, name: "Gạo nếp", price: 20000, image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_10_12_638327254049921096_gao-nep-0-1.jpg", category: "Cây lương thực" },
  {id: 11, name: "Ngô nếp", price: 15000, image: "https://product.hstatic.net/1000354044/product/boone-county-white-corn__78374_fb494d0e3504439699aac2c36c8763dc_master.jpg", category: "Cây lương thực" },
  {id: 12, name: "Đậu xanh", price: 30000, image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/390/808/products/ddd-47ecea0a-ac73-41fa-9b47-8548e154f4c3.png?v=1592986236187", category: "Cây lương thực" },
  {id: 13, name: "Đậu nành", price: 25000, image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/390/808/products/thuong-thuc-dau-nanh-theo-phong-cach-singapore-1.jpg?v=1592987555860", category: "Cây lương thực" },
  {id: 14, name: "Đậu phộng (lạc)", price: 28000, image: "https://tantanvietnam.com/uploads/phan%20biet%20cac%20loai%20dau%20phong%20(3).jpg", category: "Cây lương thực" },
  {id: 15, name: "Đậu đen", price: 32000, image: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/posts/nuoc-dau-den.webp", category: "Cây lương thực" },
  {id: 16, name: "Cà phê", price: 45000, image: "https://vuicoffee.com/wp-content/uploads/2019/11/cafe-hat-2.png", category: "Cây công nghiệp"},
  {id: 17, name: "Hồ tiêu", price: 90000, image: "https://ngovina.com/wp-content/uploads/2019/05/tieu-500x500.jpg", category: "Cây công nghiệp"},
  {id: 18, name: "Cao su", price: 25000, image: "https://mtcs.1cdn.vn/2023/01/13/go-cao-su-1-.png", category: "Cây công nghiệp"},
  {id: 19, name: "Mía", price: 8000, image: "https://hpi.com.vn/wp-content/uploads/2024/05/xac-dinh-chu-duong-mia-2.jpg", category: "Cây công nghiệp"},
  {id: 20, name: "Bông vải", price: 30000, image: "https://pubcdn.ivymoda.com/files/news/2022/07/06/3b3d3c70d672447d9f8ecc76c4ca424f.png", category: "Cây công nghiệp"},
  {id: 21, name: "Chè (Trà)", price: 60000, image: "https://baothainguyen.vn/file/oldimage/baothainguyen/UserFiles/image/tra_xanh.jpg(1).jpg", category: "Cây công nghiệp"},
  {id: 22, name: "Điều", price: 70000, image: "https://tantanvietnam.com/uploads/vo%20hat%20dieu%20(1).jpg", category: "Cây công nghiệp"},
  {id: 23, name: "Ca cao", price: 85000, image: "https://nafarm.vn/upload/images/bot-ca-cao-cocoa-powder-vietfarmfood-0938828553.jpg", category: "Cây công nghiệp"},
  {id: 24, name: "Dừa", price: 20000, image: "https://tfruit.com.vn/wp-content/uploads/2020/03/qu%E1%BA%A3-d%E1%BB%ABa.jpg", category: "Cây công nghiệp"},
  {id: 25, name: "Thuốc lá", price: 50000, image: "https://caycanhhaidang.com/wp-content/uploads/2025/07/Thuoc-la-2.jpg", category: "Cây công nghiệp"},
  {id: 26, name: "Cói", price: 15000, image: "https://png.pngtree.com/background/20230825/original/pngtree-fresh-papyrus-plants-leaf-leaves-green-photo-picture-image_4814449.jpg", category: "Cây công nghiệp"},
  {id: 27, name: "Đay", price: 18000, image: "https://thuocdantoc.vn/wp-content/uploads/2020/05/rau-day2.jpg", category: "Cây công nghiệp"},
  {id: 28, name: "Cây sơn", price: 25000, image: "https://bvnguyentriphuong.com.vn/uploads/images/cac_chuyen_khoa/YHCT/cay-son-1.jpg", category: "Cây công nghiệp"},
  {id: 29, name: "Bạch đàn", price: 22000, image: "https://caygiong4s.com/wp-content/uploads/Tinh-dau-bach-dan-khuynh-diep-e1699759482317.jpg", category: "Cây công nghiệp"},
  {id: 30, name: "Keo", price: 20000, image: "https://lh3.googleusercontent.com/proxy/iEwODrhBv_qKKbLM_3AnImvRFgQ9wIlfesAZdpUREYpY8r-b7qd7debF8kTN8IMqAhiYn3Xcv81ky_ZRZ8Xwcy4QAKHsqA", category: "Cây công nghiệp"},
  {id: 31, name: "Cà rốt", price: 15000, image: "https://dalatfarm.net/wp-content/uploads/2023/10/ca-rat-da-lat.jpg", category: "Rau – củ – quả ngắn ngày"},
  {id: 32, name: "Củ cải trắng", price: 12000, image: "https://mountain-farmers.com/wp-content/uploads/2024/01/cu-cai-trang-1.jpg", category: "Rau – củ – quả ngắn ngày"},
  {id: 33, name: "Hành tím", price: 40000, image: "https://product.hstatic.net/200000692807/product/14641-384041674003812-1674003812--400x400_dba757dd67924867bc9362209e64c62a_grande.png", category: "Rau – củ – quả ngắn ngày"},
  {id: 34, name: "Hành tây", price: 25000, image: "https://product.hstatic.net/1000282430/product/onion_w_105f3ff9c4564348869b084bcfe7a9f0_ccdc22fd01cf46298d3d162e066399a2_master.jpg", category: "Rau – củ – quả ngắn ngày"},
  {id: 35, name: "Tỏi", price: 50000, image: "https://hoithankinhhocvietnam.com.vn/vnna-media/24/6/6/4-cach-chua-mat-ngu-bang-toi-vo-cung-don-gian--de.jpg", category: "Rau – củ – quả ngắn ngày"},
  {id: 36, name: "Rau muống", price: 10000, image: "https://bizweb.dktcdn.net/100/011/344/files/rau-muong-bao-nhieu-calo-1-0965c347-b7c5-4af3-bf44-683e8435538a.jpg?v=1697539341064", category: "Rau – củ – quả ngắn ngày"},
  {id: 37, name: "Cải ngọt", price: 12000, image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/390/808/products/cai-thia.png?v=1592814808273", category: "Rau – củ – quả ngắn ngày"},
  {id: 38, name: "Cải thìa", price: 10000, image: "https://fresco.vn/public/upload/product/cai-ngot-thuy-canh-hsxNzHwGZn.jpg", category: "Rau – củ – quả ngắn ngày"},
  {id: 39, name: "Bắp cải", price: 12000, image: "https://product.hstatic.net/200000423303/product/bap-cai-huu-co_203a09f5391b4cb59bbad82f94c1cd7d.jpg", category: "Rau – củ – quả ngắn ngày"},
  {id: 40, name: "Súp lơ", price: 15000, image: "https://lh3.googleusercontent.com/Iikzf7utMQJ73BIhnWDqPGX4Ky9904yr0gzbFTIzENAJAB3LD-3MDghlL348x3qtvMSq55nxK9X3w9Pued6fx7_nt2w9EFU=rw", category: "Rau – củ – quả ngắn ngày"},
  {id: 41, name: "Mồng tơi", price: 9000, image: "https://hatgiongphuongnam.com/asset/upload/image/hat-giong-rau-mong-toi-1.8_.png?v=20190410", category: "Rau – củ – quả ngắn ngày"},
  {id: 42, name: "Rau dền", price: 7000, image: "https://bizweb.dktcdn.net/100/382/694/products/752d07b5-29bc-4418-af7b-2d2ede0aee05.jpg?v=1675558589917", category: "Rau – củ – quả ngắn ngày"},
  {id: 43, name: "Rau ngót", price: 9000, image: "https://syun.vn/574-large_default/rau-ngot-250g.jpg", category: "Rau – củ – quả ngắn ngày"},
  {id: 44, name: "Xà lách", price: 9000, image: "https://www.vinmec.com/static/uploads/medium_20210106_041321_793265_hat_giong_rau_xa_la_max_1800x1800_jpg_c51fb39d72.jpg", category: "Rau – củ – quả ngắn ngày"},
  {id: 45, name: "Cà chua", price: 12000, image: "https://bactom.com/wp-content/uploads/2020/09/ca-chua.jpg", category: "Rau – củ – quả ngắn ngày"},
  {id: 46, name: "Dưa leo", price: 10000, image: "https://cdn.tgdd.vn/Products/Images/8785/226881/bhx/dua-leo-vi-500g-202009292350248147.jpg", category: "Rau – củ – quả ngắn ngày"},
  {id: 47, name: "Bí đỏ", price: 12000, image: "https://bizweb.dktcdn.net/100/390/808/products/bi-do.jpg?v=1592640500230", category: "Rau – củ – quả ngắn ngày"},
  {id: 48, name: "Bí đao", price: 10000, image: "https://product.hstatic.net/200000423303/product/bi_dao_huu_co_3ebe99c919104e6bae55cdc2473c318f.png", category: "Rau – củ – quả ngắn ngày"},
  {id: 49, name: "Mướp hương", price: 9000, image: "https://product.hstatic.net/200000423303/product/muop-huong-huu-co_b05e2487404246fdaefea6a0a854ae02_1024x1024.jpg", category: "Rau – củ – quả ngắn ngày"},
  {id: 50, name: "Khổ qua", price: 15000, image: "https://product.hstatic.net/200000423303/product/kho-qua-huu-co_6465f3e31e9e4c9c97fbb803604bf6c7_1024x1024.jpg", category: "Rau – củ – quả ngắn ngày"},
  {id: 51, name: "Chuối", price: 15000, image: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/14/chuoi1-16341869574602070184903.jpg", category: "Cây ăn quả"},
  {id: 52, name: "Xoài", price: 30000, image: "https://cdn-i.vtcnews.vn/resize/th/upload/2023/09/10/xoaichin-15570645.jpeg", category: "Cây ăn quả"},
  {id: 53, name: "Mít", price: 25000, image: "https://lh3.googleusercontent.com/FCxg7VFDQziUUZS9X2wRVbV-Cr0eKANyuAefsPupHIPtxJ9eCTyHSVit8ki2vP2N48b76wO4Qu9f5aict2KVazmVMxZBWGrQ", category: "Cây ăn quả"},
  {id: 54, name: "Dứa", price: 15000, image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/11/17/766605/Tac-Dung-Giam-Can-Hi.jpg", category: "Cây ăn quả"},
  {id: 55, name: "Cam", price: 35000, image: "https://nafarm.vn/timthumb.php?src=upload/images/cam-vang-uc-1kg-dac-san-nafarm.jpg&w=500&h=0&zc=1&a=tc", category: "Cây ăn quả"},
  {id: 56, name: "Quýt", price: 30000, image: "https://product.hstatic.net/200000423303/product/add_a_heading_621dd70c6c774ae199664686060bc4e9.jpg", category: "Cây ăn quả"},
  {id: 57, name: "Bưởi", price: 40000, image: "https://thiensafoods.com/upload/product/buoi-da-xanh-ruot-do-5018.jpg", category: "Cây ăn quả"},
  {id: 58, name: "Chanh", price: 12000, image: "https://product.hstatic.net/200000423303/product/chanh-khong-hat-huu-co_05795cd8857144a1af04a42b2b19e97f.jpg", category: "Cây ăn quả"},
  {id: 59, name: "Ổi", price: 20000, image: "https://media-cdn-v2.laodong.vn/uploaded/phamthuhien/2015_07_25/qua%20oi%20(2)_unpq.jpg", category: "Cây ăn quả"},
  {id: 60, name: "Na (mãng cầu ta)", price: 25000, image: "https://www.lottemart.vn/media/catalog/product/6/3/632d5e74921c1.jpg", category: "Cây ăn quả"},
  {id: 61, name: "Mãng cầu xiêm", price: 30000, image: "https://images2.thanhnien.vn/528068263637045248/2023/6/30/mang-cau-xiem-16881301424631692033494.jpg", category: "Cây ăn quả"},
  {id: 62, name: "Dưa hấu", price: 10000, image: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/6/19/dua-hau-giong-my-tui-2kg-2021071016125311551-16556534088771758641220.jpg", category: "Cây ăn quả"},
  {id: 63, name: "Thanh long", price: 20000, image: "https://www.lottemart.vn/media/catalog/product/cache/0x0/2/2/2274090000006-1.jpg.webp", category: "Cây ăn quả"},
  {id: 64, name: "Vải", price: 35000, image: "https://shop.annam-gourmet.com/pub/media/catalog/product/cache/ee0af4cad0f3673c5271df64bd520339/i/t/item_F202590_3d03.jpg", category: "Cây ăn quả"},
  {id: 65, name: "Nhãn", price: 30000, image: "https://www.locthanhan.vn/upload/sanpham/nhan-que-93.jpg", category: "Cây ăn quả"},
  {id: 66, name: "Chôm chôm", price: 25000, image: "https://hoptacxathanhbinh.com/wp-content/uploads/2023/08/rambutan.png", category: "Cây ăn quả"},
  {id: 67, name: "Táo", price: 20000, image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/tao_Gala_6db66bd1f1.jpg", category: "Cây ăn quả"},
  {id: 68, name: "Mận (roi)", price: 15000, image: "https://binhdienonline.com/thumbs_size/product/2021_03/man-roi/[550x550-cr]mandoi-50.jpg", category: "Cây ăn quả"},
  {id: 69, name: "Sapôchê (hồng xiêm)", price: 25000, image: "https://www.lottemart.vn/media/catalog/product/cache/0x0/2/2/2275920000005-3.jpg.webp", category: "Cây ăn quả"},
  {id: 70, name: "Sầu riêng", price: 80000, image: "https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d7094837cc74bf7fa74a8a72bb3409577e4d2ee19ba46cfacb4ff4789e403b4b1da354cc81f3f88e2a4f022bec09873f1ca6cdfbe10251c45cc8ffc759c27faed57336b969a7d87df528358cae0c1d26b188e25e7c01b3faa2e09aa7d8c4a75d7f392d/sau_rieng_9_cong_dung_tuyet_voi_de_ban_khong_ngai_an_241617187_AITM.jpg", category: "Cây ăn quả"},
  {id: 71, name: "Gừng", price: 40000, image: "https://media.baobinhphuoc.com.vn/upload/news/10_2021/e1f9ae795430bd6ee421_19155809102021.jpeg", category: "Cây gia vị – dược liệu"},
  {id: 72, name: "Nghệ", price: 30000, image: "https://cafefcdn.com/203337114487263232/2024/11/29/dung-chi-an-cu-la-loai-cay-nay-quy-nhu-nhan-sam-nguoi-ngheo-mam-com-nha-nao-cung-co-9-1732851494631490329442-1732889695685-1732889696334380000186.jpg", category: "Cây gia vị – dược liệu"},
  {id: 73, name: "Riềng", price: 25000, image: "https://product.hstatic.net/1000282430/product/cu-rieng-ecoveg_0d10c1ebd32242f489497fcdb27572e9_master.jpg", category: "Cây gia vị – dược liệu"},
  {id: 74, name: "Sả", price: 20000, image: "https://product.hstatic.net/200000271661/product/64fe734ee9cf499b98e73b375d6483e8_f32d94995e4747329ff0b56ef659de5f_large.png", category: "Cây gia vị – dược liệu"},
  {id: 75, name: "Ớt", price: 35000, image: "https://product.hstatic.net/200000423303/product/ot-hiem-huu-co_a6c54b2368ce4072b749bfa06ed3a959.jpg", category: "Cây gia vị – dược liệu"},
  {id: 76, name: "Húng quế", price: 15000, image: "https://www.hasfarmgreens.com/wp-content/uploads/2023/03/492515c73137e269bb26.jpg", category: "Cây gia vị – dược liệu"},
  {id: 77, name: "Rau răm", price: 12000, image: "https://baokhanhhoa.vn/file/e7837c02857c8ca30185a8c39b582c03/062023/10-6.1_20230610081934.jpg", category: "Cây gia vị – dược liệu"},
  {id: 78, name: "Ngò gai", price: 10000, image: "https://anphatfarm.com/wp-content/uploads/2023/05/hg-ngo-gai.png", category: "Cây gia vị – dược liệu"},
  {id: 79, name: "Hành lá", price: 12000, image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/9/30/840429/Hanh-La-Tot-Suc-Khoe.jpg", category: "Cây gia vị – dược liệu"},
  {id: 80, name: "Tía tô", price: 15000, image: "https://xanhviet.vn/images/products/tiato.jpg", category: "Cây gia vị – dược liệu"},
  {id: 81, name: "Thịt heo", price: 120000, image: "https://cdn.tgdd.vn/Files/2016/12/29/931650/cach-chon-va-bao-quan-thit-heo-202201151133218208.jpg", category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp"},
  {id: 82, name: "Thịt bò", price: 220000, image: "https://fohlafood.vn/cdn/shop/articles/1-1683857652-150-width800height550.jpg?v=1732018733", category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp"},
  {id: 83, name: "Thịt gà", price: 100000, image: "https://fresco.vn/public/upload/product/thit-ga-co-tanh-khong-3-DBgIXBPTgf.jpg", category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp"},
  {id: 84, name: "Trứng gà", price: 40000, image: "https://vcdn1-vnexpress.vnecdn.net/2015/02/14/eggs-03-4600-1423905018.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=-LOXs3weRBly1zyvg5kVWQ", category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp"},
  {id: 85, name: "Trứng vịt", price: 30000, image: "https://hn.check.net.vn/data/product/mainimages/original/product16121.jpg", category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp"},
  {id: 86, name: "Sữa bò", price: 25000, image: "https://bizweb.dktcdn.net/100/144/367/articles/sua-tuoi-edd60355-d601-4684-b461-0ffa984eb6f4.jpg?v=1611374579213", category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp"},
  {id: 87, name: "Cá tra", price: 60000, image: "https://thuysanvietnam.com.vn/wp-content/uploads/2024/08/2731_gia-ca-tra-100900_962.jpg", category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp"},
  {id: 88, name: "Cá rô phi", price: 50000, image: "https://bizweb.dktcdn.net/thumb/grande/100/418/667/products/140.png?v=1719465175817", category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp"},
  {id: 89, name: "Tôm", price: 150000, image: "https://www.lottemart.vn/media/catalog/product/cache/0x0/2/2/2240000000008-1.jpg.webp", category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp"},
  {id: 90, name: "Mật ong", price: 200000, image: "https://resource.kinhtedothi.vn/2022/11/11/ef368b79a91d573f1531b57440b8bb62.jpg", category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp"}
];

function Product() {
  const itemsPerPage = 15;
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]); 
  const params = new URLSearchParams(location.search);
  const categoryFromURL = params.get("category") || "Tất cả";

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [message, setMessage] = useState("");

  const categories = ["Tất cả", ...new Set(farmProducts.map((p) => p.category))];

  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    const cat = newParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [location.search]);

  const filteredProducts =
    selectedCategory === "Tất cả"
      ? farmProducts
      : farmProducts.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    const newParams = new URLSearchParams(location.search);
    if (category === "Tất cả") newParams.delete("category");
    else newParams.set("category", category);
    navigate({ search: newParams.toString() });
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

const addToCart = (product) => {
  setCart(prevCart => {
    const existingItem = prevCart.find(item => item.id === product.id);
    if (existingItem) {
      // tăng số lượng nếu đã có
      return prevCart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // thêm mới với quantity = 1
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};

  return (
    <>
      <Header />

      {message && (
        <div className="fixed top-24 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md animate-fadeIn z-50">
          {message}
        </div>
      )}

      <section className="container mx-auto px-4 mt-28 mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-700">
          Sản Phẩm Nông Sản Sạch
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full border font-medium transition ${
                selectedCategory === cat
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-700 border-green-400 hover:bg-green-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {currentItems.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="rounded-lg bg-white shadow-md p-4 flex flex-col gap-3 hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg object-cover aspect-square"
              />
              <p className="font-semibold text-gray-900 truncate">{product.name}</p>
              <p className="text-green-600 font-semibold">
                {product.price.toLocaleString("vi-VN")}đ
              </p>
              <p className="text-sm text-gray-500 italic">
                Phân loại:{" "}
                <span className="text-green-600 font-medium">{product.category}</span>
              </p>
              <button
                onClick={(e) => addToCart(e, product)}
                className="bg-green-500 text-white rounded-md py-1 hover:bg-green-600 transition"
              >
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-10 gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded-md font-medium ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-green-400 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            &gt;
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Product;

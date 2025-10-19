import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // Thêm import này
import Header from "./Header";
import Footer from "./Footer";

const farmProducts = [
   {
    id: 1,
    name: "Lúa",
    price: 15000,
    image:
      "https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c80785cba59a256b57659c0ac9f1a3d1ba41a7293c8d8f68463509382f086649c27d874f9efb0c8972265f49d8f86164867992/cay-lua-8173.jpg",
    category: "Cây lương thực",
    description:
      "Cây lương thực chính của Việt Nam, trồng nhiều ở đồng bằng sông Cửu Long, dùng để sản xuất gạo. Loại cây này là nguồn tinh bột chính của người Việt, dễ trồng và cho năng suất cao. Phổ biến ở miền Nam và đồng bằng Bắc Bộ, được dùng để nấu cơm, làm bún và bánh truyền thống.",
    purchased: 3240,
    rating: 4.8,
    features: [
      "Thời gian sinh trưởng: 95–120 ngày tùy giống.",
      "Chiều cao trung bình: 90–110 cm.",
      "Năng suất: 5–8 tấn/ha.",
      "Thích hợp với khí hậu nhiệt đới ẩm.",
      "Cần nhiều nước, đặc biệt trong giai đoạn trổ bông.",
      "Có thể chế biến thành nhiều sản phẩm như gạo, bún, bánh, rượu,...",
    ],
  },
  {
    id: 2,
    name: "Ngô (Bắp)",
    price: 12000,
    image: "https://transoceanmart.com/wp-content/uploads/2020/09/bap-my-trai.png",
    category: "Cây lương thực",
    description:
      "Là nguồn lương thực phổ biến, dùng làm thức ăn cho người và gia súc, trồng nhiều ở miền Bắc và Tây Nguyên. Cây có hạt vàng, chứa nhiều tinh bột và dinh dưỡng. Trồng rộng ở miền Bắc và Tây Nguyên, thường dùng luộc, nướng hoặc xay làm bột và thức ăn chăn nuôi.",
    purchased: 2875,
    rating: 4.6,
    features: [
      "Thời gian sinh trưởng: 85–110 ngày.",
      "Chiều cao cây: 1,5–2,5 mét.",
      "Năng suất trung bình: 6–9 tấn/ha.",
      "Phù hợp với vùng đất cao, thoát nước tốt.",
      "Cần nhiều ánh sáng và nhiệt độ 25–33°C.",
      "Là nguyên liệu sản xuất thực phẩm và thức ăn chăn nuôi.",
    ],
  },
  {
    id: 3,
    name: "Khoai Lang",
    price: 10000,
    image: "https://dalatfarm.net/wp-content/uploads/2021/07/khoai-lang-mat-dalat.jpg",
    category: "Cây lương thực",
    description:
      "Củ giàu tinh bột, vị ngọt tự nhiên, được trồng rộng rãi tại miền Trung và Tây Nguyên. Khoai lang có vị ngọt, ruột vàng hoặc tím, dễ trồng và chịu hạn tốt. Trồng phổ biến ở miền Trung và Tây Nguyên, thường dùng để luộc, nướng hoặc làm bánh.",
    purchased: 2150,
    rating: 4.7,
    features: [
      "Thời gian sinh trưởng: 90–120 ngày.",
      "Thích hợp trồng ở đất tơi xốp, thoát nước tốt.",
      "Nhiệt độ lý tưởng: 22–30°C.",
      "Năng suất trung bình: 10–15 tấn/ha.",
      "Củ chứa nhiều tinh bột, chất xơ và vitamin A.",
      "Được sử dụng để chế biến nhiều món ăn truyền thống.",
    ],
  },
  {
    id: 4,
    name: "Khoai Tây",
    price: 20000,
    image: "https://kingfoodmart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fsc_pcm_product%2Fprod%2F2023%2F11%2F23%2F18464-8936117057007.jpg&w=3840&q=75",
    category: "Cây lương thực",
    description:
      "Cây trồng vụ đông, chủ yếu tại Đà Lạt và các vùng khí hậu mát, dùng để chế biến thực phẩm. Loại củ giàu tinh bột, vỏ vàng hoặc nâu nhạt. Phổ biến ở vùng khí hậu mát miền Bắc và Đà Lạt, thường dùng chiên, nấu súp hoặc làm món ăn nhanh.",
    purchased: 3400,
    rating: 4.8,
    features: [
      "Thời gian sinh trưởng: 85–100 ngày.",
      "Phù hợp với vùng khí hậu mát, độ cao trung bình.",
      "Nhiệt độ sinh trưởng tối ưu: 18–25°C.",
      "Năng suất trung bình: 15–20 tấn/ha.",
      "Giàu tinh bột, vitamin C, B6 và khoáng chất.",
      "Dễ bảo quản và vận chuyển, ứng dụng công nghiệp thực phẩm.",
    ],
  },
  {
    id: 5,
    name: "Sắn (Mì)",
    price: 80000,
    image: "https://media.istockphoto.com/id/1192869169/vi/anh/%C4%91%E1%BB%91i-t%C6%B0%E1%BB%A3ng-duy-nh%E1%BA%A5t-c%E1%BB%A7a-r%E1%BB%85-s%E1%BA%AFn-t%C6%B0%C6%A1i-%C4%91%C6%B0%E1%BB%A3c-ph%C3%A2n-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=612x612&w=0&k=20&c=bEgi92qqfSP-zYVkioCPRHMifvBcCm_vmOs5srXyQec=",
    category: "Cây lương thực",
    description:
      "Cây trồng phổ biến ở miền Trung và Tây Nguyên, cung cấp tinh bột cho công nghiệp và xuất khẩu. Cây có củ dài, vỏ nâu, ruột trắng, chứa nhiều tinh bột. Trồng phổ biến ở miền Trung và Tây Nguyên, dùng để chế biến tinh bột, bánh, hoặc nấu chè.",
    purchased: 1980,
    rating: 4.5,
    features: [
      "Thời gian sinh trưởng: 8–12 tháng.",
      "Phù hợp với vùng đất cát pha, thoát nước tốt.",
      "Chịu hạn tốt, ít sâu bệnh.",
      "Năng suất trung bình: 20–30 tấn/ha.",
      "Nguồn tinh bột dồi dào, ứng dụng công nghiệp và thực phẩm.",
      "Là cây trồng kinh tế chủ lực ở vùng trung du, miền núi.",
    ],
  },
  {
    id: 6,
    name: "Lúa mì",
    price: 25000,
    image: "https://agrimexco.com.vn/uploadwb/hinhsp/lua_mi_cho_gia_suc_8738201892815_b_.jpg",
    category: "Cây lương thực",
    description:
      "Nguồn nguyên liệu chính để sản xuất bột mì, ít trồng ở Việt Nam nhưng nhập khẩu nhiều. Loại cây này là nguồn tinh bột chính của người Việt, dễ trồng và cho năng suất cao. Phổ biến ở miền Nam và đồng bằng Bắc Bộ.",
    purchased: 5100,
    rating: 4.9,
    features: [
      "Thời gian sinh trưởng: 100–130 ngày.",
      "Thích hợp với khí hậu ôn đới, đất mùn, tơi xốp.",
      "Năng suất trung bình: 5–7 tấn/ha.",
      "Giàu protein, vitamin B, chất xơ.",
      "Nguồn nguyên liệu chính sản xuất bột mì, bánh mì, mì ống.",
      "Là cây trồng quan trọng hàng đầu trong ngành lương thực toàn cầu.",
    ],
  },
  {
    id: 7,
    name: "Đại mạch",
    price: 220000,
    image: "https://namlimxanh.vn/data/images/dldt/701_dai-mach05.jpg",
    category: "Cây lương thực",
    description:
      "Đại mạch là loại ngũ cốc có thân cứng, hạt dài màu vàng nâu, giàu tinh bột và khoáng chất. Cây sinh trưởng tốt ở vùng khí hậu mát, thường được trồng ở miền Bắc và các vùng cao nguyên.",
    purchased: 1450,
    rating: 4.7,
    features: [
      "Thời gian sinh trưởng: 90–120 ngày.",
      "Phù hợp vùng khí hậu ôn hòa, mát mẻ.",
      "Năng suất trung bình: 4–6 tấn/ha.",
      "Giàu chất xơ hòa tan, tốt cho hệ tiêu hóa.",
      "Là nguyên liệu chính trong sản xuất bia và ngũ cốc ăn sáng.",
      "Có khả năng chịu lạnh tốt hơn lúa mì.",
    ],
  },
  {
    id: 8,
    name: "Kê",
    price: 18000,
    image: "https://pos.nvncdn.com/110b33-159535/ps/20240505_34lHvVANlW.jpeg?v=1714921729",
    category: "Cây lương thực",
    description:
      "Kê là loại cây lương thực có hạt nhỏ, màu vàng nhạt, giàu tinh bột và khoáng chất, rất dễ trồng và chịu hạn tốt. Cây thường được trồng ở các vùng đất khô của miền Trung và Tây Nguyên, nơi có khí hậu nóng và ít mưa.",
    purchased: 1320,
    rating: 4.6,
    features: [
      "Thời gian sinh trưởng: 70–100 ngày.",
      "Chịu hạn tốt, thích hợp đất khô cằn.",
      "Năng suất trung bình: 3–5 tấn/ha.",
      "Giàu protein, sắt, magiê và chất xơ.",
      "Phù hợp chế biến cháo, bánh, và thực phẩm chức năng.",
      "Là cây ngũ cốc cổ truyền được trồng ở nhiều vùng châu Á.",
    ],
  },
  {
    id: 9,
    name: "Yến mạch",
    price: 40000,
    image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_1_27_638419857238548089_yen-mach-an-lien-1.jpg",
    category: "Cây lương thực",
    description:
      "Yến mạch là loại ngũ cốc có hạt dài, màu vàng nhạt, chứa nhiều chất xơ và protein tốt cho sức khỏe. Cây thích hợp trồng ở vùng khí hậu mát mẻ, chủ yếu ở miền Bắc và các khu vực cao nguyên của Việt Nam. Hạt yến mạch thường được dùng để nấu cháo, làm ngũ cốc ăn sáng, bánh quy hoặc dùng trong các chế độ ăn lành mạnh.",
    purchased: 2760,
    rating: 4.9,
    features: [
      "Thời gian sinh trưởng: 85–110 ngày.",
      "Thích hợp với vùng khí hậu mát, ẩm nhẹ.",
      "Giàu chất xơ hòa tan beta-glucan giúp giảm cholesterol.",
      "Cung cấp protein thực vật chất lượng cao.",
      "Là thành phần chính của ngũ cốc ăn sáng và sữa yến mạch.",
      "Được coi là siêu thực phẩm tốt cho sức khỏe tim mạch.",
    ],
  },
  {
    id: 10,
    name: "Gạo nếp",
    price: 20000,
    image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_10_12_638327254049921096_gao-nep-0-1.jpg",
    category: "Cây lương thực",
    description:
      "Gạo nếp là loại lúa có hạt tròn, màu trắng đục, dẻo và thơm đặc trưng khi nấu chín. Cây nếp được trồng phổ biến ở miền Bắc và miền Tây Nam Bộ, nơi có điều kiện đất ẩm và nhiều nước. Gạo nếp thường dùng để nấu xôi, làm bánh chưng, bánh tét, chè và các món truyền thống trong dịp lễ Tết.",
    purchased: 4900,
    rating: 4.8,
    features: [
      "Thời gian sinh trưởng: 100–120 ngày.",
      "Hạt tròn, trắng đục, dẻo và dính khi nấu chín.",
      "Năng suất trung bình: 5–7 tấn/ha.",
      "Giàu tinh bột, ít protein hơn gạo tẻ.",
      "Phù hợp dùng trong các món truyền thống: xôi, bánh chưng, chè,...",
      "Thích hợp trồng ở vùng đồng bằng và trung du Bắc Bộ.",
    ],
  },
    {
    id: 11,
    name: "Ngô nếp",
    price: 15000,
    image: "https://product.hstatic.net/1000354044/product/boone-county-white-corn__78374_fb494d0e3504439699aac2c36c8763dc_master.jpg",
    category: "Cây lương thực",
    description: "Loại bắp dẻo, thơm, dùng làm thực phẩm ăn liền, phổ biến khắp cả nước. Cây có hạt vàng, chứa nhiều tinh bột và dinh dưỡng. Trồng rộng ở miền Bắc và Tây Nguyên, thường dùng luộc, nướng hoặc xay làm bột và thức ăn chăn nuôi.",
    purchased: 2700,
    rating: 4.8,
    features: [
      "Thời gian sinh trưởng: 75–90 ngày.",
      "Hạt ngô mềm, dẻo và có vị ngọt đặc trưng.",
      "Phù hợp trồng ở vùng đồng bằng và trung du.",
      "Năng suất trung bình: 5–8 tấn/ha.",
      "Dùng làm thực phẩm tươi, ngô luộc, ngô nướng, ngô đóng hộp.",
      "Giàu tinh bột, đường và vitamin nhóm B.",
    ],
  },
  {
    id: 12,
    name: "Đậu xanh",
    price: 30000,
    image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/390/808/products/ddd-47ecea0a-ac73-41fa-9b47-8548e154f4c3.png?v=1592986236187",
    category: "Cây lương thực",
    description: "Là loại cây họ đậu có hạt nhỏ màu xanh lục, vỏ mỏng và nhân vàng, được trồng phổ biến ở các vùng đồng bằng và trung du Việt Nam như miền Bắc, Tây Nguyên và đồng bằng sông Cửu Long. Cây chịu hạn tốt, thời gian sinh trưởng ngắn nên thích hợp với nhiều loại đất khác nhau. Hạt đậu xanh thường được dùng để nấu chè, làm bánh, giá đỗ hoặc chế biến các món ăn bổ dưỡng, giúp thanh nhiệt và tốt cho sức khỏe.",
    purchased: 1950,
    rating: 4.7,
    features: [
      "Thời gian sinh trưởng: 60–75 ngày.",
      "Thích hợp với khí hậu nhiệt đới, đất tơi xốp.",
      "Năng suất trung bình: 1,2–2 tấn/ha.",
      "Giàu protein, chất xơ, sắt và vitamin B.",
      "Hạt được dùng nấu chè, làm giá đỗ và bột dinh dưỡng.",
      "Có khả năng cải tạo đất nhờ vi khuẩn cố định đạm.",
    ],
  },
  {
    id: 13,
    name: "Đậu nành",
    price: 25000,
    image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/390/808/products/thuong-thuc-dau-nanh-theo-phong-cach-singapore-1.jpg?v=1592987555860",
    category: "Cây lương thực",
    description: "Đậu nành là loại cây họ đậu có hạt nhỏ, màu vàng nhạt, giàu đạm và dầu thực vật. Cây thích hợp trồng ở vùng đất phù sa màu mỡ thuộc miền Bắc và miền Trung Việt Nam. Hạt đậu nành thường được dùng để chế biến sữa, đậu hũ, tương, hoặc làm nguyên liệu sản xuất dầu ăn và thực phẩm dinh dưỡng.",
    purchased: 3180,
    rating: 4.9,
    features: [
      "Thời gian sinh trưởng: 80–100 ngày.",
      "Phù hợp với khí hậu ôn hòa, đất phù sa nhẹ.",
      "Năng suất trung bình: 1,5–2,5 tấn/ha.",
      "Giàu protein thực vật, chất béo, canxi và isoflavone.",
      "Là nguyên liệu chính để sản xuất sữa đậu nành, đậu phụ, tương, bột protein.",
      "Có vai trò quan trọng trong luân canh cây trồng để cải tạo đất.",
    ],
  },
  {
    id: 14,
    name: "Đậu phộng (lạc)",
    price: 28000,
    image: "https://tantanvietnam.com/uploads/phan%20biet%20cac%20loai%20dau%20phong%20(3).jpg",
    category: "Cây lương thực",
    description: "Đậu phộng (lạc) là cây họ đậu có hạt nhỏ, vỏ cứng màu nâu nhạt, giàu dầu và đạm thực vật. Cây thường được trồng ở miền Trung và miền Nam, nơi có đất cát pha và khí hậu nóng ẩm. Hạt đậu phộng dùng để rang, ép dầu, làm bánh, kẹo và nhiều món ăn dân dã quen thuộc.",
    purchased: 2870,
    rating: 4.8,
    features: [
      "Thời gian sinh trưởng: 90–110 ngày.",
      "Thích hợp trồng ở vùng đất cát pha, thoát nước tốt.",
      "Năng suất trung bình: 2–3 tấn/ha.",
      "Hạt chứa 45–50% dầu, 25% protein.",
      "Được dùng để ép dầu ăn, làm bơ đậu phộng, kẹo, snack.",
      "Là cây trồng xen canh phổ biến để cải tạo đất.",
    ],
  },
  {
    id: 15,
    name: "Đậu đen",
    price: 32000,
    image: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/posts/nuoc-dau-den.webp",
    category: "Cây lương thực",
    description: "Đậu đen là loại đậu hạt nhỏ, vỏ đen bóng, chứa nhiều chất xơ, protein và khoáng chất tốt cho sức khỏe. Cây được trồng phổ biến ở miền Bắc và miền Trung, thích hợp với đất tơi xốp và thoát nước tốt. Hạt đậu đen thường dùng để nấu chè, hầm với thịt, hoặc nấu nước uống thanh mát giải nhiệt.",
    purchased: 2100,
    rating: 4.7,
    features: [
      "Thời gian sinh trưởng: 70–90 ngày.",
      "Thích hợp với đất tơi xốp, khí hậu ấm.",
      "Năng suất trung bình: 1,5–2,2 tấn/ha.",
      "Giàu chất chống oxy hóa anthocyanin, sắt, protein và chất xơ.",
      "Dùng trong chế biến chè, nước uống, thực phẩm chay.",
      "Có tác dụng hỗ trợ tim mạch và giảm cholesterol.",
    ],
  },
  {
    id: 16,
    name: "Cà phê",
    price: 45000,
    image: "https://vuicoffee.com/wp-content/uploads/2019/11/cafe-hat-2.png",
    category: "Cây công nghiệp",
    description: "Cà phê là cây công nghiệp lâu năm, có hạt nhỏ màu nâu sẫm, chứa nhiều caffeine và hương thơm đặc trưng. Cây được trồng nhiều ở vùng Tây Nguyên với khí hậu mát và đất đỏ bazan. Hạt cà phê sau khi rang xay được dùng để pha chế đồ uống nổi tiếng của Việt Nam.",
    purchased: 6800,
    rating: 4.9,
    features: [
      "Thời gian sinh trưởng: 3–4 năm để bắt đầu thu hoạch.",
      "Thích hợp với vùng cao nguyên, khí hậu mát, đất bazan màu mỡ.",
      "Năng suất trung bình: 2–3 tấn nhân/ha.",
      "Chứa caffeine tự nhiên giúp tỉnh táo, tập trung.",
      "Là cây xuất khẩu chủ lực của Việt Nam (đặc biệt là cà phê Robusta).",
      "Cần chế biến và rang xay cẩn thận để đạt hương vị tối ưu.",
    ],
  },
  {
    id: 17,
    name: "Hồ tiêu",
    price: 90000,
    image: "https://ngovina.com/wp-content/uploads/2019/05/tieu-500x500.jpg",
    category: "Cây công nghiệp",
    description: "Hồ tiêu là cây dây leo thân gỗ, cho quả nhỏ tròn màu xanh khi non và đen khi chín. Cây thích hợp với khí hậu nhiệt đới, được trồng nhiều ở miền Trung và Tây Nguyên. Hạt tiêu dùng làm gia vị tạo vị cay và thơm cho món ăn, đồng thời có tác dụng kích thích tiêu hóa.",
    purchased: 1450,
    rating: 4.6,
    features: [
      "Thời gian sinh trưởng: 3–5 năm mới cho thu hoạch.",
      "Thích hợp trồng ở vùng khí hậu nhiệt đới ẩm, đất đỏ bazan.",
      "Năng suất trung bình: 2–3 tấn hạt khô/ha.",
      "Là loại gia vị phổ biến, có giá trị xuất khẩu cao.",
      "Chứa nhiều tinh dầu, piperine, giúp kích thích tiêu hóa.",
      "Cần giàn leo và chăm sóc tỉ mỉ để đạt năng suất cao.",
    ],
  },
  {
    id: 18,
    name: "Cao su",
    price: 25000,
    image: "https://mtcs.1cdn.vn/2023/01/13/go-cao-su-1-.png",
    category: "Cây công nghiệp",
    description: "Cây cao su là cây công nghiệp lấy mủ, thân cao, lá xanh bóng, dễ trồng ở vùng khí hậu nóng ẩm. Cây được trồng nhiều ở miền Đông Nam Bộ và Tây Nguyên. Mủ cao su được dùng làm nguyên liệu sản xuất săm lốp, găng tay và nhiều sản phẩm công nghiệp khác.",
    purchased: 1980,
    rating: 4.5,
    features: [
      "Thời gian sinh trưởng: 6–7 năm bắt đầu khai thác mủ.",
      "Thích hợp vùng khí hậu nhiệt đới gió mùa, đất đỏ bazan.",
      "Tuổi thọ cây: 25–30 năm khai thác.",
      "Mủ cao su được dùng sản xuất lốp xe, găng tay, vật liệu công nghiệp.",
      "Gỗ cao su còn dùng trong sản xuất nội thất, sàn gỗ.",
      "Cần kỹ thuật cạo mủ và bảo quản mủ đúng cách để đạt hiệu quả kinh tế cao.",
    ],
  },
  {
    id: 19,
    name: "Mía",
    price: 8000,
    image: "https://hpi.com.vn/wp-content/uploads/2024/05/xac-dinh-chu-duong-mia-2.jpg",
    category: "Cây công nghiệp",
    description: "Cây thân cao, mọng nước, có vị ngọt tự nhiên và là nguyên liệu chính để sản xuất đường. Cây được trồng phổ biến ở miền Tây Nam Bộ và Bắc Trung Bộ. Ngoài ép lấy nước uống, mía còn được sử dụng trong công nghiệp chế biến và làm rượu.",
    purchased: 3240,
    rating: 4.7,
    features: [
      "Thời gian sinh trưởng: 10–14 tháng.",
      "Thích hợp trồng ở vùng đất phù sa, ẩm, thoát nước tốt.",
      "Năng suất trung bình: 70–100 tấn/ha.",
      "Nguồn nguyên liệu chính để sản xuất đường, cồn, và rượu.",
      "Cây mía giúp cải thiện cấu trúc đất và hấp thụ CO₂ hiệu quả.",
      "Có thể trồng xen canh để tăng hiệu quả sử dụng đất.",
    ],
  },
  {
    id: 20,
    name: "Bông vải",
    price: 30000,
    image: "https://pubcdn.ivymoda.com/files/news/2022/07/06/3b3d3c70d672447d9f8ecc76c4ca424f.png",
    category: "Cây công nghiệp",
    description: "Là cây công nghiệp ngắn ngày, cho quả chứa nhiều sợi bông trắng mềm mịn. Cây thích hợp trồng ở miền Bắc và duyên hải miền Trung. Sợi bông được dùng để dệt vải, may mặc và làm vật liệu trong công nghiệp dệt may.",
    purchased: 1670,
    rating: 4.6,
    features: [
      "Thời gian sinh trưởng: 150–180 ngày.",
      "Phù hợp vùng khô nóng, đất tơi xốp, thoát nước tốt.",
      "Năng suất trung bình: 2–3 tấn bông/ha.",
      "Sợi bông là nguyên liệu chính cho ngành dệt may.",
      "Cây cho hạt có thể ép dầu và làm thức ăn gia súc.",
      "Là cây công nghiệp lâu đời có giá trị kinh tế cao.",
    ],
  },
  {
  id: 21,
  name: "Chè (Trà)",
  price: 60000,
  image: "https://baothainguyen.vn/file/oldimage/baothainguyen/UserFiles/image/tra_xanh.jpg(1).jpg",
  category: "Cây công nghiệp",
  description:
    "Loại cây công nghiệp có lá xanh đậm, chứa nhiều hợp chất tạo vị đắng và hương thơm tự nhiên. Cây được trồng chủ yếu ở miền núi phía Bắc và Tây Nguyên. Lá chè được hái, phơi, sấy khô để pha trà – một thức uống quen thuộc của người Việt.",
  purchased: 5400,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 3–4 năm sau khi trồng.",
    "Phù hợp vùng đồi núi, khí hậu mát ẩm như Thái Nguyên, Lâm Đồng.",
    "Năng suất: 8–12 tấn búp tươi/ha/năm.",
    "Lá trà chứa caffeine và chất chống oxy hóa mạnh.",
    "Sản phẩm đa dạng: trà xanh, trà đen, trà ô long.",
  ],
},
{
  id: 22,
  name: "Điều",
  price: 70000,
  image: "https://tantanvietnam.com/uploads/vo%20hat%20dieu%20(1).jpg",
  category: "Cây công nghiệp",
  description:
    "Cây công nghiệp lâu năm, có quả màu vàng hoặc đỏ, hạt chứa nhân béo ngậy. Cây phát triển tốt ở vùng đất khô, nhiều nắng của miền Nam và Tây Nguyên. Hạt điều được rang, sấy hoặc chế biến thành các sản phẩm xuất khẩu có giá trị cao.",
  purchased: 6200,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 3 năm sau khi trồng.",
    "Năng suất trung bình: 1–1.5 tấn hạt khô/ha.",
    "Hạt điều chứa nhiều protein, chất béo lành mạnh.",
    "Thích hợp khí hậu khô nóng, đất cát pha hoặc đất đỏ bazan.",
    "Là cây xuất khẩu chủ lực của Việt Nam.",
  ],
},
{
  id: 23,
  name: "Ca cao",
  price: 85000,
  image: "https://nafarm.vn/upload/images/bot-ca-cao-cocoa-powder-vietfarmfood-0938828553.jpg",
  category: "Cây công nghiệp",
  description:
    "Là cây công nghiệp thân gỗ nhỏ, cho quả có hạt dùng để sản xuất chocolate. Cây thích hợp trồng ở vùng khí hậu ẩm, được canh tác nhiều ở miền Đông Nam Bộ và Tây Nguyên. Hạt ca cao được lên men, phơi khô rồi chế biến thành bột, bơ hoặc sô-cô-la.",
  purchased: 3900,
  rating: 4.7,
  features: [
    "Thời gian thu hoạch: 3–5 năm sau khi trồng.",
    "Ưa khí hậu nóng ẩm, mưa nhiều.",
    "Hạt ca cao chứa flavonoid có lợi cho tim mạch.",
    "Cần tỉa cành, che bóng và tưới nước định kỳ.",
    "Giá trị kinh tế cao, phục vụ xuất khẩu.",
  ],
},
{
  id: 24,
  name: "Dừa",
  price: 20000,
  image: "https://tfruit.com.vn/wp-content/uploads/2020/03/qu%E1%BA%A3-d%E1%BB%ABa.jpg",
  category: "Cây công nghiệp",
  description:
    "Cây dừa là cây thân cao, lá dài, cho quả có nhiều công dụng từ nước đến cùi. Dừa được dùng để chế biến thực phẩm, đồ uống và các sản phẩm mỹ phẩm, thủ công.",
  purchased: 8200,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 4–6 năm.",
    "Năng suất: 80–100 quả/cây/năm.",
    "Trồng nhiều tại Bến Tre, Trà Vinh, Bình Định.",
    "Sử dụng trong chế biến thực phẩm, dầu, mỹ phẩm.",
    "Dừa xiêm ngọt được ưa chuộng nhất hiện nay.",
  ],
},
{
  id: 25,
  name: "Thuốc lá",
  price: 50000,
  image: "https://caycanhhaidang.com/wp-content/uploads/2025/07/Thuoc-la-2.jpg",
  category: "Cây công nghiệp",
  description:
    "Cây thuốc lá được trồng để lấy lá làm nguyên liệu sản xuất thuốc hút, thuốc lào, và các sản phẩm công nghiệp khác.",
  purchased: 2100,
  rating: 4.3,
  features: [
    "Thời gian sinh trưởng: 3–4 tháng.",
    "Thích hợp vùng khí hậu ấm áp, khô ráo.",
    "Cần quản lý sâu bệnh chặt chẽ.",
    "Được trồng nhiều ở Bắc Giang, Thanh Hóa, Đồng Nai.",
    "Yêu cầu đất tơi xốp, giàu dinh dưỡng.",
  ],
},
{
  id: 26,
  name: "Cói",
  price: 15000,
  image: "https://png.pngtree.com/background/20230825/original/pngtree-fresh-papyrus-plants-leaf-leaves-green-photo-picture-image_4814449.jpg",
  category: "Cây công nghiệp",
  description:
    "Cói là loại cây thân thảo, được dùng làm nguyên liệu sản xuất chiếu, thảm, túi xách và đồ thủ công mỹ nghệ.",
  purchased: 4500,
  rating: 4.6,
  features: [
    "Thời gian thu hoạch: 4–5 tháng.",
    "Trồng nhiều ở Ninh Bình, Thanh Hóa.",
    "Ưa đất ẩm ven sông, đầm lầy.",
    "Thân dài, dai, dễ dệt thành sợi.",
    "Cung cấp nguyên liệu cho ngành thủ công truyền thống.",
  ],
},
{
  id: 27,
  name: "Đay",
  price: 18000,
  image: "https://thuocdantoc.vn/wp-content/uploads/2020/05/rau-day2.jpg",
  category: "Cây công nghiệp",
  description:
    "Cây đay được trồng để lấy sợi làm bao tải, dây thừng, vải bố và các sản phẩm dệt sợi khác.",
  purchased: 3700,
  rating: 4.5,
  features: [
    "Chu kỳ sinh trưởng: 100–120 ngày.",
    "Thích hợp vùng khí hậu nhiệt đới, đất phù sa.",
    "Sợi đay có độ bền cao, dễ nhuộm màu.",
    "Đay được trồng xen canh với lúa ở miền Bắc Việt Nam.",
    "Ứng dụng trong công nghiệp dệt và thủ công mỹ nghệ.",
  ],
},
{
  id: 28,
  name: "Cây sơn",
  price: 25000,
  image: "https://bvnguyentriphuong.com.vn/uploads/images/cac_chuyen_khoa/YHCT/cay-son-1.jpg",
  category: "Cây công nghiệp",
  description:
    "Cây sơn cho nhựa dùng trong sản xuất sơn mài truyền thống, là nguyên liệu quý của ngành mỹ nghệ Việt Nam.",
  purchased: 2600,
  rating: 4.6,
  features: [
    "Thời gian thu hoạch: 6–7 năm.",
    "Trồng chủ yếu ở Phú Thọ, Yên Bái.",
    "Nhựa sơn có giá trị kinh tế cao.",
    "Phù hợp vùng đất đồi ẩm, thoát nước tốt.",
    "Là nguyên liệu chính cho nghề sơn mài truyền thống.",
  ],
},
{
  id: 29,
  name: "Bạch đàn",
  price: 22000,
  image: "https://caygiong4s.com/wp-content/uploads/Tinh-dau-bach-dan-khuynh-diep-e1699759482317.jpg",
  category: "Cây công nghiệp",
  description:
    "Cây bạch đàn là cây lâm nghiệp phát triển nhanh, cung cấp gỗ, tinh dầu và được trồng phổ biến để phủ xanh đất trống.",
  purchased: 4900,
  rating: 4.7,
  features: [
    "Thời gian thu hoạch: 5–7 năm.",
    "Tăng trưởng nhanh, chịu hạn tốt.",
    "Thích hợp đất nghèo dinh dưỡng.",
    "Cung cấp nguyên liệu làm giấy và đồ gỗ.",
    "Tinh dầu bạch đàn dùng trong y học và công nghiệp.",
  ],
},
{
  id: 30,
  name: "Keo",
  price: 20000,
  image: "https://lh3.googleusercontent.com/proxy/iEwODrhBv_qKKbLM_3AnImvRFgQ9wIlfesAZdpUREYpY8r-b7qd7debF8kTN8IMqAhiYn3Xcv81ky_ZRZ8Xwcy4QAKHsqA",
  category: "Cây công nghiệp",
  description:
    "Cây keo là loại cây lâm nghiệp được trồng rộng rãi để lấy gỗ, nguyên liệu sản xuất giấy và đồ nội thất.",
  purchased: 5100,
  rating: 4.8,
  features: [
    "Chu kỳ thu hoạch: 5–8 năm.",
    "Sinh trưởng nhanh, dễ trồng.",
    "Cải thiện đất, chống xói mòn.",
    "Gỗ keo được dùng làm giấy và đồ nội thất.",
    "Trồng phổ biến ở miền Trung và Tây Nguyên.",
  ],
},
{
  id: 31,
  name: "Cà rốt",
  price: 15000,
  image: "https://dalatfarm.net/wp-content/uploads/2023/10/ca-rat-da-lat.jpg",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Cà rốt là loại củ chứa nhiều vitamin A, tốt cho thị lực và da, được trồng phổ biến ở vùng khí hậu mát mẻ.",
  purchased: 7300,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 90–100 ngày.",
    "Trồng nhiều ở Đà Lạt, Hải Dương.",
    "Ưa đất tơi xốp, thoát nước tốt.",
    "Cung cấp beta-carotene và vitamin A.",
    "Dùng trong món xào, nấu, nước ép, salad.",
  ],
},
{
  id: 32,
  name: "Củ cải trắng",
  price: 12000,
  image: "https://mountain-farmers.com/wp-content/uploads/2024/01/cu-cai-trang-1.jpg",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Củ cải trắng là loại rau củ mát, giúp thanh nhiệt, giải độc và hỗ trợ tiêu hóa tốt.",
  purchased: 6800,
  rating: 4.7,
  features: [
    "Thời gian thu hoạch: 60–70 ngày.",
    "Thích hợp vùng khí hậu mát.",
    "Giàu vitamin C và chất xơ.",
    "Dễ trồng, năng suất cao.",
    "Thường được dùng nấu canh, muối chua, salad.",
  ],
},
{
  id: 33,
  name: "Hành tím",
  price: 40000,
  image: "https://product.hstatic.net/200000692807/product/14641-384041674003812-1674003812--400x400_dba757dd67924867bc9362209e64c62a_grande.png",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Hành tím là loại gia vị quen thuộc, có hương thơm và vị cay nhẹ, giúp kích thích tiêu hóa và tăng hương vị món ăn.",
  purchased: 5900,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 80–90 ngày.",
    "Trồng nhiều ở Sóc Trăng, Vĩnh Châu.",
    "Chứa chất kháng khuẩn tự nhiên.",
    "Bảo quản lâu, dễ vận chuyển.",
    "Sử dụng phổ biến trong chế biến thực phẩm.",
  ],
},
{
  id: 34,
  name: "Hành tây",
  price: 25000,
  image: "https://product.hstatic.net/1000282430/product/onion_w_105f3ff9c4564348869b084bcfe7a9f0_ccdc22fd01cf46298d3d162e066399a2_master.jpg",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Hành tây có vị ngọt nhẹ, thường được dùng trong nhiều món ăn Âu – Á, đồng thời chứa nhiều chất chống oxy hóa.",
  purchased: 8100,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 100–120 ngày.",
    "Thích hợp đất tơi xốp, nhiều nắng.",
    "Giàu vitamin C, B6 và chất chống oxy hóa.",
    "Giúp giảm cholesterol, tốt cho tim mạch.",
    "Dễ bảo quản, vận chuyển xa.",
  ],
},
{
  id: 35,
  name: "Tỏi",
  price: 50000,
  image: "https://hoithankinhhocvietnam.com.vn/vnna-media/24/6/6/4-cach-chua-mat-ngu-bang-toi-vo-cung-don-gian--de.jpg",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Tỏi là loại gia vị quý có tính kháng khuẩn mạnh, giúp tăng sức đề kháng và phòng ngừa bệnh tim mạch.",
  purchased: 9400,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 4–5 tháng.",
    "Trồng nhiều ở Lý Sơn, Hải Dương.",
    "Chứa allicin có tác dụng kháng khuẩn mạnh.",
    "Tăng sức đề kháng, tốt cho tim mạch.",
    "Dễ bảo quản, dùng quanh năm.",
  ],
},
{
  id: 36,
  name: "Rau muống",
  price: 10000,
  image: "https://bizweb.dktcdn.net/100/011/344/files/rau-muong-bao-nhieu-calo-1-0965c347-b7c5-4af3-bf44-683e8435538a.jpg?v=1697539341064",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Rau muống là loại rau phổ biến, dễ trồng, có vị ngọt mát, thường được dùng trong các món luộc, xào, nấu canh.",
  purchased: 7800,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 25–30 ngày.",
    "Phù hợp trồng quanh năm, nhất là mùa hè.",
    "Giàu sắt, vitamin A và C.",
    "Có tác dụng thanh nhiệt, giải độc cơ thể.",
    "Dễ trồng, năng suất cao, ít sâu bệnh.",
  ],
},
{
  id: 37,
  name: "Cải ngọt",
  price: 12000,
  image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/390/808/products/cai-thia.png?v=1592814808273",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Cải ngọt là loại rau lá xanh, vị thanh mát, được sử dụng phổ biến trong món xào, nấu canh hoặc ăn lẩu.",
  purchased: 6400,
  rating: 4.7,
  features: [
    "Thời gian thu hoạch: 35–40 ngày.",
    "Thích hợp trồng vụ đông xuân.",
    "Giàu vitamin C, A và chất xơ.",
    "Dễ trồng, phát triển nhanh.",
    "Giúp tăng sức đề kháng và hỗ trợ tiêu hóa.",
  ],
},
{
  id: 38,
  name: "Cải thìa",
  price: 10000,
  image: "https://fresco.vn/public/upload/product/cai-ngot-thuy-canh-hsxNzHwGZn.jpg",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Cải thìa (bok choy) là loại rau thuộc họ cải, lá xanh đậm, cuống trắng giòn, có vị ngọt thanh, dễ ăn.",
  purchased: 5800,
  rating: 4.7,
  features: [
    "Thời gian thu hoạch: 30–35 ngày.",
    "Ưa khí hậu mát, đất tơi xốp.",
    "Giàu vitamin K, C, canxi và chất chống oxy hóa.",
    "Thường dùng trong món xào, luộc, lẩu.",
    "Dễ trồng, năng suất cao.",
  ],
},
{
  id: 39,
  name: "Bắp cải",
  price: 12000,
  image: "https://product.hstatic.net/200000423303/product/bap-cai-huu-co_203a09f5391b4cb59bbad82f94c1cd7d.jpg",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Bắp cải là loại rau họ thập tự, có lá cuộn tròn, giòn, vị ngọt nhẹ, dùng để xào, nấu canh hoặc muối chua.",
  purchased: 9100,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 90–100 ngày.",
    "Ưa khí hậu mát mẻ, trồng nhiều ở Đà Lạt.",
    "Giàu vitamin C, K và chất xơ.",
    "Giúp tăng sức đề kháng và giảm cholesterol.",
    "Có thể bảo quản lâu sau thu hoạch.",
  ],
},
{
  id: 40,
  name: "Súp lơ",
  price: 15000,
  image: "https://lh3.googleusercontent.com/Iikzf7utMQJ73BIhnWDqPGX4Ky9904yr0gzbFTIzENAJAB3LD-3MDghlL348x3qtvMSq55nxK9X3w9Pued6fx7_nt2w9EFU=rw",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Súp lơ (bông cải) là loại rau có hoa trắng hoặc xanh, chứa nhiều vitamin và chất chống oxy hóa, rất tốt cho sức khỏe.",
  purchased: 8500,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 70–80 ngày.",
    "Thích hợp trồng ở vùng khí hậu mát.",
    "Giàu vitamin C, folate và chất xơ.",
    "Tốt cho tim mạch và hệ miễn dịch.",
    "Thường được dùng luộc, xào hoặc nấu canh.",
  ],
},
{
  id: 41,
  name: "Mồng tơi",
  price: 9000,
  image: "https://hatgiongphuongnam.com/asset/upload/image/hat-giong-rau-mong-toi-1.8_.png?v=20190410",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Rau mồng tơi là loại rau leo phổ biến, có vị nhớt nhẹ, dùng nấu canh mát và bổ dưỡng.",
  purchased: 6700,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 35–40 ngày.",
    "Phù hợp trồng vào mùa mưa.",
    "Giàu sắt, vitamin A, C và chất nhầy tốt cho tiêu hóa.",
    "Thường dùng nấu canh với tôm, cua.",
    "Giúp thanh nhiệt, giải độc, làm mát cơ thể.",
  ],
},
{
  id: 42,
  name: "Rau dền",
  price: 7000,
  image: "https://bizweb.dktcdn.net/100/382/694/products/752d07b5-29bc-4418-af7b-2d2ede0aee05.jpg?v=1675558589917",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Rau dền là loại rau dân dã, có màu xanh hoặc tím, vị ngọt, giàu sắt và canxi, tốt cho máu.",
  purchased: 5500,
  rating: 4.7,
  features: [
    "Thời gian thu hoạch: 25–30 ngày.",
    "Thích hợp trồng vào mùa hè.",
    "Giàu sắt, canxi, vitamin A và C.",
    "Hỗ trợ tạo máu, làm mát gan.",
    "Thường dùng để nấu canh hoặc luộc.",
  ],
},
{
  id: 43,
  name: "Rau ngót",
  price: 9000,
  image: "https://syun.vn/574-large_default/rau-ngot-250g.jpg",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Rau ngót là loại rau lá xanh đậm, giàu vitamin và khoáng chất, thường dùng nấu canh giải nhiệt, thanh mát.",
  purchased: 7200,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 2–3 tháng sau khi trồng.",
    "Có thể thu hoạch nhiều lần trong năm.",
    "Giàu vitamin C, A và chất xơ.",
    "Giúp thanh nhiệt, lợi sữa, hạ huyết áp.",
    "Trồng phổ biến ở miền Bắc Việt Nam.",
  ],
},
{
  id: 44,
  name: "Xà lách",
  price: 9000,
  image: "https://www.vinmec.com/static/uploads/medium_20210106_041321_793265_hat_giong_rau_xa_la_max_1800x1800_jpg_c51fb39d72.jpg",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Xà lách là loại rau sống phổ biến, có vị giòn, thanh mát, thường dùng trong salad hoặc ăn kèm món nướng, cuốn.",
  purchased: 8600,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 40–45 ngày.",
    "Ưa khí hậu mát, dễ trồng.",
    "Giàu vitamin K, A và chất xơ.",
    "Tốt cho tiêu hóa và làn da.",
    "Thường dùng trong món salad, cuốn, burger.",
  ],
},
{
  id: 45,
  name: "Cà chua",
  price: 12000,
  image: "https://bactom.com/wp-content/uploads/2020/09/ca-chua.jpg",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Cà chua là loại quả giàu lycopene – chất chống oxy hóa mạnh, được dùng phổ biến trong nhiều món ăn.",
  purchased: 9700,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 80–100 ngày.",
    "Thích hợp khí hậu mát, nhiều nắng.",
    "Giàu vitamin C, A và lycopene.",
    "Giúp sáng da, tốt cho tim mạch.",
    "Dùng trong món salad, nước ép, nấu canh, xào.",
  ],
},
{
  id: 46,
  name: "Dưa leo",
  price: 10000,
  image: "https://cdn.tgdd.vn/Products/Images/8785/226881/bhx/dua-leo-vi-500g-202009292350248147.jpg",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Dưa leo là loại rau quả phổ biến, có vị thanh mát, giòn ngon, thường dùng ăn sống hoặc làm gỏi, salad.",
  purchased: 9400,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 45–50 ngày.",
    "Thích hợp trồng vụ xuân và hè.",
    "Giàu vitamin C, nước và chất chống oxy hóa.",
    "Tốt cho da và hệ tiêu hóa.",
    "Thường dùng trong món salad, muối chua, ăn sống.",
  ],
},
{
  id: 47,
  name: "Bí đỏ",
  price: 12000,
  image: "https://bizweb.dktcdn.net/100/390/808/products/bi-do.jpg?v=1592640500230",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Bí đỏ (bí ngô) là loại thực phẩm giàu dinh dưỡng, vị ngọt bùi, tốt cho mắt và hệ miễn dịch.",
  purchased: 8800,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 80–100 ngày.",
    "Thích hợp trồng vào đầu mùa khô.",
    "Giàu vitamin A, E, chất xơ và kali.",
    "Hỗ trợ giảm cân, cải thiện thị lực.",
    "Dùng nấu canh, hầm, làm bánh hoặc súp.",
  ],
},
{
  id: 48,
  name: "Bí đao",
  price: 10000,
  image: "https://product.hstatic.net/200000423303/product/bi_dao_huu_co_3ebe99c919104e6bae55cdc2473c318f.png",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Bí đao là loại quả xanh dài, có tác dụng thanh nhiệt, giảm cân và làm đẹp da.",
  purchased: 7300,
  rating: 4.7,
  features: [
    "Thời gian thu hoạch: 60–70 ngày.",
    "Ưa khí hậu ấm, dễ trồng.",
    "Giàu nước, vitamin C và chất xơ.",
    "Hỗ trợ giảm cân và làm mát cơ thể.",
    "Thường dùng trong món canh, luộc, xào.",
  ],
},
{
  id: 49,
  name: "Mướp hương",
  price: 9000,
  image: "https://product.hstatic.net/200000423303/product/muop-huong-huu-co_b05e2487404246fdaefea6a0a854ae02_1024x1024.jpg",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Mướp hương là loại quả có mùi thơm đặc trưng, vị ngọt, mát, được dùng phổ biến trong các món canh, xào.",
  purchased: 6900,
  rating: 4.7,
  features: [
    "Thời gian thu hoạch: 60 ngày.",
    "Ưa nắng, cần giàn leo khi trồng.",
    "Giàu nước, vitamin C và khoáng chất.",
    "Giúp thanh nhiệt, giải độc cơ thể.",
    "Thường dùng nấu canh hoặc xào với tôm, thịt.",
  ],
},
{
  id: 50,
  name: "Khổ qua",
  price: 15000,
  image: "https://product.hstatic.net/200000423303/product/kho-qua-huu-co_6465f3e31e9e4c9c97fbb803604bf6c7_1024x1024.jpg",
  category: "Rau – củ – quả ngắn ngày",
  description:
    "Khổ qua (mướp đắng) có vị đắng đặc trưng, giàu dinh dưỡng, giúp hạ đường huyết và thanh nhiệt cơ thể.",
  purchased: 8100,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 60–70 ngày.",
    "Ưa nắng, dễ trồng, năng suất cao.",
    "Giàu vitamin C, A và chất chống oxy hóa.",
    "Giúp thanh lọc máu, hỗ trợ giảm cân.",
    "Dùng trong món xào, canh nhồi thịt, hầm xương.",
  ],
},
{
  id: 51,
  name: "Chuối",
  price: 15000,
  image: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/14/chuoi1-16341869574602070184903.jpg",
  category: "Cây ăn quả",
  description:
    "Chuối là loại quả phổ biến, dễ trồng, có vị ngọt, mềm, chứa nhiều kali và năng lượng.",
  purchased: 15000,
  rating: 5.0,
  features: [
    "Thời gian thu hoạch: 9–12 tháng.",
    "Trồng được quanh năm, thích hợp vùng nhiệt đới.",
    "Giàu kali, vitamin B6 và chất xơ.",
    "Tốt cho tim mạch và tiêu hóa.",
    "Dùng ăn tươi, làm bánh hoặc chế biến sấy khô.",
  ],
},
{
  id: 52,
  name: "Xoài",
  price: 30000,
  image: "https://cdn-i.vtcnews.vn/resize/th/upload/2023/09/10/xoaichin-15570645.jpeg",
  category: "Cây ăn quả",
  description:
    "Xoài là loại trái cây nhiệt đới, vị ngọt thơm, chứa nhiều vitamin và chất chống oxy hóa.",
  purchased: 12700,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 3–5 năm sau trồng.",
    "Thích hợp vùng khí hậu nóng ẩm.",
    "Giàu vitamin C, A và folate.",
    "Tốt cho da và hệ miễn dịch.",
    "Có nhiều giống: xoài cát, xoài keo, xoài tượng.",
  ],
},
{
  id: 53,
  name: "Mít",
  price: 25000,
  image: "https://lh3.googleusercontent.com/FCxg7VFDQziUUZS9X2wRVbV-Cr0eKANyuAefsPupHIPtxJ9eCTyHSVit8ki2vP2N48b76wO4Qu9f5aict2KVazmVMxZBWGrQ",
  category: "Cây ăn quả",
  description:
    "Mít là loại quả nhiệt đới có hương thơm mạnh, vị ngọt bùi, chứa nhiều năng lượng và vitamin.",
  purchased: 9800,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 3–4 năm sau trồng.",
    "Thích hợp vùng đất cao, thoát nước tốt.",
    "Giàu vitamin A, C, chất xơ và kali.",
    "Giúp tăng cường sức đề kháng và tiêu hóa.",
    "Dùng ăn tươi, sấy khô hoặc chế biến mứt.",
  ],
},
{
  id: 54,
  name: "Dứa",
  price: 15000,
  image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/11/17/766605/Tac-Dung-Giam-Can-Hi.jpg",
  category: "Cây ăn quả",
  description:
    "Dứa (thơm) là loại quả có vị chua ngọt, giàu enzyme bromelain, giúp tiêu hóa tốt và chống viêm.",
  purchased: 8700,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 14–18 tháng.",
    "Ưa nắng, thích hợp vùng đất cát pha.",
    "Giàu vitamin C và chất chống oxy hóa.",
    "Giúp hỗ trợ tiêu hóa, giảm viêm, tăng miễn dịch.",
    "Dùng ăn tươi, ép nước hoặc nấu ăn.",
  ],
},
{
  id: 55,
  name: "Cam",
  price: 35000,
  image: "https://nafarm.vn/timthumb.php?src=upload/images/cam-vang-uc-1kg-dac-san-nafarm.jpg&w=500&h=0&zc=1&a=tc",
  category: "Cây ăn quả",
  description:
    "Cam là loại trái cây quen thuộc, vị ngọt thanh, chứa nhiều vitamin C, giúp tăng sức đề kháng.",
  purchased: 13400,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 2–3 năm sau trồng.",
    "Ưa nắng, cần đất thoát nước tốt.",
    "Giàu vitamin C, folate và chất chống oxy hóa.",
    "Giúp tăng miễn dịch, làm đẹp da.",
    "Dùng ăn tươi, ép nước hoặc làm mứt.",
  ],
},
{
  id: 56,
  name: "Quýt",
  price: 30000,
  image: "https://product.hstatic.net/200000423303/product/add_a_heading_621dd70c6c774ae199664686060bc4e9.jpg",
  category: "Cây ăn quả",
  description:
    "Quýt có vị ngọt dịu, hương thơm dễ chịu, là nguồn cung cấp vitamin C tuyệt vời cho cơ thể.",
  purchased: 8900,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 2–3 năm sau trồng.",
    "Thích hợp khí hậu nhiệt đới.",
    "Giàu vitamin C, kali và chất xơ.",
    "Tốt cho da, hệ tiêu hóa và miễn dịch.",
    "Dùng ăn tươi hoặc làm nước ép.",
  ],
},
{
  id: 57,
  name: "Bưởi",
  price: 40000,
  image: "https://thiensafoods.com/upload/product/buoi-da-xanh-ruot-do-5018.jpg",
  category: "Cây ăn quả",
  description:
    "Bưởi là loại quả có vị ngọt xen chua nhẹ, giàu vitamin C và chất chống oxy hóa, giúp giảm cân và làm đẹp da.",
  purchased: 9500,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 3–4 năm sau trồng.",
    "Thích hợp đất phù sa, thoáng nước.",
    "Giàu vitamin C và kali.",
    "Giúp đốt mỡ, hạ cholesterol, làm đẹp da.",
    "Các giống phổ biến: bưởi da xanh, năm roi, phúc trạch.",
  ],
},
{
  id: 58,
  name: "Chanh",
  price: 12000,
  image: "https://product.hstatic.net/200000423303/product/chanh-khong-hat-huu-co_05795cd8857144a1af04a42b2b19e97f.jpg",
  category: "Cây ăn quả",
  description:
    "Chanh là loại quả có vị chua mạnh, chứa nhiều vitamin C, dùng làm gia vị, nước giải khát và hỗ trợ sức khỏe.",
  purchased: 8700,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 1,5–2 năm.",
    "Trồng quanh năm, dễ chăm sóc.",
    "Giàu vitamin C, acid citric và flavonoid.",
    "Giúp giải khát, tăng đề kháng, làm đẹp da.",
    "Dùng pha nước uống, ướp thực phẩm, làm gia vị.",
  ],
},
{
  id: 59,
  name: "Ổi",
  price: 20000,
  image: "https://media-cdn-v2.laodong.vn/uploaded/phamthuhien/2015_07_25/qua%20oi%20(2)_unpq.jpg",
  category: "Cây ăn quả",
  description:
    "Ổi là loại trái cây giàu vitamin C, chất xơ, có vị ngọt hoặc chua nhẹ, tốt cho tiêu hóa và miễn dịch.",
  purchased: 9700,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 1,5–2 năm sau trồng.",
    "Thích hợp khí hậu nhiệt đới, đất tơi xốp.",
    "Giàu vitamin C gấp 4 lần cam.",
    "Tốt cho tiêu hóa, giảm cholesterol.",
    "Các giống phổ biến: ổi lê, ổi ruột hồng, ổi nữ hoàng.",
  ],
},
{
  id: 60,
  name: "Na (mãng cầu ta)",
  price: 25000,
  image: "https://www.lottemart.vn/media/catalog/product/6/3/632d5e74921c1.jpg",
  category: "Cây ăn quả",
  description:
    "Na (mãng cầu ta) là loại quả ngọt, thơm, mềm, chứa nhiều vitamin và khoáng chất tốt cho sức khỏe.",
  purchased: 9100,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 2–3 năm sau trồng.",
    "Ưa khí hậu nóng, đất thoát nước tốt.",
    "Giàu vitamin C, B6, kali và chất xơ.",
    "Giúp cải thiện tiêu hóa, tăng sức đề kháng.",
    "Các giống phổ biến: na bở, na dai, na Thái.",
  ],
},
{
  id: 61,
  name: "Mãng cầu xiêm",
  price: 30000,
  image: "https://images2.thanhnien.vn/528068263637045248/2023/6/30/mang-cau-xiem-16881301424631692033494.jpg",
  category: "Cây ăn quả",
  description:
    "Mãng cầu xiêm (na xiêm) có vị chua ngọt thanh, thịt mềm, hương thơm đặc trưng, chứa nhiều vitamin và khoáng chất tốt cho sức khỏe.",
  purchased: 8600,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 3–4 năm sau trồng.",
    "Ưa khí hậu nóng ẩm, đất thoáng nước.",
    "Giàu vitamin C, B1, B2, và canxi.",
    "Giúp tăng cường hệ miễn dịch và tiêu hóa.",
    "Thường dùng ăn tươi, ép nước hoặc làm sinh tố.",
  ],
},
{
  id: 62,
  name: "Dưa hấu",
  price: 10000,
  image: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/6/19/dua-hau-giong-my-tui-2kg-2021071016125311551-16556534088771758641220.jpg",
  category: "Cây ăn quả",
  description:
    "Dưa hấu là loại quả giải nhiệt phổ biến, chứa hơn 90% nước, vị ngọt thanh, mát lành trong mùa hè.",
  purchased: 12700,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 65–75 ngày.",
    "Thích hợp trồng vụ xuân và hè.",
    "Giàu vitamin A, C và lycopene.",
    "Giúp giải khát, tốt cho tim mạch và da.",
    "Dùng ăn tươi hoặc ép lấy nước.",
  ],
},
{
  id: 63,
  name: "Thanh long",
  price: 20000,
  image: "https://www.lottemart.vn/media/catalog/product/cache/0x0/2/2/2274090000006-1.jpg.webp",
  category: "Cây ăn quả",
  description:
    "Thanh long là loại quả đặc sản nhiệt đới, có vị ngọt nhẹ, mọng nước, tốt cho tiêu hóa và tim mạch.",
  purchased: 9100,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 10–12 tháng sau trồng.",
    "Ưa khí hậu khô, nhiều nắng.",
    "Giàu vitamin C, chất xơ và chất chống oxy hóa.",
    "Hỗ trợ tiêu hóa và tăng miễn dịch.",
    "Có loại ruột trắng và ruột đỏ.",
  ],
},
{
  id: 64,
  name: "Vải",
  price: 35000,
  image: "https://shop.annam-gourmet.com/pub/media/catalog/product/cache/ee0af4cad0f3673c5271df64bd520339/i/t/item_F202590_3d03.jpg",
  category: "Cây ăn quả",
  description:
    "Vải là loại trái cây mùa hè, vỏ đỏ, cùi trắng, vị ngọt thơm, cung cấp nhiều vitamin C và năng lượng.",
  purchased: 8400,
  rating: 4.7,
  features: [
    "Thời gian thu hoạch: 3–4 năm sau trồng.",
    "Ra quả vào mùa hè (tháng 5–7).",
    "Giàu vitamin C, kali và chất xơ.",
    "Giúp tăng sức đề kháng, tốt cho da.",
    "Dùng ăn tươi hoặc sấy khô làm long nhãn.",
  ],
},
{
  id: 65,
  name: "Nhãn",
  price: 30000,
  image: "https://www.locthanhan.vn/upload/sanpham/nhan-que-93.jpg",
  category: "Cây ăn quả",
  description:
    "Nhãn có vị ngọt đậm, thơm, là loại trái cây bổ dưỡng, giúp an thần và tăng cường năng lượng.",
  purchased: 8900,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 3–4 năm sau trồng.",
    "Thích hợp vùng khí hậu nhiệt đới.",
    "Giàu vitamin C, kali và chất chống oxy hóa.",
    "Tốt cho trí nhớ và hệ miễn dịch.",
    "Thường ăn tươi hoặc làm long nhãn.",
  ],
},
{
  id: 66,
  name: "Chôm chôm",
  price: 25000,
  image: "https://hoptacxathanhbinh.com/wp-content/uploads/2023/08/rambutan.png",
  category: "Cây ăn quả",
  description:
    "Chôm chôm là loại quả nhiệt đới có vỏ nhiều gai mềm, thịt trắng ngọt, mọng nước và giàu dinh dưỡng.",
  purchased: 7700,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 3–4 năm.",
    "Thích hợp khí hậu nóng ẩm.",
    "Giàu vitamin C, sắt và mangan.",
    "Giúp tăng sức đề kháng, bổ máu.",
    "Dùng ăn tươi hoặc làm nước ép.",
  ],
},
{
  id: 67,
  name: "Táo",
  price: 20000,
  image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/tao_Gala_6db66bd1f1.jpg",
  category: "Cây ăn quả",
  description:
    "Táo là loại quả giòn ngọt, dễ ăn, chứa nhiều chất xơ và vitamin giúp duy trì sức khỏe tim mạch.",
  purchased: 13300,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 4–5 năm.",
    "Ưa khí hậu ôn đới, cần ánh sáng nhiều.",
    "Giàu chất xơ, vitamin C và chất chống oxy hóa.",
    "Giúp giảm cân, bảo vệ tim mạch.",
    "Dùng ăn tươi, ép nước hoặc làm bánh.",
  ],
},
{
  id: 68,
  name: "Mận (roi)",
  price: 15000,
  image: "https://binhdienonline.com/thumbs_size/product/2021_03/man-roi/[550x550-cr]mandoi-50.jpg",
  category: "Cây ăn quả",
  description:
    "Mận (roi) là loại quả có vị chua ngọt thanh, nhiều nước, giúp giải nhiệt và hỗ trợ tiêu hóa tốt.",
  purchased: 8900,
  rating: 4.7,
  features: [
    "Thời gian thu hoạch: 2–3 năm.",
    "Thích hợp vùng nhiệt đới, đất ẩm.",
    "Giàu vitamin C và chất xơ.",
    "Giúp giải nhiệt, lợi tiểu, mát gan.",
    "Dùng ăn tươi hoặc ngâm đường, muối chua.",
  ],
},
{
  id: 69,
  name: "Sapôchê (hồng xiêm)",
  price: 25000,
  image: "https://www.lottemart.vn/media/catalog/product/cache/0x0/2/2/2275920000005-3.jpg.webp",
  category: "Cây ăn quả",
  description:
    "Sapôchê (hồng xiêm) là loại quả ngọt dịu, thơm nhẹ, chứa nhiều năng lượng và vitamin C.",
  purchased: 7500,
  rating: 4.7,
  features: [
    "Thời gian thu hoạch: 3–4 năm sau trồng.",
    "Ưa khí hậu nóng, đất phù sa.",
    "Giàu vitamin C, A và khoáng chất.",
    "Tốt cho da và hệ tiêu hóa.",
    "Dùng ăn tươi hoặc sinh tố.",
  ],
},
{
  id: 70,
  name: "Sầu riêng",
  price: 80000,
  image: "https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d7094837cc74bf7fa74a8a72bb3409577e4d2ee19ba46cfacb4ff4789e403b4b1da354cc81f3f88e2a4f022bec09873f1ca6cdfbe10251c45cc8ffc759c27faed57336b969a7d87df528358cae0c1d26b188e25e7c01b3faa2e09aa7d8c4a75d7f392d/sau_rieng_9_cong_dung_tuyet_voi_de_ban_khong_ngai_an_241617187_AITM.jpg",
  category: "Cây ăn quả",
  description:
    "Sầu riêng là loại quả đặc sản có hương thơm mạnh, vị béo ngọt đặc trưng, giàu năng lượng và vitamin B.",
  purchased: 6300,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 4–5 năm sau trồng.",
    "Ưa khí hậu nóng ẩm, đất tơi xốp.",
    "Giàu năng lượng, vitamin B, C và chất béo tự nhiên.",
    "Giúp tăng cường sức khỏe và trí nhớ.",
    "Các giống phổ biến: Ri6, Monthong, Musang King.",
  ],
},
{
  id: 71,
  name: "Gừng",
  price: 40000,
  image: "https://media.baobinhphuoc.com.vn/upload/news/10_2021/e1f9ae795430bd6ee421_19155809102021.jpeg",
  category: "Cây gia vị – dược liệu",
  description:
    "Gừng là loại củ có vị cay, tính ấm, được dùng làm gia vị và bài thuốc hỗ trợ tiêu hóa, giảm viêm.",
  purchased: 11200,
  rating: 5.0,
  features: [
    "Thời gian thu hoạch: 8–10 tháng.",
    "Trồng được quanh năm, dễ chăm sóc.",
    "Chứa gingerol – hoạt chất chống viêm mạnh.",
    "Giúp giảm đau, hỗ trợ tiêu hóa, chống lạnh.",
    "Dùng làm gia vị, trà gừng, thuốc dân gian.",
  ],
},
{
  id: 72,
  name: "Nghệ",
  price: 30000,
  image: "https://cafefcdn.com/203337114487263232/2024/11/29/dung-chi-an-cu-la-loai-cay-nay-quy-nhu-nhan-sam-nguoi-ngheo-mam-com-nha-nao-cung-co-9-1732851494631490329442-1732889695685-1732889696334380000186.jpg",
  category: "Cây gia vị – dược liệu",
  description:
    "Nghệ là loại củ màu vàng cam, giàu curcumin, có tác dụng chống viêm, làm đẹp da và bảo vệ gan.",
  purchased: 9400,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 9–10 tháng.",
    "Ưa đất tơi, thoát nước tốt.",
    "Giàu curcumin – hoạt chất chống oxy hóa mạnh.",
    "Giúp sáng da, lành vết thương, hỗ trợ tiêu hóa.",
    "Dùng làm gia vị, thuốc hoặc mỹ phẩm thiên nhiên.",
  ],
},
{
  id: 73,
  name: "Riềng",
  price: 25000,
  image: "https://product.hstatic.net/1000282430/product/cu-rieng-ecoveg_0d10c1ebd32242f489497fcdb27572e9_master.jpg",
  category: "Cây gia vị – dược liệu",
  description:
    "Riềng là loại thân rễ thơm nồng, thường dùng trong các món ăn truyền thống như giả cầy, cá kho.",
  purchased: 7300,
  rating: 4.7,
  features: [
    "Thời gian thu hoạch: 8–10 tháng.",
    "Thích hợp vùng đất ẩm, dễ trồng.",
    "Giàu tinh dầu và chất chống oxy hóa.",
    "Giúp ấm bụng, tiêu thực, giảm ho.",
    "Dùng làm gia vị hoặc dược liệu.",
  ],
},
{
  id: 74,
  name: "Sả",
  price: 20000,
  image: "https://product.hstatic.net/200000271661/product/64fe734ee9cf499b98e73b375d6483e8_f32d94995e4747329ff0b56ef659de5f_large.png",
  category: "Cây gia vị – dược liệu",
  description:
    "Sả là loại cây gia vị quen thuộc, có hương thơm đặc trưng, giúp tăng hương vị món ăn và xua đuổi côn trùng.",
  purchased: 8800,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 6–8 tháng.",
    "Dễ trồng, thích hợp khí hậu nhiệt đới.",
    "Chứa citral – hợp chất kháng khuẩn tự nhiên.",
    "Giúp thư giãn, giảm đau, diệt khuẩn.",
    "Dùng nấu ăn, xông hơi hoặc làm tinh dầu.",
  ],
},
{
  id: 75,
  name: "Ớt",
  price: 35000,
  image: "https://product.hstatic.net/200000423303/product/ot-hiem-huu-co_a6c54b2368ce4072b749bfa06ed3a959.jpg",
  category: "Cây gia vị – dược liệu",
  description:
    "Ớt là loại gia vị cay nồng, giúp kích thích vị giác, tăng tuần hoàn máu và chứa nhiều vitamin C.",
  purchased: 12700,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 70–80 ngày.",
    "Ưa nắng, trồng quanh năm.",
    "Giàu capsaicin – hoạt chất giúp giảm đau và đốt mỡ.",
    "Giúp tăng đề kháng, kích thích tiêu hóa.",
    "Dùng làm gia vị, tương ớt, muối chua.",
  ],
},
{
  id: 76,
  name: "Húng quế",
  price: 15000,
  image: "https://www.hasfarmgreens.com/wp-content/uploads/2023/03/492515c73137e269bb26.jpg",
  category: "Cây gia vị – dược liệu",
  description:
    "Húng quế là loại rau thơm phổ biến, có mùi thơm nồng, vị cay nhẹ, thường dùng ăn sống hoặc làm gia vị cho các món phở, bún, gỏi, và món Âu.",
  purchased: 8600,
  rating: 4.8,
  features: [
    "Thời gian sinh trưởng: 30–40 ngày.",
    "Ưa sáng, thoát nước tốt, dễ trồng trong chậu hoặc luống đất.",
    "Có tác dụng hỗ trợ tiêu hóa, giảm stress và thanh lọc cơ thể.",
    "Mùi thơm đặc trưng giúp tăng hương vị cho các món ăn.",
    "Là nguồn tinh dầu thiên nhiên có khả năng kháng khuẩn.",
  ],
},
{
  id: 77,
  name: "Rau răm",
  price: 12000,
  image: "https://baokhanhhoa.vn/file/e7837c02857c8ca30185a8c39b582c03/062023/10-6.1_20230610081934.jpg",
  category: "Cây gia vị – dược liệu",
  description:
    "Rau răm là loại cây thân thảo, lá nhỏ, có mùi cay nồng, thường dùng ăn kèm trứng vịt lộn hoặc các món gỏi, cháo, thịt luộc.",
  purchased: 7800,
  rating: 4.7,
  features: [
    "Thời gian sinh trưởng: 25–35 ngày.",
    "Ưa ẩm, có thể trồng quanh năm.",
    "Giúp ấm bụng, kích thích tiêu hóa, giảm đầy hơi.",
    "Lá có tinh dầu thơm, vị cay nhẹ, tạo cảm giác ấm cơ thể.",
    "Dễ nhân giống bằng cách giâm cành.",
  ],
},
{
  id: 78,
  name: "Ngò gai",
  price: 10000,
  image: "https://anphatfarm.com/wp-content/uploads/2023/05/hg-ngo-gai.png",
  category: "Cây gia vị – dược liệu",
  description:
    "Ngò gai có mùi thơm mạnh, được dùng phổ biến trong các món phở, lẩu, canh và thịt nướng. Ngoài ra, nó còn được dùng làm thuốc trị cảm, ho và tiêu hóa kém.",
  purchased: 9100,
  rating: 4.8,
  features: [
    "Thời gian thu hoạch: 35–45 ngày.",
    "Ưa nắng nhẹ, đất tơi xốp, giữ ẩm tốt.",
    "Có tác dụng kháng khuẩn, hỗ trợ tiêu hóa, giảm ho.",
    "Lá có mùi thơm đặc trưng, vị hơi cay, đắng nhẹ.",
    "Dễ trồng, phát triển mạnh ở khí hậu nhiệt đới.",
  ],
},
{
  id: 79,
  name: "Hành lá",
  price: 12000,
  image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/9/30/840429/Hanh-La-Tot-Suc-Khoe.jpg",
  category: "Cây gia vị – dược liệu",
  description:
    "Hành lá là loại rau gia vị quen thuộc, giúp tăng hương vị cho món ăn. Ngoài ra, nó còn chứa nhiều vitamin và có khả năng kháng khuẩn tự nhiên.",
  purchased: 12500,
  rating: 4.9,
  features: [
    "Thời gian thu hoạch: 40–50 ngày.",
    "Ưa khí hậu mát, đất tơi xốp, thoát nước tốt.",
    "Giàu vitamin A, C, canxi, giúp tăng sức đề kháng.",
    "Có mùi thơm dịu, vị cay nhẹ, kích thích vị giác.",
    "Thường được dùng trong món chiên, xào, canh, và nước chấm.",
  ],
},
{
  id: 80,
  name: "Tía tô",
  price: 15000,
  image: "https://xanhviet.vn/images/products/tiato.jpg",
  category: "Cây gia vị – dược liệu",
  description:
    "Tía tô là loại rau thơm và dược liệu quý, được dùng trong ẩm thực và y học cổ truyền với công dụng giải cảm, kháng viêm, làm đẹp da.",
  purchased: 8800,
  rating: 4.9,
  features: [
    "Thời gian sinh trưởng: 30–40 ngày.",
    "Ưa sáng, dễ trồng, phát triển tốt trong khí hậu nhiệt đới.",
    "Giúp giải cảm, giảm viêm họng, hạ sốt và làm đẹp da.",
    "Có thể ăn sống, nấu canh, hoặc dùng làm thuốc.",
    "Giàu tinh dầu và chất chống oxy hóa tự nhiên.",
  ],
},
{
  id: 81,
  name: "Thịt heo",
  price: 120000,
  image: "https://cdn.tgdd.vn/Files/2016/12/29/931650/cach-chon-va-bao-quan-thit-heo-202201151133218208.jpg",
  category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp",
  description:
    "Thịt heo là nguồn thực phẩm phổ biến, chứa nhiều protein, vitamin B và khoáng chất cần thiết cho cơ thể.",
  purchased: 19500,
  rating: 4.9,
  features: [
    "Nguồn cung protein chất lượng cao.",
    "Giàu vitamin nhóm B, sắt và kẽm.",
    "Dễ chế biến thành nhiều món ăn khác nhau.",
    "Thịt tươi có màu hồng nhạt, độ đàn hồi tốt.",
    "Phù hợp với chế độ ăn giàu năng lượng.",
  ],
},
{
  id: 82,
  name: "Thịt bò",
  price: 220000,
  image: "https://fohlafood.vn/cdn/shop/articles/1-1683857652-150-width800height550.jpg?v=1732018733",
  category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp",
  description:
    "Thịt bò là loại thực phẩm giàu protein, sắt và vitamin B12, giúp tăng cơ, phục hồi sức khỏe và bổ máu.",
  purchased: 10200,
  rating: 5.0,
  features: [
    "Giàu sắt, kẽm, vitamin B12.",
    "Cung cấp năng lượng cao, giúp phát triển cơ bắp.",
    "Phù hợp với các món nướng, hầm, áp chảo hoặc steak.",
    "Thịt đỏ tươi, mềm, ít mỡ.",
    "Nguồn thực phẩm lý tưởng cho người vận động mạnh.",
  ],
},
{
  id: 83,
  name: "Thịt gà",
  price: 100000,
  image: "https://fresco.vn/public/upload/product/thit-ga-co-tanh-khong-3-DBgIXBPTgf.jpg",
  category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp",
  description:
    "Thịt gà là loại thịt trắng dễ tiêu hóa, giàu protein và vitamin B6, được ưa chuộng trong nhiều món ăn Việt.",
  purchased: 17300,
  rating: 4.8,
  features: [
    "Thịt mềm, thơm, ít béo.",
    "Giàu protein, vitamin B6 và niacin.",
    "Dễ chế biến: luộc, nướng, hầm, chiên.",
    "Thịt gà ta có hương vị ngon hơn, săn chắc.",
    "Tốt cho người tập thể dục, phục hồi cơ bắp.",
  ],
},
{
  id: 84,
  name: "Trứng gà",
  price: 40000,
  image: "https://vcdn1-vnexpress.vnecdn.net/2015/02/14/eggs-03-4600-1423905018.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=-LOXs3weRBly1zyvg5kVWQ",
  category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp",
  description:
    "Trứng gà là nguồn dinh dưỡng tự nhiên giàu protein, vitamin và khoáng chất, dễ chế biến và bảo quản.",
  purchased: 22100,
  rating: 4.9,
  features: [
    "Giàu protein và acid amin thiết yếu.",
    "Chứa vitamin A, D, B12 và khoáng chất.",
    "Thích hợp cho nhiều món ăn: ốp la, luộc, chiên, nướng.",
    "Nguồn năng lượng nhanh cho buổi sáng.",
    "Vỏ trứng gà ta mỏng, lòng đỏ đậm màu, nhiều dinh dưỡng.",
  ],
},
{
  id: 85,
  name: "Trứng vịt",
  price: 30000,
  image: "https://hn.check.net.vn/data/product/mainimages/original/product16121.jpg",
  category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp",
  description:
    "Trứng vịt có giá trị dinh dưỡng cao, lòng đỏ lớn và béo hơn trứng gà, thường dùng trong các món mặn như trứng muối, trứng lộn.",
  purchased: 15800,
  rating: 4.8,
  features: [
    "Giàu protein, canxi và chất béo tốt.",
    "Phù hợp làm bánh, chế biến món kho hoặc muối.",
    "Trứng vịt lộn giúp bồi bổ cơ thể, tăng sức khỏe.",
    "Lòng đỏ to, đậm vị hơn trứng gà.",
    "Nên bảo quản ở nhiệt độ mát, tránh ánh sáng trực tiếp.",
  ],
},
{
  id: 86,
  name: "Sữa bò",
  price: 25000,
  image: "https://bizweb.dktcdn.net/100/144/367/articles/sua-tuoi-edd60355-d601-4684-b461-0ffa984eb6f4.jpg?v=1611374579213",
  category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp",
  description:
    "Sữa bò là nguồn dinh dưỡng tự nhiên giàu canxi, protein và vitamin D, giúp xương chắc khỏe và hỗ trợ phát triển toàn diện.",
  purchased: 13200,
  rating: 4.9,
  features: [
    "Giàu canxi, protein và vitamin D.",
    "Giúp phát triển chiều cao, răng và xương chắc khỏe.",
    "Có thể uống trực tiếp hoặc dùng để chế biến món ăn, bánh.",
    "Nguồn năng lượng tốt cho trẻ em và người lớn tuổi.",
    "Dễ hấp thu, tốt cho tiêu hóa nếu dùng lượng hợp lý.",
  ],
},
{
  id: 87,
  name: "Cá tra",
  price: 60000,
  image: "https://thuysanvietnam.com.vn/wp-content/uploads/2024/08/2731_gia-ca-tra-100900_962.jpg",
  category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp",
  description:
    "Cá tra là loài cá nước ngọt phổ biến ở miền Tây Việt Nam, thịt trắng, ít xương dăm, chứa nhiều đạm và omega-3 tốt cho tim mạch.",
  purchased: 9700,
  rating: 4.8,
  features: [
    "Thịt trắng, mềm, ít tanh.",
    "Giàu protein và omega-3.",
    "Phù hợp cho món kho, chiên, nướng hoặc hấp.",
    "Nguồn thủy sản xuất khẩu chủ lực của Việt Nam.",
    "Giúp giảm cholesterol và hỗ trợ tim mạch khỏe mạnh.",
  ],
},
{
  id: 88,
  name: "Cá rô phi",
  price: 50000,
  image: "https://bizweb.dktcdn.net/thumb/grande/100/418/667/products/140.png?v=1719465175817",
  category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp",
  description:
    "Cá rô phi là loại cá nước ngọt phổ biến, dễ nuôi, thịt ngọt, dai, được dùng trong nhiều món kho, rán, hoặc nướng.",
  purchased: 8900,
  rating: 4.7,
  features: [
    "Thịt trắng, ngọt, ít mỡ.",
    "Giàu protein và vitamin D.",
    "Thích hợp cho món nướng, chiên giòn hoặc nấu canh chua.",
    "Nguồn cá sạch, dễ chế biến, ít xương dăm.",
    "Cung cấp omega-3 hỗ trợ tim mạch và trí não.",
  ],
},
{
  id: 89,
  name: "Tôm",
  price: 150000,
  image: "https://www.lottemart.vn/media/catalog/product/cache/0x0/2/2/2240000000008-1.jpg.webp",
  category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp",
  description:
    "Tôm là loại hải sản giàu dinh dưỡng, vị ngọt tự nhiên, là nguồn protein và khoáng chất dồi dào tốt cho sức khỏe.",
  purchased: 11300,
  rating: 5.0,
  features: [
    "Giàu protein, kẽm, sắt và canxi.",
    "Cung cấp omega-3, tốt cho não và tim mạch.",
    "Thịt tôm chắc, ngọt, thích hợp cho món hấp, chiên, nướng.",
    "Thực phẩm cao cấp, phổ biến trong các bữa tiệc.",
    "Giúp duy trì cơ bắp và làn da khỏe mạnh.",
  ],
},
{
  id: 90,
  name: "Mật ong",
  price: 200000,
  image: "https://resource.kinhtedothi.vn/2022/11/11/ef368b79a91d573f1531b57440b8bb62.jpg",
  category: "Sản phẩm chăn nuôi – thủy sản nông nghiệp",
  description:
    "Mật ong là sản phẩm tự nhiên do ong tạo ra từ hoa, có vị ngọt dịu, giàu enzyme, vitamin và chất chống oxy hóa.",
  purchased: 7600,
  rating: 5.0,
  features: [
    "Nguồn năng lượng tự nhiên, dễ hấp thu.",
    "Giúp tăng cường miễn dịch, làm dịu cổ họng và đẹp da.",
    "Giàu enzyme, vitamin B, C và chất chống oxy hóa.",
    "Có thể dùng pha nước ấm, làm bánh, hoặc ướp thịt.",
    "Bảo quản được lâu, không cần chất bảo quản nhân tạo.",
  ],
}
];

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Sử dụng CartContext
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const product = farmProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center text-red-500 text-xl mt-20">
        ❌ Không tìm thấy sản phẩm!
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400 text-xl">★</span>);
    }
    if (hasHalfStar)
      stars.push(<span key="half" className="text-yellow-400 text-xl">☆</span>);
    while (stars.length < 5) {
      stars.push(
        <span key={`empty-${stars.length}`} className="text-gray-300 text-xl">
          ★
        </span>
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    addToCart(product); // Sử dụng hàm từ Context
    setMessage(`✅ ${product.name} đã được thêm vào giỏ hàng!`);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <>
      <Header />

      <section className="container mx-auto px-4 mt-28 mb-20">
        <button
          onClick={() => navigate(-1)}
          className="text-green-600 mb-6 hover:underline"
        >
          ← Quay lại
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-md p-8 rounded-xl">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-green-700 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center mb-3">
              {renderStars(product.rating)}
              <span className="ml-2 text-gray-600 text-sm">
                {product.rating.toFixed(1)} / 5.0
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              <span className="font-semibold text-green-600">
                {product.purchased.toLocaleString("vi-VN")}
              </span>{" "}
              lượt mua
            </p>

            <p className="text-2xl text-green-600 font-semibold mb-4">
              {product.price.toLocaleString("vi-VN")}đ / kg
            </p>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Phân loại:</span>{" "}
              {product.category}
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-green-700 mb-2">
                🌱 Đặc điểm chi tiết:
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
              🛒 Thêm vào giỏ hàng
            </button>

            {message && (
              <p className="mt-3 text-green-600 font-medium animate-pulse">
                {message}
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductDetail;

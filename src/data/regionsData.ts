import { RegionData, Flashcard, Category } from '../types';

export const CATEGORY_LABELS: Record<Category, { title: string; icon: string }> = {
  'vi-tri': { title: 'Vị trí & Phạm vi', icon: 'map-pin' },
  'dia-hinh': { title: 'Địa hình & Cảnh quan', icon: 'mountain' },
  'khi-hau': { title: 'Khí hậu & Thời tiết', icon: 'cloud-sun' },
  'song-ngoi': { title: 'Sông ngòi & Thủy văn', icon: 'waves' },
  'sinh-vat': { title: 'Sinh vật & Hệ sinh thái', icon: 'trees' },
  'khoang-san': { title: 'Khoáng sản & Tài nguyên', icon: 'gem' },
};

export const REGIONS_DATA: RegionData[] = [
  {
    id: 'bac-dong-bac',
    index: 1,
    frameTitle: 'Khung 1: Miền Bắc & Đông Bắc Bắc Bộ',
    fullName: 'Miền Bắc và Đông Bắc Bắc Bộ',
    shortName: 'Bắc & Đông Bắc',
    subTitle: 'Đồi núi cánh cung, đồng bằng châu thổ rộng phẳng & vịnh Hạ Long',
    image: '/src/assets/images/mien_bac_dong_bac_1791012615156.jpg',
    accentColor: 'sky',
    badgeColor: 'text-sky-400 border-sky-500/40 bg-sky-950/60',
    visualHighlights: [
      'Đồi núi thấp dạng cánh cung mở rộng về phía bắc',
      'Đồng bằng sông Hồng rộng lớn, phù sa màu mỡ',
      'Vịnh biển Hạ Long với hàng nghìn đảo đá vôi'
    ],
    sections: {
      'vi-tri': {
        category: 'vi-tri',
        title: 'Vị trí địa lý & Phạm vi',
        content: 'Bao gồm toàn bộ vùng đồi núi Đông Bắc và đồng bằng châu thổ sông Hồng rộng lớn, tiếp giáp vịnh Bắc Bộ ở phía đông.',
        highlights: [
          'Vùng đồi núi tả ngạn sông Hồng',
          'Đồng bằng châu thổ sông Hồng phù sa',
          'Vùng biển vịnh Bắc Bộ nhiều đảo'
        ]
      },
      'dia-hinh': {
        category: 'dia-hinh',
        title: 'Đặc điểm Địa hình',
        content: 'Đồi núi thấp chiếm ưu thế tuyệt đối. Các dãy núi có hướng cánh cung chụm lại ở Tam Đảo và mở rộng về phía bắc và đông bắc (cánh cung Sông Gâm, Ngân Sơn, Bắc Sơn, Đông Triều). Đồng bằng sông Hồng rộng, bằng phẳng.',
        highlights: [
          'Đồi núi thấp chiếm ưu thế (dưới 1000m)',
          '4 cánh cung núi mở rộng về phía bắc (Sông Gâm, Ngân Sơn, Bắc Sơn, Đông Triều)',
          'Đồng bằng phù sa sông Hồng rộng, bằng phẳng',
          'Bờ biển thấp, vịnh Hạ Long có địa hình karst chìm ngập'
        ]
      },
      'khi-hau': {
        category: 'khi-hau',
        title: 'Đặc điểm Khí hậu',
        content: 'Nhiệt đới ẩm gió mùa, chịu ảnh hưởng trực tiếp và sâu sắc nhất của gió mùa Đông Bắc. Mùa đông lạnh kéo dài 2-3 tháng, nhiệt độ hạ thấp nhất cả nước, có mưa phùn ẩm ướt vào nửa cuối mùa đông.',
        highlights: [
          'Mùa đông đến sớm và kết thúc muộn nhất nước',
          'Mùa đông lạnh buốt, nhiệt độ trung bình dưới 18°C',
          'Chịu ảnh hưởng trực tiếp của gió mùa Đông Bắc do các cánh cung núi mở rộng đón gió',
          'Mưa phùn đặc trưng vào cuối mùa đông'
        ]
      },
      'song-ngoi': {
        category: 'song-ngoi',
        title: 'Mạng lưới Sông ngòi',
        content: 'Mạng lưới sông ngòi dày đặc. Sông lớn (sông Hồng, sông Chảy) chảy theo hướng tây bắc - đông nam. Vùng đồi núi Đông Bắc có hệ thống sông chảy theo hình nan quạt / cánh cung (sông Lô, sông Gâm, sông Cầu, sông Lục Nam). Chế độ nước có mùa lũ lớn vào mùa hạ.',
        highlights: [
          'Sông lớn (sông Hồng, sông Chảy) hướng TB - ĐN',
          'Sông vùng Đông Bắc hướng cánh cung (sông Lô, sông Gâm, sông Lục Nam)',
          'Lượng phù sa dồi dào bồi đắp đồng bằng sông Hồng',
          'Chế độ nước phân mùa rõ rệt theo gió mùa'
        ]
      },
      'sinh-vat': {
        category: 'sinh-vat',
        title: 'Sinh vật & Hệ sinh thái',
        content: 'Giới sinh vật vô cùng phong phú, đa dạng gồm các loài nhiệt đới, cận nhiệt và ôn đới. Có nhiều loài quý hiếm như vượn đầu trắng, voọc quần đùi trắng... được bảo tồn tại Vườn quốc gia Ba Bể, Cúc Phương, Cát Bà.',
        highlights: [
          'Hệ sinh thái rừng nhiệt đới gió mùa và cận nhiệt trên núi đá vôi',
          'Động vật quý hiếm: vượn đầu trắng, voọc mông trắng (Cát Bà, Ba Bể)',
          'Rừng ngập mặn cửa sông ven biển Quảng Ninh - Hải Phòng'
        ]
      },
      'khoang-san': {
        category: 'khoang-san',
        title: 'Tài nguyên Khoáng sản',
        content: 'Giàu có bậc nhất cả nước về khoáng sản nhiên liệu và kim loại: Than đá trữ lượng lớn ở Quảng Ninh, than nâu ở bể than đồng bằng sông Hồng, quặng sắt ở Thái Nguyên, apatit ở Lào Cai, thiếc Tĩnh Túc (Cao Bằng).',
        highlights: [
          'Than đá trữ lượng lớn nhất nước tại Quảng Ninh',
          'Bể than nâu sâu dưới lòng đất Đồng bằng sông Hồng',
          'Quặng sắt Thái Nguyên, thiếc Tĩnh Túc (Cao Bằng)'
        ]
      }
    },
    hotspots: [
      { id: 'hb1', name: '4 Cánh Cung Núi', description: 'Cánh cung Sông Gâm, Ngân Sơn, Bắc Sơn, Đông Triều chụm lại ở Tam Đảo, mở rộng đón gió mùa đông bắc.', x: 52, y: 28, type: 'mountain' },
      { id: 'hb2', name: 'Đồng Bằng Sông Hồng', description: 'Đồng bằng phù sa châu thổ bằng phẳng, cái nôi lúa nước nghìn năm.', x: 45, y: 64, type: 'plains' },
      { id: 'hb3', name: 'Vịnh Hạ Long', description: 'Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi karst muôn hình vạn trạng.', x: 78, y: 55, type: 'sea' },
      { id: 'hb4', name: 'Bể Than Quảng Ninh', description: 'Vựa than đá lớn và chất lượng cao nhất Đông Nam Á.', x: 74, y: 38, type: 'mineral' },
    ]
  },
  {
    id: 'tay-bac-bac-trung-bo',
    index: 2,
    frameTitle: 'Khung 2: Miền Tây Bắc & Bắc Trung Bộ',
    fullName: 'Miền Tây Bắc và Bắc Trung Bộ',
    shortName: 'Tây Bắc & Bắc Trung Bộ',
    subTitle: 'Dãy Hoàng Liên Sơn hiểm trở, hướng TB-ĐN, gió phơn Tây Nam & cồn cát ven biển',
    image: '/src/assets/images/mien_tay_bac_bac_trung_bo_1791012631966.jpg',
    accentColor: 'amber',
    badgeColor: 'text-amber-400 border-amber-500/40 bg-amber-950/60',
    visualHighlights: [
      'Dãy Hoàng Liên Sơn cao sừng sững, hướng TB - ĐN',
      'Đồng bằng duyên hải hẹp, bờ biển nhiều cồn cát trắng',
      'Vũng vịnh sâu và đầm phá ven biển (Tam Giang - Cầu Hai)'
    ],
    sections: {
      'vi-tri': {
        category: 'vi-tri',
        title: 'Vị trí địa lý & Phạm vi',
        content: 'Kéo dài từ hữu ngạn sông Hồng đến ranh giới tự nhiên là dãy Bạch Mã (vĩ độ 16°B). Phía tây giáp Lào, phía đông nhìn ra biển Đông.',
        highlights: [
          'Từ hữu ngạn sông Hồng đến dãy Bạch Mã',
          'Dải lãnh thổ kéo dài và hẹp ngang nhất nước',
          'Cầu nối giữa miền Bắc và miền Nam'
        ]
      },
      'dia-hinh': {
        category: 'dia-hinh',
        title: 'Đặc điểm Địa hình',
        content: 'Núi cao và trung bình chiếm ưu thế, địa hình hiểm trở bậc nhất Việt Nam. Hướng núi chủ đạo là tây bắc - đông nam, tiêu biểu là dãy Hoàng Liên Sơn hùng vĩ (đỉnh Fansipan cao 3.143m), Pu Đen Đinh, Pu Sam Sao. Duyên hải miền Trung có đồng bằng hẹp, bị chia cắt bởi các nhánh núi đâm ngang ra biển, có nhiều cồn cát và đầm phá.',
        highlights: [
          'Địa hình cao nhất nước, sườn dốc hiểm trở',
          'Hướng núi chủ đạo: Tây Bắc - Đông Nam',
          'Dãy Hoàng Liên Sơn với đỉnh Fansipan (3.143m) - nóc nhà Đông Dương',
          'Đồng bằng ven biển nhỏ hẹp, nhiều cồn cát và đầm phá (Tam Giang - Cầu Hai)'
        ]
      },
      'khi-hau': {
        category: 'khi-hau',
        title: 'Đặc điểm Khí hậu',
        content: 'Mùa đông đến muộn hơn và bớt lạnh hơn so với Đông Bắc nhờ bức chắn Hoàng Liên Sơn ngăn bớt gió mùa. Mùa hạ, Bắc Trung Bộ chịu ảnh hưởng sâu sắc của gió Tây khô nóng (gió Lào/phơn Tây Nam) thổi qua dãy Trường Sơn gây nắng nóng khô rát, kèm theo bão lụt lớn vào thu - đông.',
        highlights: [
          'Mùa đông ngắn hơn, bớt lạnh hơn Đông Bắc (Hoàng Liên Sơn che chắn)',
          'Hiện tượng phơn khô nóng đặc trưng (gió Tây khô nóng / gió Lào)',
          'Mùa mưa lùi dần về thu đông ở duyên hải Bắc Trung Bộ',
          'Thường xuyên chịu ảnh hưởng của bão nhiệt đới dữ dội'
        ]
      },
      'song-ngoi': {
        category: 'song-ngoi',
        title: 'Mạng lưới Sông ngòi',
        content: 'Các sông lớn như sông Đà, sông Mã, sông Cả chảy theo hướng tây bắc - đông nam. Lòng sông dốc, nhiều ghềnh thác, tiềm năng thủy điện khổng lồ (thủy điện Hòa Bình, Sơn La, Lai Châu trên sông Đà). Sông ngòi Trung Bộ ngắn và có độ dốc lớn.',
        highlights: [
          'Sông lớn hướng Tây Bắc - Đông Nam (sông Đà, sông Mã, sông Cả)',
          'Độ dốc lớn, nhiều hẻm vực và thác ghềnh',
          'Tiềm năng thủy điện dồi dào nhất cả nước (hệ thống sông Đà)',
          'Lũ lên rất nhanh và đột ngột ở các sông miền Trung'
        ]
      },
      'sinh-vat': {
        category: 'sinh-vat',
        title: 'Sinh vật & Hệ sinh thái',
        content: 'Là nơi hội tụ của nhiều luồng sinh vật: luồng Himalaya (thực vật ôn đới trên cao), luồng Hoa Nam (cận nhiệt đới) từ phía bắc xuống và luồng di cư từ Malaysia - Indonesia lên. Đai cao địa hình tạo nên các vành đai sinh vật phong phú từ rừng nhiệt đới chân núi đến rừng ôn đới núi cao.',
        highlights: [
          'Hội tụ 3 luồng sinh vật lớn: Himalaya, Hoa Nam, Mã Lai - Nam Đảo',
          'Đầy đủ các vành đai sinh vật theo độ cao: nhiệt đới, cận nhiệt, ôn đới núi cao',
          'Hệ sinh thái rừng pơ-mu, thông sa mu, thảo quả quý trên núi Hoàng Liên'
        ]
      },
      'khoang-san': {
        category: 'khoang-san',
        title: 'Tài nguyên Khoáng sản',
        content: 'Khoáng sản đa dạng nhưng phân tán: thạch anh, đá vôi chất lượng cao làm xi măng, quặng sắt (Thạch Khê - Hà Tĩnh), thiếc (Qùy Hợp - Nghệ An), cromit (Cổ Định - Thanh Hóa), đất hiếm ở Tây Bắc.',
        highlights: [
          'Quặng sắt Thạch Khê (Hà Tĩnh) trữ lượng lớn',
          'Cromit Cổ Định (Thanh Hóa), thiếc Qùy Hợp (Nghệ An)',
          'Đá vôi sản xuất xi măng và vật liệu xây dựng, mỏ đất hiếm'
        ]
      }
    },
    hotspots: [
      { id: 'ht1', name: 'Dãy Hoàng Liên Sơn & Fansipan', description: 'Dãy núi cao nhất Việt Nam (đỉnh Fansipan 3.143m), chạy dọc hướng Tây Bắc - Đông Nam.', x: 30, y: 32, type: 'mountain' },
      { id: 'ht2', name: 'Lưu Vực Sông Đà', description: 'Dòng sông dốc nhiều thác ghềnh, cái nôi thủy điện lớn nhất Đông Nam Á.', x: 42, y: 48, type: 'river' },
      { id: 'ht3', name: 'Dải Cồn Cát & Đầm Phá', description: 'Đầm phá Tam Giang - Cầu Hai và dải cồn cát trắng duyên hải miền Trung.', x: 75, y: 76, type: 'plains' },
      { id: 'ht4', name: 'Đèo Hải Vân - Dãy Bạch Mã', description: 'Ranh giới tự nhiên ngăn cách khí hậu miền Bắc và miền Nam Việt Nam.', x: 86, y: 88, type: 'mountain' },
    ]
  },
  {
    id: 'nam-trung-bo-nam-bo',
    index: 3,
    frameTitle: 'Khung 3: Miền Nam Trung Bộ & Nam Bộ',
    fullName: 'Miền Nam Trung Bộ và Nam Bộ',
    shortName: 'Nam Trung Bộ & Nam Bộ',
    subTitle: 'Cao nguyên ba dan xếp tầng, ĐB Sông Cửu Long kênh rạch & rừng ngập mặn',
    image: '/src/assets/images/mien_nam_trung_bo_nam_bo_1791012644290.jpg',
    accentColor: 'emerald',
    badgeColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60',
    visualHighlights: [
      'Các khối núi cổ và cao nguyên ba dan xếp tầng ở Tây Nguyên',
      'Đồng bằng sông Cửu Long rộng lớn, mạng lưới sông ngòi chằng chịt',
      'Rừng ngập mặn ven biển, rừng tràm U Minh và rừng khộp mùa khô'
    ],
    sections: {
      'vi-tri': {
        category: 'vi-tri',
        title: 'Vị trí địa lý & Phạm vi',
        content: 'Toàn bộ phần lãnh thổ từ sườn nam dãy núi Bạch Mã trở vào Nam, gồm Duyên hải Nam Trung Bộ, Tây Nguyên hùng vĩ và toàn bộ Nam Bộ.',
        highlights: [
          'Từ dãy Bạch Mã trở vào đến mũi Cà Mau',
          'Gồm Nam Trung Bộ, Tây Nguyên và Đông/Tây Nam Bộ',
          'Vùng biển rộng lớn với quần đảo Hoàng Sa, Trường Sa'
        ]
      },
      'dia-hinh': {
        category: 'dia-hinh',
        title: 'Đặc điểm Địa hình',
        content: 'Cấu trúc địa hình phức tạp, gồm các khối núi cổ (Kon Tum), các cao nguyên ba dan xếp tầng ở các độ cao khác nhau tại Tây Nguyên (Lâm Viên, Pleiku, Đắk Lắk, Di Linh, Mơ Nông). Đồng bằng Nam Bộ (Đồng bằng sông Cửu Long) rộng lớn, bằng phẳng nhất nước, có hệ thống sông ngòi và kênh rạch chằng chịt.',
        highlights: [
          'Khối núi cổ Kon Tum và các khối núi Nam Trung Bộ nhô sát biển',
          'Các cao nguyên ba dan xếp tầng ở Tây Nguyên (Pleiku, Đắk Lắk, Lâm Viên, Di Linh)',
          'Đồng bằng sông Cửu Long rộng phẳng, thấp trũng, mạng lưới sông kênh rạch dày đặc',
          'Bờ biển Nam Trung Bộ khúc khuỷu, nhiều vịnh nước sâu (Cam Ranh, Vân Phong)'
        ]
      },
      'khi-hau': {
        category: 'khi-hau',
        title: 'Đặc điểm Khí hậu',
        content: 'Khí hậu cận xích đạo gió mùa, nền nhiệt cao quanh năm (nhiệt độ trung bình trên 25°C), không có mùa đông lạnh. Khí hậu chia thành 2 mùa rõ rệt: mùa mưa (tháng 5 đến tháng 10) và mùa khô (tháng 11 đến tháng 4 năm sau). Mùa khô kéo dài gây thiếu nước nghiêm trọng tại Tây Nguyên và xâm nhập mặn ở đồng bằng.',
        highlights: [
          'Khí hậu cận xích đạo gió mùa, nóng quanh năm, biên độ nhiệt năm nhỏ',
          'Hai mùa mưa - khô sâu sắc và tương phản rõ nét',
          'Mùa khô kéo dài dẫn tới khô hạn và xâm nhập mặn ở ven biển',
          'Duyên hải cực Nam Trung Bộ (Ninh Thuận - Bình Thuận) có lượng mưa ít nhất nước'
        ]
      },
      'song-ngoi': {
        category: 'song-ngoi',
        title: 'Mạng lưới Sông ngòi',
        content: 'Phân hóa rõ giữa hai khu vực: Nam Trung Bộ sông ngắn, dốc, chảy thẳng ra biển. Vùng Nam Bộ có mạng lưới sông ngòi quy mô lớn (hệ thống sông Mê Kông/Cửu Long với sông Tiền, sông Hậu và sông Đồng Nai), chia thành nhiều chi lưu và mạng kênh rạch nhân tạo dày đặc chằng chịt.',
        highlights: [
          'Sông Nam Trung Bộ ngắn, dốc (sông Ba, sông Thu Bồn)',
          'Sông Nam Bộ lớn, lưu lượng nước khổng lồ: sông Tiền, sông Hậu, sông Đồng Nai',
          'Chế độ nước điều hòa hơn nhờ Biển Hồ (Campuchia) và các rừng ngập mặn',
          'Mạng lưới kênh rạch tự nhiên và nhân tạo dày đặc tỏa khắp đồng bằng'
        ]
      },
      'sinh-vat': {
        category: 'sinh-vat',
        title: 'Sinh vật & Hệ sinh thái',
        content: 'Điển hình là đới rừng cận xích đạo gió mùa. Tây Nguyên có rừng rụng lá vào mùa khô (rừng khộp) độc đáo và rừng lá kim ở vùng cao Đà Lạt. Nam Bộ phát triển hệ sinh thái rừng ngập mặn (rừng đước Cà Mau, Cần Giờ) và rừng tràm U Minh.',
        highlights: [
          'Đới rừng rậm nhiệt đới cận xích đạo gió mùa xanh quanh năm',
          'Rừng khộp (rừng rụng lá vào mùa khô) độc đáo ở Tây Nguyên',
          'Rừng ngập mặn ven biển Cà Mau - lớn thứ 2 thế giới',
          'Rừng tràm ngập nước U Minh Thượng, U Minh Hạ'
        ]
      },
      'khoang-san': {
        category: 'khoang-san',
        title: 'Tài nguyên Khoáng sản',
        content: 'Nổi bật hàng đầu là dầu mỏ và khí tự nhiên với trữ lượng lớn ở thềm lục địa phía nam (bể Cửu Long, bể Nam Côn Sơn). Tây Nguyên sở hữu mỏ bô-xít (quặng nhôm) với trữ lượng vào loại lớn nhất thế giới. Ngoài ra còn có cát thủy tinh (Khánh Hòa), titan, đá quý.',
        highlights: [
          'Dầu mỏ và khí đốt tự nhiên dồi dào ở thềm lục địa Đông Nam Bộ',
          'Mỏ quặng Bô-xít khổng lồ phân bố trên các cao nguyên ba dan Tây Nguyên',
          'Titan sa khoáng ven biển Bình Thuận, cát thủy tinh Khánh Hòa'
        ]
      }
    },
    hotspots: [
      { id: 'hn1', name: 'Cao Nguyên Xếp Tầng Tây Nguyên', description: 'Các cao nguyên ba dan màu mỡ: Pleiku, Đắk Lắk, Lâm Viên, Di Linh xếp tầng từ thấp lên cao.', x: 48, y: 38, type: 'mountain' },
      { id: 'hn2', name: 'Đồng Bằng Sông Cửu Long', description: 'Vựa lúa và cây ăn trái lớn nhất cả nước, sông Tiền và sông Hậu chia 9 nhánh đổ ra biển.', x: 42, y: 78, type: 'plains' },
      { id: 'hn3', name: 'Rừng Ngập Mặn Mũi Cà Mau', description: 'Khu dự trữ sinh quyển thế giới với diện tích rừng ngập mặn lớn thứ nhì toàn cầu.', x: 28, y: 92, type: 'biome' },
      { id: 'hn4', name: 'Thềm Lục Địa & Mỏ Dầu Khí', description: 'Vùng thềm lục địa phía nam giàu trữ lượng dầu thô và khí đốt tự nhiên.', x: 80, y: 84, type: 'mineral' },
    ]
  }
];

export const FLASHCARDS: Flashcard[] = [
  // Miền 1: Bắc & Đông Bắc Bắc Bộ
  {
    id: 'fc-1',
    regionId: 'bac-dong-bac',
    category: 'khi-hau',
    content: 'Chịu ảnh hưởng trực tiếp của gió mùa Đông Bắc, tạo nên mùa đông lạnh nhất cả nước.',
    hint: 'Gió mùa đông bắc tràn trực tiếp vào qua các vòng cung núi mở rộng.',
    explanation: 'Miền Bắc & Đông Bắc Bắc Bộ có các cánh cung núi mở rộng về phía bắc đón gió mùa Đông Bắc tràn vào làm cho mùa đông lạnh nhất nước.'
  },
  {
    id: 'fc-2',
    regionId: 'bac-dong-bac',
    category: 'dia-hinh',
    content: 'Địa hình đồi núi thấp chiếm ưu thế, các dãy núi có hướng cánh cung mở rộng về phía bắc.',
    hint: '4 cánh cung núi tiêu biểu: Sông Gâm, Ngân Sơn, Bắc Sơn, Đông Triều.',
    explanation: 'Cấu trúc địa hình nổi bật nhất của Đông Bắc là các dãy núi dạng cánh cung chụm lại ở Tam Đảo và mở rộng nan quạt về phía bắc.'
  },
  {
    id: 'fc-3',
    regionId: 'bac-dong-bac',
    category: 'vi-tri',
    content: 'Gồm toàn bộ vùng đồi núi tả ngạn sông Hồng và đồng bằng châu thổ sông Hồng.',
    hint: 'Nằm ở phía bắc và đông bắc của lãnh thổ, giáp vịnh Bắc Bộ.',
    explanation: 'Phạm vi miền gồm vùng núi đồi Đông Bắc và đồng bằng sông Hồng rộng lớn.'
  },
  {
    id: 'fc-4',
    regionId: 'bac-dong-bac',
    category: 'song-ngoi',
    content: 'Có các sông chảy theo hướng cánh cung (sông Lô, sông Gâm, sông Cầu, sông Lục Nam).',
    hint: 'Hướng sông tuân theo cấu trúc địa hình các cánh cung núi.',
    explanation: 'Sông vùng Đông Bắc uốn lượn theo sườn các cánh cung núi đổ dồn về đồng bằng.'
  },
  {
    id: 'fc-5',
    regionId: 'bac-dong-bac',
    category: 'khoang-san',
    content: 'Giàu khoáng sản than đá trữ lượng lớn nhất nước (Quảng Ninh) và than nâu ở đồng bằng.',
    hint: 'Vựa vàng đen lớn nhất Việt Nam.',
    explanation: 'Quảng Ninh có mỏ than đá lớn nhất cả nước, cùng bể than nâu sâu ở Đồng bằng sông Hồng và mỏ quặng sắt Thái Nguyên.'
  },
  {
    id: 'fc-6',
    regionId: 'bac-dong-bac',
    category: 'sinh-vat',
    content: 'Động vật quý hiếm đặc hữu: vượn đầu trắng, voọc quần đùi trắng ở Ba Bể, Cát Bà.',
    hint: 'Sinh sống ở các vườn quốc gia đảo và núi đá vôi phía Bắc.',
    explanation: 'Voọc mông trắng (voọc quần đùi trắng) và vượn đầu trắng là những loài linh trưởng cực kỳ quý hiếm chỉ có ở miền này.'
  },
  {
    id: 'fc-7',
    regionId: 'bac-dong-bac',
    category: 'dia-hinh',
    content: 'Có vịnh biển Hạ Long với hàng nghìn đảo đá vôi kỳ vĩ trên biển.',
    hint: 'Địa hình karst đá vôi ngập mặn được UNESCO công nhận là di sản thiên nhiên thế giới.',
    explanation: 'Vịnh Hạ Long (Quảng Ninh) là địa hình karst chìm ngập nước biển nổi tiếng toàn cầu của miền Bắc và Đông Bắc.'
  },

  // Miền 2: Tây Bắc & Bắc Trung Bộ
  {
    id: 'fc-8',
    regionId: 'tay-bac-bac-trung-bo',
    category: 'dia-hinh',
    content: 'Dãy Hoàng Liên Sơn cao sừng sững, hướng núi chủ đạo tây bắc - đông nam.',
    hint: 'Có đỉnh Fansipan (3.143m) cao nhất Đông Dương.',
    explanation: 'Miền Tây Bắc và Bắc Trung Bộ là nơi có địa hình cao và hiểm trở nhất cả nước với hướng núi chủ đạo Tây Bắc - Đông Nam.'
  },
  {
    id: 'fc-9',
    regionId: 'tay-bac-bac-trung-bo',
    category: 'vi-tri',
    content: 'Phạm vi lãnh thổ kéo dài từ hữu ngạn sông Hồng đến dãy núi Bạch Mã.',
    hint: 'Bắc giáp Đông Bắc qua sông Hồng, Nam kết thúc ở đèo Hải Vân/Bạch Mã.',
    explanation: 'Ranh giới miền từ sườn hữu ngạn sông Hồng kéo dài đến dãy Bạch Mã (khoảng vĩ độ 16°B).'
  },
  {
    id: 'fc-10',
    regionId: 'tay-bac-bac-trung-bo',
    category: 'khi-hau',
    content: 'Chịu ảnh hưởng gay gắt của gió Tây khô nóng (gió Lào) vào mùa hạ và bão lớn.',
    hint: 'Hiện tượng phơn khô rát đặc trưng khi gió vượt qua dãy Trường Sơn Bắc.',
    explanation: 'Vào mùa hạ, gió mùa Tây Nam vượt qua dãy Trường Sơn trút mưa bên Lào, sang sườn đông (Bắc Trung Bộ) trở nên khô nóng dữ dội.'
  },
  {
    id: 'fc-11',
    regionId: 'tay-bac-bac-trung-bo',
    category: 'song-ngoi',
    content: 'Sông lớn hướng tây bắc - đông nam, dốc nhiều thác ghềnh (sông Đà, sông Mã, sông Cả).',
    hint: 'Chảy xiết qua hẻm núi sâu, có tiềm năng thủy điện lớn nhất nước.',
    explanation: 'Sông Đà, sông Mã có lòng dốc, trữ năng thủy điện lớn với các nhà máy thủy điện Hòa Bình, Sơn La, Lai Châu.'
  },
  {
    id: 'fc-12',
    regionId: 'tay-bac-bac-trung-bo',
    category: 'dia-hinh',
    content: 'Đồng bằng duyên hải hẹp ngang, có nhiều cồn cát trắng và đầm phá (Tam Giang - Cầu Hai).',
    hint: 'Đồng bằng bị chia cắt bởi các nhánh núi đâm ngang ra biển.',
    explanation: 'Duyên hải miền Trung có dải đồng bằng hẹp, nhiều cồn cát bay, cồn cát ven biển và hệ đầm phá Tam Giang - Cầu Hai rộng lớn.'
  },
  {
    id: 'fc-13',
    regionId: 'tay-bac-bac-trung-bo',
    category: 'sinh-vat',
    content: 'Hội tụ luồng sinh vật từ Himalaya, Hoa Nam và di cư từ Malaysia - Indonesia lên.',
    hint: 'Nơi giao thoa sinh vật độc đáo có cả pơ-mu, thông sa mu xứ lạnh.',
    explanation: 'Do vị trí cầu nối và địa hình núi cao, miền là nơi giao thoa các luồng di cư sinh vật từ Himalaya xuống và Mã Lai lên.'
  },
  {
    id: 'fc-14',
    regionId: 'tay-bac-bac-trung-bo',
    category: 'khoang-san',
    content: 'Tài nguyên khoáng sản: thạch anh, đá vôi, quặng sắt Thạch Khê, thiếc và crôm.',
    hint: 'Mỏ cromit duy nhất của cả nước ở Cổ Định (Thanh Hóa).',
    explanation: 'Miền có mỏ sắt Thạch Khê (Hà Tĩnh), cromit Cổ Định (Thanh Hóa), thiếc Qùy Hợp và các mỏ đá vôi xi măng quy mô lớn.'
  },

  // Miền 3: Nam Trung Bộ & Nam Bộ
  {
    id: 'fc-15',
    regionId: 'nam-trung-bo-nam-bo',
    category: 'khi-hau',
    content: 'Khí hậu cận xích đạo gió mùa, nền nhiệt cao quanh năm, 2 mùa mưa và khô rõ rệt.',
    hint: 'Không có mùa đông lạnh, nhiệt độ trung bình năm luôn trên 25°C.',
    explanation: 'Từ dãy Bạch Mã trở vào, khí hậu mang tính chất cận xích đạo nóng quanh năm, biên độ nhiệt ngày đêm nhỏ và phân chia 2 mùa mưa - khô sâu sắc.'
  },
  {
    id: 'fc-16',
    regionId: 'nam-trung-bo-nam-bo',
    category: 'dia-hinh',
    content: 'Gồm khối núi cổ, các cao nguyên ba dan xếp tầng (Tây Nguyên) và đồng bằng châu thổ rộng lớn.',
    hint: 'Các cao nguyên xếp tầng: Pleiku, Đắk Lắk, Lâm Viên, Di Linh.',
    explanation: 'Miền có địa hình cao nguyên ba dan xếp tầng màu mỡ ở Tây Nguyên cùng Đồng bằng sông Cửu Long bằng phẳng, trũng thấp.'
  },
  {
    id: 'fc-17',
    regionId: 'nam-trung-bo-nam-bo',
    category: 'dia-hinh',
    content: 'Đồng bằng sông Cửu Long rộng lớn, bằng phẳng với hệ thống kênh rạch chằng chịt.',
    hint: 'Châu thổ phù sa phì nhiêu do sông Mê Kông bồi đắp.',
    explanation: 'Đồng bằng sông Cửu Long là đồng bằng lớn nhất nước, mạng lưới sông ngòi và kênh rạch nhân tạo dày đặc tỏa khắp nơi.'
  },
  {
    id: 'fc-18',
    regionId: 'nam-trung-bo-nam-bo',
    category: 'song-ngoi',
    content: 'Mạng lưới sông ngòi chia thành nhiều chi lưu đổ ra biển (sông Cửu Long, sông Đồng Nai).',
    hint: 'Con sông 9 rồng chia thành sông Tiền và sông Hậu với 9 cửa đổ ra biển.',
    explanation: 'Hệ thống sông Cửu Long và sông Đồng Nai lưu lượng nước cực lớn, chia nhiều chi lưu đổ ra biển Đông.'
  },
  {
    id: 'fc-19',
    regionId: 'nam-trung-bo-nam-bo',
    category: 'sinh-vat',
    content: 'Tây Nguyên có rừng rụng lá vào mùa khô (rừng khộp); Nam Bộ có rừng ngập mặn và rừng tràm.',
    hint: 'Rừng đước Cà Mau và rừng tràm U Minh tiêu biểu cho vùng đất ngập nước.',
    explanation: 'Hệ sinh thái đặc trưng gồm rừng khộp rụng lá mùa khô ở Tây Nguyên, rừng tràm U Minh và rừng ngập mặn trù phú ở Cà Mau.'
  },
  {
    id: 'fc-20',
    regionId: 'nam-trung-bo-nam-bo',
    category: 'khoang-san',
    content: 'Khoáng sản tiêu biểu: Dầu mỏ, khí đốt ở thềm lục địa và bô-xít ở Tây Nguyên.',
    hint: 'Các giàn khoan dầu khí Bạch Hổ, Rồng, Đại Hùng trên thềm lục địa phía nam.',
    explanation: 'Trữ lượng dầu khí lớn nhất nước phân bố ở thềm lục địa phía nam, trong khi quặng bô-xít (nhôm) khổng lồ nằm ở các cao nguyên Tây Nguyên.'
  },
  {
    id: 'fc-21',
    regionId: 'nam-trung-bo-nam-bo',
    category: 'vi-tri',
    content: 'Phạm vi tính từ sườn nam dãy núi Bạch Mã trở vào đến tận cùng phía nam đất nước.',
    hint: 'Bao gồm Tây Nguyên, duyên hải Nam Trung Bộ và toàn bộ Nam Bộ.',
    explanation: 'Miền Nam Trung Bộ và Nam Bộ bắt đầu từ dãy Bạch Mã (ranh giới tự nhiên) chạy dài đến mũi Cà Mau.'
  }
];

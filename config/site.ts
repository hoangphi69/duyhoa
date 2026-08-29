export const siteConfig = {
  url: 'https://duyhoa.vn',
  locale: 'vi_VN',

  brand: {
    shortName: 'Duy Hoà 68',
    fullName: 'Công ty TNHH Thương mại Duy Hoà 68',
    legalName: 'Công ty TNHH Thương mại Duy Hoà 68',
    slogan: 'Đủ Điện – Đủ Nước – Đủ Tin Cậy',
    positioning: 'Tổng kho phân phối thiết bị điện – nước – vệ sinh chính hãng',
    // Dùng làm meta description mặc định (~155 ký tự)
    description:
      'Nhà phân phối cấp 1 thiết bị điện, ống nước và thiết bị vệ sinh chính hãng tại Quảng Ninh – Hải Phòng – Hải Dương. Tổng kho 6.000m², giao hàng tận nơi theo tuyến cố định.',
    // Bản rút gọn cho OG/Twitter (~110 ký tự)
    shortDescription:
      'Tổng kho phân phối thiết bị điện – nước – vệ sinh chính hãng tại Quảng Ninh, Hải Phòng, Hải Dương.',
    foundedYear: 2015,
    taxCode: '5701765729',
    logo: '/duyhoa-logo.png',
    colors: {
      primary: '#FFB202', // vàng thương hiệu
      secondary: '#0B1F3A', // navy thương hiệu
    },
  },

  region: {
    label: 'Quảng Ninh – Hải Phòng – Hải Dương',
    provinces: ['Quảng Ninh', 'Hải Phòng', 'Hải Dương'],
    deliveryNote: 'Giao hàng công trình toàn miền Bắc, tới Thanh Hoá',
  },

  contact: {
    address: 'Số 351, Khu Hợp Thành, Phường Yên Tử, Quảng Ninh',
    addressLocality: 'Yên Tử',
    addressRegion: 'Quảng Ninh',
    postalCode: '200000',
    country: 'VN',
    geo: { lat: 21.0333, lng: 106.7667 },
    workingHours: 'T2–T7, 08:00–17:30',
    hotline: '0333455889',
    hotlineDaiLy: '0333455889',
    hotlineDuAn: '0333455889',
    email: 'duyhoa68.vn@gmail.com',
  },

  leadership: {
    ceo: { name: 'Nguyễn Thị Hoà', title: 'Tổng Giám đốc' },
    deputy: { name: 'Trần Văn Linh', title: 'Phó Tổng Giám đốc' },
  },

  // Số liệu năng lực – dùng cho description các trang & nội dung
  capabilities: {
    warehouse: '6.000m² tổng kho',
    fleet: 'gần 20 đầu xe',
    dealers: 'khoảng 1.500 cửa hàng mua hàng thường xuyên',
    experience: 'hơn 15 năm trong ngành vật liệu điện nước',
  },

  categories: [
    { name: 'Thiết bị điện', slug: 'dien' },
    { name: 'Ống nước & phụ kiện', slug: 'nuoc' },
    { name: 'Thiết bị vệ sinh', slug: 've-sinh' },
    { name: 'Dụng cụ cầm tay', slug: 'dung-cu' },
  ],

  // Thương hiệu phân phối – dùng cho keywords, schema "brand", trang sản phẩm
  brands: {
    exclusive: ['Trần Phú', 'Cadisun', 'Rạng Đông', 'Senko', 'Vinawind'],
    all: [
      'Trần Phú',
      'Cadisun',
      'Rạng Đông',
      'Senko',
      'Vinawind',
      'Nhựa Tiền Phong',
      'Panasonic',
      'Nanoco',
      'Sino',
      'Taesung',
      'Inax',
      'Kangaroo',
      'Jasic',
    ],
  },

  links: {
    sitemap: [
      { name: 'Giới thiệu Duy Hoà', href: '/about' },
      { name: 'Sản phẩm', href: '/product' },
      { name: 'Bảng giá & Catalogue', href: '/catalogue' },
      { name: 'Dự án tiêu biểu', href: '/projects' },
      { name: 'Tin tức & Bài viết', href: '/article' },
    ],
    contact: [
      { name: 'Đăng ký đại lý', href: '/contact/agency' },
      { name: 'Liên hệ dự án', href: '/contact/project' },
    ],
    legal: [
      { name: 'Chính sách bảo mật', href: '/legal/privacy' },
      { name: 'Điều khoản sử dụng', href: '/legal/terms' },
    ],
    social: [
      { name: 'Facebook', href: 'https://www.facebook.com/Duyhoaltd/' },
      { name: 'Zalo', href: 'https://zalo.me/0333455889' },
    ],
  },

  // Mã xác minh công cụ tìm kiếm
  verification: {
    google: '', // TODO: Google Search Console
    bing: '', // TODO
  },
};

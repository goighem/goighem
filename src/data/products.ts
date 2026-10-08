export type Product = { name: string; price: string; note: string; tone: string };

export const products: Product[] = [
  { name: 'Bánh cốm', price: '01', note: 'Lớp cốm non xanh dịu, ôm lấy nhân đậu xanh.', tone: '#98a875' },
  { name: 'Bánh xu xê', price: '02', note: 'Trong veo, giòn nhẹ, mang theo vị dừa và lời chúc.', tone: '#c5a777' },
  { name: 'Ô mai', price: '03', note: 'Vị chua ngọt đậm đà, gợi nhớ những con phố Hà Nội.', tone: '#8e6253' }
];

export const ingredients = [
  ['01', 'Gạo nếp non', 'Hương thơm đầu tiên của một chiếc bánh cốm.'],
  ['02', 'Đậu xanh', 'Vị bùi dịu dàng nằm ở trung tâm của món quà.'],
  ['03', 'Hạt sen', 'Một nốt thanh, cân bằng cho những ngày chậm.'],
  ['04', 'Lá sen', 'Nếp gói tự nhiên giữ lại cả một mùa thu.']
];

export const giftCakes = [
  { name: 'Bánh cốm', shortName: 'Cốm', description: 'Lớp cốm non xanh dịu, ôm lấy nhân đậu xanh mịn như ký ức đầu mùa.', detail: 'Mềm dẻo · Nhân đậu xanh · Vị thu Hà Nội', tone: '#93a873', accent: '#d5b778', image: '/banh-com.png' },
  { name: 'Bánh xu xê', shortName: 'Xu xê', description: 'Trong veo, giòn nhẹ, mang theo vị dừa và một lời chúc trăm năm.', detail: 'Dẻo trong · Dừa non · Lời chúc trăm năm', tone: '#d8bb72', accent: '#f0e5c9', image: '/banh-xu-xe.webp' },
  { name: 'Ô mai', shortName: 'Ô mai', description: 'Vị chua ngọt đậm đà, gợi nhớ những con phố Hà Nội sau mùa mưa.', detail: 'Chua ngọt · Quả sấy · Hương phố Hà Nội', tone: '#8e6253', accent: '#d7a26d', image: '/omai.png' }
];

export const giftSetInfo = [
  ['Khối lượng tịnh', '500 g', 'Net Weight'],
  ['Thành phần', 'Xem trên bao bì từng sản phẩm.', 'Ingredients: See individual product packaging.'],
  ['Hướng dẫn sử dụng', 'Dùng trực tiếp.', 'Directions: Ready to eat.'],
  ['Bảo quản', 'Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.', 'Store in a cool, dry place away from direct sunlight.'],
  ['Ngày đóng gói', '09/10/2026', 'Packing Date'],
  ['Hạn sử dụng', '04 ngày kể từ ngày đóng gói.', 'Best Before: 4 days from the packing date.'],
  ['Đóng gói và phân phối bởi', 'Gói Ghém', 'Packed and Distributed by: Gói Ghém'],
  ['Xuất xứ sản phẩm', 'Việt Nam', 'Product Origin: Vietnam']
];

export const storyChapters = [
  {
    id: 'banh-com',
    number: '02',
    title: 'Bánh cốm',
    subtitle: 'Green rice cake',
    intro: 'The grain behind the cake.',
    paragraphs: [
      'Cốm is made from young sticky rice, and its taste is tied to autumn in northern Vietnam. The harvest is short, roughly August to October, and fresh cốm barely lasts a few days. Traditionally it is wrapped in lotus leaves to keep its fragrance. Locals say you should eat it with a ripe banana or persimmon.',
      'One story says that long ago, a storm flattened the rice fields of Vòng village just before the grain ripened, so villagers roasted what young rice remained, and found it delicious. It is a legend, not a historical record, but it captures how Hanoians think of cốm: a gift that came from a hard season.',
      'According to Hanoi sources, in 1865 an ancestor of the Nguyễn Duy family on Hàng Than street found a way to dry cốm and turn it into a cake. The filling is mung bean paste with sugar, pomelo-flower water and fresh coconut, wrapped in cooked cốm. It is often enjoyed with strong tea.',
      'Bánh cốm is traditionally part of Hanoi weddings. Packed in a red box, it is said to be like a red thread tying the couple together, with a wish for a happy life until old age. In the 1940s, writer Thạch Lam described it as an autumn wedding cake exchanged between families.'
    ],
    tip: 'Taste tip: take a small bite, then a sip of tea, and notice the soft, grassy sweetness of the rice.',
    image: '/banh-com.png'
  },
  {
    id: 'banh-xu-xe',
    number: '03',
    title: 'Bánh xu xê',
    subtitle: 'The “husband-and-wife” cake',
    intro: 'One cake, two names.',
    paragraphs: [
      'Xu xê is commonly treated as the same cake as bánh phu thê. Phu thê means “husband and wife” in Sino-Vietnamese. Linguists still debate which name came first, so we simply call it by both.',
      'The cake is traced to Đình Bảng village in Bắc Ninh, not Hanoi itself. A folk legend says that while King Lý Anh Tông was away at war, his wife cooked this cake and sent it to him; he loved it and named it after the bond of husband and wife. Treat it as a legend, but a lovely one.',
      'Because of its name, the cake is tied together in pairs as a symbol of lasting marital love. In engagement customs it is given to the bride’s family as a blessing, and the square box suggests fullness and a complete happiness.',
      'Old accounts say that both bánh cốm and bánh xu xê from Hàng Than became famous across northern Vietnam. That is why they sit side by side in this box.'
    ],
    image: '/banh-xu-xe.webp'
  },
  {
    id: 'o-mai',
    number: '04',
    title: 'Ô mai',
    subtitle: 'Preserved fruit',
    intro: 'Four flavors at once.',
    paragraphs: [
      'Ô mai from Hanoi is known for balancing sour, salty, spicy and sweet in one bite. The classic method uses salt, sugar and ginger. The fruit varies: apricot, plum, tamarind, mulberry, citrus peel and more.',
      'Hàng Đường, in the Old Quarter, is known as Hanoi’s “ô mai street”. The first ô mai shop there opened more than a hundred years ago and passed through three generations. The earliest versions were stir-cooked plum and tamarind; the apricot kind most people know came later.',
      'One old Hàng Đường family recalls that around 1930 apricots from the Hương Pagoda area flooded the street for only about a month, so they were packed in salt jars and later refined with sugar and ginger. This account comes from one family’s memory, so we share it as a story rather than a proven origin.',
      'Ô mai has long been part of the tray offered to guests at Tet. Try it with plain green tea.'
    ],
    image: '/omai.png'
  },
  {
    id: 'non-la',
    number: '05',
    title: 'Nón lá',
    subtitle: 'The little hat',
    intro: 'A small symbol with a long memory.',
    paragraphs: [
      'The miniature hat in your box stands for one of Vietnam’s best-known symbols. Hanoi has its own hat village: Chuông village, in Thanh Oai, about 30 km from the city center, beside the Đáy River.',
      'A local saying goes “if you want a good hat, go to Chuông village”. The village craft is more than 300 years old, according to the Hanoi cultural authority, and the hats were once made for different people: three-tier hats for young women, tall conical hats for men.'
    ],
    tip: 'Use it: hang it on a tree, a bag or a shelf, a small reminder of the trip.',
    image: '/non-la.jpg'
  }
];

export const didYouKnow = [
  'Cốm is hand-pounded in mortars, which makes a rhythmic sound you can hear in Vòng village.',
  'Cốm is still wrapped in lotus leaves to keep it fragrant.',
  'Bánh cốm has been a staple of Hàng Than street, which now has more than 50 shops selling it.',
  'Xu xê comes in pairs on purpose.',
  'Ô mai was invented as a way to keep a one-month fruit season going all year.'
];

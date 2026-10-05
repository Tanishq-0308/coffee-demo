export const img = (id: string, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

export type Coffee = { name: string; desc: string; price: number; photo: string; tag?: string }

export const menu: Record<string, Coffee[]> = {
  Hot: [
    { name: 'Espresso', desc: 'A rich, syrupy double shot of our house blend.', price: 3, photo: '1610889556528-9a770e32642f' },
    { name: 'Americano', desc: 'Espresso lengthened with hot water. Clean and bold.', price: 3.5, photo: '1514432324607-a09d9b4aefdd' },
    { name: 'Cappuccino', desc: 'Equal parts espresso, steamed milk and airy foam.', price: 4.5, photo: '1485808191679-5f86510681a2', tag: 'Classic' },
    { name: 'Caffè Latte', desc: 'Silky steamed milk over a mellow espresso base.', price: 4.75, photo: '1572442388796-11668a67e53d', tag: 'Bestseller' },
    { name: 'Flat White', desc: 'Velvety microfoam poured over a ristretto double.', price: 4.5, photo: '1534778101976-62847782c213' },
    { name: 'Pour Over', desc: 'Single-origin, hand brewed slowly to order.', price: 5.5, photo: '1442512595331-e89e73853f31' },
  ],
  Iced: [
    { name: 'Iced Latte', desc: 'Chilled milk, ice and a double shot layered by hand.', price: 5, photo: '1461023058943-07fcbe16d735', tag: 'Summer pick' },
    { name: 'Cold Brew', desc: 'Steeped for 18 hours. Smooth, low acidity, high energy.', price: 4.75, photo: '1578314675249-a6910f80cc4e' },
    { name: 'Iced Mocha', desc: 'Dark chocolate, espresso and cold milk over ice.', price: 5.5, photo: '1517701604599-bb29b565090c' },
  ],
  Signature: [
    { name: 'Honey Oat Latte', desc: 'Oat milk, wildflower honey, a whisper of cinnamon.', price: 5.75, photo: '1541167760496-1628856ab772', tag: 'House favorite' },
    { name: 'Tasting Flight', desc: 'Four mini brews from four origins. Find your favorite.', price: 9, photo: '1498804103079-a6351b050096' },
    { name: 'Barista Board', desc: 'Espresso, macchiato and cortado side by side.', price: 8, photo: '1497935586351-b67a49e012bf' },
  ],
}

export const gallery = [
  '1495474472287-4d71bcdd2085',
  '1501339847302-ac426a4a7cbb',
  '1507133750040-4a8f57021571',
  '1509042239860-f550ce710b93',
  '1554118811-1e0d58224f24',
  '1511920170033-f8396924c348',
  '1517487881594-2787fef5ebf7',
  '1600093463592-8e36ae95ef56',
]

export const reviews = [
  { quote: 'The best flat white in the city, hands down. The staff remember my order and my dog’s name.', name: 'Priya S.', role: 'Regular since 2019' },
  { quote: 'Cozy, warm and the light is perfect for working. The honey oat latte is dangerously good.', name: 'Marcus L.', role: 'Freelance designer' },
  { quote: 'You can taste the care in every cup. Their single-origin pour over changed how I think about coffee.', name: 'Elena R.', role: 'Coffee enthusiast' },
]

export const origins = [
  { name: 'Ethiopia Yirgacheffe', notes: 'Jasmine · Bergamot · Peach', roast: 'Light' },
  { name: 'Colombia Huila', notes: 'Caramel · Red apple · Cocoa', roast: 'Medium' },
  { name: 'Sumatra Mandheling', notes: 'Cedar · Dark chocolate · Spice', roast: 'Dark' },
]

// Tour stop data — used by TourMap and /tour page.

export interface TourStop {
  id: number;
  name: string;
  coords: [number, number]; // [lat, lng]
  teaser: string;
}

export const tourStops: TourStop[] = [
  {
    id: 1,
    name: "The Forum",
    coords: [52.6278, 1.2983],
    teaser: "A striking glass hub where modern life meets medieval history. The perfect spot to get your bearings.",
  },
  {
    id: 2,
    name: "The Guildhall",
    coords: [52.6286, 1.2954],
    teaser: "England's largest provincial medieval Guildhall. Stand next to 600 years of law and order in the city's past.",
  },
  {
    id: 3,
    name: "The Norwich Lanes",
    coords: [52.6299, 1.2942],
    teaser: "A maze of independent shops and hidden alleys. Find the best local coffee and unique souvenirs.",
  },
  {
    id: 4,
    name: "Norwich Market",
    coords: [52.6283, 1.2949],
    teaser: "One of Britain's oldest and largest open-air markets. 900 years of trading in the same spot.",
  },
  {
    id: 5,
    name: "The Arcade",
    coords: [52.6279, 1.2957],
    teaser: "Elegant Victorian and Edwardian shopping. Escape the high street for something genuinely special.",
  },
  {
    id: 6,
    name: "London Street",
    coords: [52.6282, 1.2968],
    teaser: "The first pedestrianised street in the UK — and almost nobody knows it. Hidden history in plain sight.",
  },
  {
    id: 7,
    name: "Norwich Castle",
    coords: [52.6285, 1.2982],
    teaser: "A massive Norman palace overlooking the city. The best place to visualise Norwich's medieval power and scale.",
  },
  {
    id: 8,
    name: "Elm Hill",
    coords: [52.6303, 1.3003],
    teaser: "The city's most famous cobbled street, often used as a film set. Stunning medieval buildings and shops.",
  },
  {
    id: 9,
    name: "Tombland",
    coords: [52.6311, 1.2995],
    teaser: "The Anglo-Saxon heart of the city. Dark history, plague legends, and two gates into the Cathedral Close.",
  },
  {
    id: 10,
    name: "Fye Bridge",
    coords: [52.6316, 1.2998],
    teaser: "The city's oldest river crossing. Iconic postcard views and stories of medieval punishments.",
  },
  {
    id: 11,
    name: "Norwich Cathedral",
    coords: [52.6320, 1.3007],
    teaser: "Marvel at this 900-year-old icon, explore the grounds and take a selfie with Paddington Bear.",
  },
];

// Map centre and zoom
export const MAP_CENTRE: [number, number] = [52.6300, 1.2975];
export const MAP_ZOOM = 15;

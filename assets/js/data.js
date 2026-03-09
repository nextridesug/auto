/* ═══════════════════════════════════════════════════════════
   NEXT RIDES UGANDA — data.js  v5.2
   Single source of truth. Edit here, reflects everywhere.
═══════════════════════════════════════════════════════════ */
window.NR = {

  /* ── Business Info ──────────────────────────────────── */
  biz: {
    name:    'Next Rides Uganda',
    address: 'Naguru Road, Cadam Enterprises, Naguru, Kampala',
    phone1:  '0753 717 412',
    phone2:  '0771 572 016',
    email:   'info.nextridesug@gmail.com',
    hours1:  'Mon – Sat: 8:00 AM – 6:00 PM',
    hours2:  'Sunday: 10:00 AM – 4:00 PM',
    wa:      '256753717412',
    ig:      'https://www.instagram.com/next_rides_ug',
    tt:      'https://www.tiktok.com/@next_rides',
    fb:      'https://www.facebook.com/share/1GEqttukNw/',
    th:      'https://www.threads.net/@next_rides_ug',
    pin:     'https://www.pinterest.com/next_rides_ug',
  },

  /* ── Stats ──────────────────────────────────────────── */
  stats: [
    { v: '5',   s: 'K+',l: 'Happy Clients'    },
    { v: '8',   s: '+', l: 'Years Experience' },
    { v: '34',  s: '',  l: 'Premium Brands'   },
    { v: '5',   s: '★', l: 'Client Rating'    },
  ],

  /* ── Cars for Sale ──────────────────────────────────── */
  cars: [
    /* ══ GERMAN SUPERCARS ══ */
    {
      id:'c01', brand:'Mercedes-Benz', model:'GLE 63 S AMG', year:2022,
      price:115000, mileage:'7,200 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Obsidian Black',
      badge:'NEW ARRIVAL', featured:true,
      desc:'Twin-turbo V8, 612hp. AMG Performance 4MATIC+. Imported from Germany with full service history.',
      img:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    },
    {
      id:'c02', brand:'Porsche', model:'Cayenne Turbo', year:2021,
      price:89000, mileage:'18,000 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Jet Black Metallic',
      badge:'HOT DEAL', featured:true,
      desc:'Turbocharged V8, 550hp. Sport Chrono, panoramic roof, Bose surround. Full Porsche service history.',
      img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    },
    {
      id:'c03', brand:'BMW', model:'M5 Competition', year:2021,
      price:98000, mileage:'14,500 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Marina Bay Blue',
      badge:'FEATURED', featured:true,
      desc:'625hp twin-turbo V8. M xDrive, Launch Control, carbon fibre trim.',
      img:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    },
    {
      id:'c04', brand:'Lamborghini', model:'Urus', year:2020,
      price:195000, mileage:'9,200 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Giallo Auge',
      badge:'RARE FIND', featured:true,
      desc:'641hp V8 biturbo. World\'s first Super Sport Utility Vehicle. Full Alcantara, carbon ceramic brakes.',
      img:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    },
    {
      id:'c05', brand:'Audi', model:'RS7 Sportback', year:2022,
      price:88000, mileage:'11,000 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Nardo Grey',
      badge:'HOT DEAL', featured:false,
      desc:'621hp twin-turbo V8, quattro AWD. B&O 3D sound, carbon optic pack, adaptive air suspension.',
      img:'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    },
    {
      id:'c06', brand:'Porsche', model:'911 Carrera S', year:2020,
      price:125000, mileage:'16,000 km', fuel:'Petrol', trans:'PDK',
      condition:'Foreign Used', color:'GT Silver Metallic',
      badge:'RARE FIND', featured:false,
      desc:'450hp flat-six, rear-wheel drive purity. Sport exhaust, PASM, Sport Chrono.',
      img:'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    },
    {
      id:'c07', brand:'Mercedes-Benz', model:'C300 AMG Line', year:2022,
      price:38000, mileage:'18,500 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Diamond White',
      badge:'NEW ARRIVAL', featured:false,
      desc:'MBUX, AMG Line interior/exterior, 9G-TRONIC, panoramic sunroof, ambient lighting.',
      img:'https://images.unsplash.com/photo-1617531653332-bd46c16f7d22?w=800&q=80',
    },
    /* ══ UGANDAN ROAD KINGS ══ */
    {
      id:'c08', brand:'Toyota', model:'Land Cruiser V8 200', year:2019,
      price:58000, mileage:'42,000 km', fuel:'Diesel', trans:'Automatic',
      condition:'Foreign Used', color:'Pearl White',
      badge:'HOT DEAL', featured:true,
      desc:'4.5L twin-turbo diesel V8. Full-time 4WD, Kinetic Dynamic Suspension. Uganda\'s undisputed road king.',
      img:'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80',
    },
    {
      id:'c09', brand:'Toyota', model:'Prado TX-L 2.8D', year:2020,
      price:34000, mileage:'38,000 km', fuel:'Diesel', trans:'Automatic',
      condition:'Foreign Used', color:'Graphite Grey',
      badge:'NEW ARRIVAL', featured:true,
      desc:'2.8L diesel, 7-seater, leather, sunroof, parking sensors. Built for Uganda\'s roads.',
      img:'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
    },
    {
      id:'c10', brand:'Lexus', model:'LX 570', year:2018,
      price:55000, mileage:'56,000 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Starfire Pearl',
      badge:'RARE FIND', featured:false,
      desc:'5.7L V8, 367hp. Kinetic Dynamic Suspension, Mark Levinson audio, full luxury off-road capability.',
      img:'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    },
    {
      id:'c11', brand:'BMW', model:'X5 xDrive40i', year:2021,
      price:62000, mileage:'24,000 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Phytonic Blue',
      badge:'FEATURED', featured:false,
      desc:'340hp inline-6, xDrive AWD. Panoramic roof, Harman Kardon, massage seats. The ultimate daily luxury SUV.',
      img:'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&q=80',
    },
    {
      id:'c12', brand:'Toyota', model:'Harrier Premium', year:2021,
      price:24000, mileage:'29,000 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Emotional Red',
      badge:'NEW ARRIVAL', featured:false,
      desc:'2.0L turbo, panoramic sunroof, JBL sound, 360° camera, ambient lighting. Elegant crossover.',
      img:'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=80',
    },
    {
      id:'c13', brand:'Range Rover', model:'Sport HSE', year:2021,
      price:72000, mileage:'22,000 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Santorini Black',
      badge:'', featured:false,
      desc:'Adaptive air suspension, Meridian surround sound, panoramic sunroof. Uganda\'s favourite prestige SUV.',
      img:'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800&q=80',
    },
    {
      id:'c14', brand:'Range Rover', model:'Velar R-Dynamic', year:2020,
      price:52000, mileage:'31,000 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Byron Blue',
      badge:'HOT DEAL', featured:false,
      desc:'Sleek fastback silhouette. Touch Pro Duo dual screens, air suspension, adaptive dynamics. Turn heads daily.',
      img:'https://images.unsplash.com/photo-1554744512-d6c603f27c54?w=800&q=80',
    },
    {
      id:'c15', brand:'Mitsubishi', model:'Pajero DID V6', year:2017,
      price:22000, mileage:'68,000 km', fuel:'Diesel', trans:'Automatic',
      condition:'Foreign Used', color:'Deep Bronze',
      badge:'', featured:false,
      desc:'3.2L DID diesel, Super Select 4WD. 7-seater with sunroof and leather. Proven Ugandan terrain master.',
      img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
    {
      id:'c16', brand:'Mercedes-Benz', model:'GLE 350 AMG', year:2021,
      price:68000, mileage:'19,000 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Selenite Grey',
      badge:'NEW ARRIVAL', featured:false,
      desc:'4MATIC AWD, air suspension, Burmester audio, panoramic sunroof, AMG kit. Most photographed SUV in Kampala.',
      img:'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80',
    },
    {
      id:'c17', brand:'Volkswagen', model:'Touareg R-Line', year:2020,
      price:41000, mileage:'33,000 km', fuel:'Diesel', trans:'Automatic',
      condition:'Foreign Used', color:'Deep Black',
      badge:'FEATURED', featured:false,
      desc:'3.0L TDI V6. IQ.Light matrix LEDs, 15" Innovision Cockpit, air suspension, R-Line exterior.',
      img:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    },
    {
      id:'c18', brand:'Toyota', model:'Crown 2.5 RS Hybrid', year:2022,
      price:32000, mileage:'21,000 km', fuel:'Hybrid', trans:'Automatic',
      condition:'Foreign Used', color:'Sonic Chrome',
      badge:'NEW ARRIVAL', featured:false,
      desc:'2.5L hybrid, low consumption, 12.3" touchscreen, JBL 12-speaker. The ultimate executive hybrid sedan.',
      img:'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&q=80',
    },
    {
      id:'c19', brand:'Subaru', model:'Outback 2.5i Premium', year:2020,
      price:18500, mileage:'44,000 km', fuel:'Petrol', trans:'CVT',
      condition:'Foreign Used', color:'Ice Silver',
      badge:'', featured:false,
      desc:'Symmetrical AWD, EyeSight driver assist, heated seats, power liftgate. Uganda road certified.',
      img:'https://images.unsplash.com/photo-1552519507-da3b142c4e3d?w=800&q=80',
    },
    {
      id:'c20', brand:'Jeep', model:'Grand Cherokee Summit', year:2021,
      price:46000, mileage:'27,000 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Granite Crystal',
      badge:'HOT DEAL', featured:false,
      desc:'3.6L V6, Quadra-Lift air suspension, McIntosh audio, panoramic sunroof, Nappa leather. American luxury.',
      img:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    },
    {
      id:'c21', brand:'Nissan', model:'GT-R R35 Premium', year:2019,
      price:82000, mileage:'12,000 km', fuel:'Petrol', trans:'DCT',
      condition:'Foreign Used', color:'Ultimate Silver',
      badge:'RARE FIND', featured:false,
      desc:'"Godzilla." 565hp twin-turbo V6, 0–100 in 2.7s. Bilstein DampTronic. One of very few in Uganda.',
      img:'https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?w=800&q=80',
    },
    {
      id:'c22', brand:'Lexus', model:'RX 350 F-Sport', year:2021,
      price:44000, mileage:'18,000 km', fuel:'Petrol', trans:'Automatic',
      condition:'Foreign Used', color:'Sonic Titanium',
      badge:'FEATURED', featured:false,
      desc:'3.5L V6, F-Sport suspension, 14" touchscreen, Mark Levinson audio, triple-beam LEDs.',
      img:'https://images.unsplash.com/photo-1502161254119-e1442c4b9892?w=800&q=80',
    },
  ],

  /* ── Rental Fleet ───────────────────────────────────── */
  rentals: [
    {
      id:'r01', brand:'Mercedes-Benz', model:'S-Class S500', year:2022,
      priceDay:280, priceWeek:1600, seats:4,
      features:['Chauffeur Available','Airport Transfer','Massage Seats','Burmester Audio'],
      badge:'MOST POPULAR',
      img:'https://images.unsplash.com/photo-1609520505218-7421df82fe2a?w=800&q=80',
    },
    {
      id:'r02', brand:'BMW', model:'X7 M60i', year:2023,
      priceDay:240, priceWeek:1400, seats:7,
      features:['7 Seats','Panoramic Roof','Harman Kardon','Night Vision'],
      badge:'BEST FOR GROUPS',
      img:'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&q=80',
    },
    {
      id:'r03', brand:'Range Rover', model:'Autobiography LWB', year:2022,
      priceDay:320, priceWeek:1900, seats:5,
      features:['Executive Rear','Rear Entertainment','Meridian 3D','Extended Wheelbase'],
      badge:'EXECUTIVE',
      img:'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&q=80',
    },
    {
      id:'r04', brand:'Lamborghini', model:'Urus S', year:2023,
      priceDay:650, priceWeek:3800, seats:5,
      features:['666hp V8','Sport Mode','Carbon Pack','Track Exhaust'],
      badge:'ULTIMATE THRILL',
      img:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    },
    {
      id:'r05', brand:'Porsche', model:'Cayenne GTS', year:2022,
      priceDay:380, priceWeek:2200, seats:5,
      features:['GTS Package','Sport Exhaust','Alcantara Interior','Sport Chrono'],
      badge:'',
      img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    },
    {
      id:'r06', brand:'Mercedes-Benz', model:'G 63 AMG', year:2021,
      priceDay:520, priceWeek:3000, seats:5,
      features:['577hp V8','G-Mode Offroad','Burmester Audio','AMG Performance'],
      badge:'ICON',
      img:'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&q=80',
    },
    {
      id:'r07', brand:'Toyota', model:'Land Cruiser V8', year:2022,
      priceDay:180, priceWeek:1050, seats:7,
      features:['7 Seats','4WD','Upcountry Ready','Fridges Available'],
      badge:'SAFARI CHOICE',
      img:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    },
    {
      id:'r08', brand:'Lexus', model:'LX 570', year:2021,
      priceDay:220, priceWeek:1280, seats:7,
      features:['7 Seats','Mark Levinson Audio','Full Leather','4WD'],
      badge:'LUXURY SAFARI',
      img:'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    },
    {
      id:'r09', brand:'Subaru', model:'Outback 2.5i', year:2021,
      priceDay:110, priceWeek:640, seats:5,
      features:['Symmetrical AWD','EyeSight Assist','Heated Seats','Versatile Boot'],
      badge:'GREAT VALUE',
      img:'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    },
    {
      id:'r10', brand:'Volkswagen', model:'Touareg R-Line', year:2020,
      priceDay:175, priceWeek:1000, seats:5,
      features:['Air Suspension','15" Cockpit Display','Matrix LED','Panoramic Roof'],
      badge:'',
      img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    },
  ],

  /* ── Brands ─────────────────────────────────────────── */
  brands: [
    { name:'Toyota',        tag:'Japanese Reliability',   origin:'Japan',   logo:'https://cdn.simpleicons.org/toyota/ffffff'        },
    { name:'Honda',         tag:'Japanese Engineering',   origin:'Japan',   logo:'https://cdn.simpleicons.org/honda/ffffff'         },
    { name:'Nissan',        tag:'Japanese Innovation',    origin:'Japan',   logo:'https://cdn.simpleicons.org/nissan/ffffff'        },
    { name:'Mazda',         tag:'Japanese Craftsmanship', origin:'Japan',   logo:'https://cdn.simpleicons.org/mazda/ffffff'         },
    { name:'Subaru',        tag:'Japanese AWD Legend',    origin:'Japan',   logo:'https://cdn.simpleicons.org/subaru/ffffff'        },
    { name:'Lexus',         tag:'Japanese Luxury',        origin:'Japan',   logo:'https://cdn.simpleicons.org/lexus/ffffff'         },
    { name:'Hyundai',       tag:'Korean Excellence',      origin:'Korea',   logo:'https://cdn.simpleicons.org/hyundai/ffffff'       },
    { name:'Kia',           tag:'Korean Innovation',      origin:'Korea',   logo:'https://cdn.simpleicons.org/kia/ffffff'           },
    { name:'Ford',          tag:'American Heritage',      origin:'USA',     logo:'https://cdn.simpleicons.org/ford/ffffff'          },
    { name:'Chevrolet',     tag:'American Muscle',        origin:'USA',     logo:'https://cdn.simpleicons.org/chevrolet/ffffff'     },
    { name:'Jeep',          tag:'American Offroad Icon',  origin:'USA',     logo:'https://cdn.simpleicons.org/jeep/ffffff'          },
    { name:'Tesla',         tag:'American EV Pioneer',    origin:'USA',     logo:'https://cdn.simpleicons.org/tesla/ffffff'         },
    { name:'Cadillac',      tag:'American Luxury',        origin:'USA',     logo:'https://cdn.simpleicons.org/cadillac/ffffff'      },
    { name:'Mercedes-Benz', tag:'German Excellence',      origin:'Germany', logo:'https://cdn.simpleicons.org/mercedes/ffffff'      },
    { name:'BMW',           tag:'Bavarian Performance',   origin:'Germany', logo:'https://cdn.simpleicons.org/bmw/ffffff'           },
    { name:'Audi',          tag:'Ingolstadt Engineering', origin:'Germany', logo:'https://cdn.simpleicons.org/audi/ffffff'          },
    { name:'Porsche',       tag:'Stuttgart Precision',    origin:'Germany', logo:'https://cdn.simpleicons.org/porsche/ffffff'       },
    { name:'Volkswagen',    tag:'German Reliability',     origin:'Germany', logo:'https://cdn.simpleicons.org/volkswagen/ffffff'    },
    { name:'Peugeot',       tag:'French Sophistication',  origin:'France',  logo:'https://cdn.simpleicons.org/peugeot/ffffff'       },
    { name:'Renault',       tag:'French Innovation',      origin:'France',  logo:'https://cdn.simpleicons.org/renault/ffffff'       },
    { name:'Bugatti',       tag:'Alsatian Hypercar',      origin:'France',  logo:'https://cdn.simpleicons.org/bugatti/ffffff'       },
    { name:'Volvo',         tag:'Swedish Safety & Style', origin:'Sweden',  logo:'https://cdn.simpleicons.org/volvo/ffffff'         },
    { name:'Koenigsegg',    tag:'Swedish Megacar',        origin:'Sweden',  logo:null },
    { name:'Range Rover',   tag:'British 4×4 Royalty',   origin:'UK',      logo:'https://cdn.simpleicons.org/landrover/ffffff'     },
    { name:'Rolls-Royce',   tag:'Ultra Luxury',           origin:'UK',      logo:'https://cdn.simpleicons.org/rollsroyce/ffffff'    },
    { name:'Bentley',       tag:'British Prestige',       origin:'UK',      logo:'https://cdn.simpleicons.org/bentley/ffffff'       },
    { name:'Jaguar',        tag:'British Elegance',       origin:'UK',      logo:'https://cdn.simpleicons.org/jaguar/ffffff'        },
    { name:'Aston Martin',  tag:'British Sports Car',     origin:'UK',      logo:'https://cdn.simpleicons.org/astonmartin/ffffff'   },
    { name:'McLaren',       tag:'Woking Hypercar',        origin:'UK',      logo:'https://cdn.simpleicons.org/mclaren/ffffff'       },
    { name:'Lamborghini',   tag:'Italian Supercar',       origin:'Italy',   logo:'https://cdn.simpleicons.org/lamborghini/ffffff'   },
    { name:'Ferrari',       tag:'Maranello Legend',       origin:'Italy',   logo:'https://cdn.simpleicons.org/ferrari/ffffff'       },
    { name:'Maserati',      tag:'Italian Grand Tourer',   origin:'Italy',   logo:'https://cdn.simpleicons.org/maserati/ffffff'      },
    { name:'Alfa Romeo',    tag:'Italian Character',      origin:'Italy',   logo:'https://cdn.simpleicons.org/alfaromeo/ffffff'     },
    { name:'Pagani',        tag:'Italian Artistry',       origin:'Italy',   logo:null },
    { name:'Mitsubishi',    tag:'Japanese Durability',    origin:'Japan',   logo:'https://cdn.simpleicons.org/mitsubishi/ffffff'    },
  ],

  /* ── Real Instagram Posts from @next_rides_ug ───────── */
  igPosts: [
    { url:'https://www.instagram.com/reel/DMZzX1ooExN/', label:'Ready to Ride Into Your Dreams' },
    { url:'https://www.instagram.com/next_rides_ug/reel/C-DqLljIz_R/', label:'GLE Bouncing Mode' },
    { url:'https://www.instagram.com/next_rides_ug/reel/DBMxxDgIwl9/', label:'2021 Mercedes GLE Coupe' },
  ],

  /* ── TikTok Videos from @next_rides ─────────────────── */
  ttVideos: [
    { id:'7521486003387911430', url:'https://www.tiktok.com/@next_rides/video/7521486003387911430' },
  ],

  /* ── Pinterest Videos ───────────────────────────────── */
  pins: [
    { url:'https://pin.it/6w1VRRkt0',  label:'Car in Motion' },
    { url:'https://pin.it/68VdyseVn',  label:'Grow Daily'    },
    { url:'https://pin.it/5TcuLvVEG',  label:'Auto Illustration' },
    { url:'https://pin.it/70WA76xao',  label:'SUV Range'     },
    { url:'https://pin.it/68kxcYpHr',  label:'Porsche Style' },
    { url:'https://pin.it/4cTRjzkPk',  label:'VW Pricing'    },
  ],

  /* ── News Articles ──────────────────────────────────── */
  news: [
    /* ── NEW ARRIVALS ── */
    {
      id:'n01', cat:'NEW ARRIVAL', date:'March 2026',
      title:'Fresh Stock: Toyota Land Cruiser V8 & Prado TX-L Now In',
      summary:'Two new units just cleared URA — a pristine 2020 LC200 4.5D and a 2021 Prado TX-L 2.8D. Both Japan-sourced, low mileage, full service records. Walk-in test drives available at our Naguru showroom.',
      img:'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=85',
    },
    {
      id:'n02', cat:'NEW ARRIVAL', date:'February 2026',
      title:'Nissan GT-R R35 "Godzilla" — Uganda\'s Most Wanted Sports Car Is Back',
      summary:'Following massive demand after Rajiv Ruparelia\'s legendary GT-R made national headlines in 2025, we\'ve sourced another pristine R35. 565hp, 0–100 in 2.7 seconds, twin-turbo V6 Godzilla. One available. Enquire now.',
      img:'https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?w=800&q=85',
    },
    {
      id:'n03', cat:'NEW ARRIVAL', date:'January 2026',
      title:'Mercedes-Benz G 63 AMG: Uganda\'s Most Iconic Street Machine',
      summary:'The G-Wagon needs no introduction in Kampala. We have a 2021 G63 AMG in obsidian black — 577hp, Burmester audio, full AMG package. The car every Ugandan car lover dreams about.',
      img:'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&q=85',
    },

    /* ── MARKET NEWS ── */
    {
      id:'n04', cat:'MARKET NEWS', date:'February 2026',
      title:'Uganda Luxury Car Market Surges — Premium SUVs Lead 2025 Sales',
      summary:'Demand for premium imported vehicles hit a record in Uganda throughout 2025. Land Cruisers, GLE AMGs, and Range Rovers were the most sought-after. NCBA asset financing drove 40% of dealership sales.',
      img:'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=85',
    },
    {
      id:'n05', cat:'MARKET NEWS', date:'January 2026',
      title:'King AD: Uganda\'s Most Talked-About Car Collection in 2025',
      summary:'"King AD has the best car collection in Uganda" — viral X post, August 2025. The Ugandan celebrity and car enthusiast was spotted with a Nissan GT-R "Godzilla" on Kampala streets, sparking a national conversation about Uganda\'s supercar scene.',
      img:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=85',
    },
    {
      id:'n06', cat:'MARKET NEWS', date:'December 2025',
      title:'Rajiv Ruparelia\'s GT-R Crash Puts Supercar Road Safety in Spotlight',
      summary:'The May 2025 fatal crash of Ruparelia Group MD Rajiv Ruparelia in his Nissan GT-R on the Busabala Flyover reignited national debate about road infrastructure and high-performance vehicles in Uganda. The GT-R — known globally as "Godzilla" — was capable of 310km/h. Roads must match the machines.',
      img:'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=85',
    },
    {
      id:'n07', cat:'MARKET NEWS', date:'October 2025',
      title:'Kabaka Mutebi\'s Shs 750M Lexus LX J30L — Uganda\'s Biggest Car Moment of 2025',
      summary:'Buganda Kingdom presented Kabaka Ronald Muwenda Mutebi II with a brand new 2024 Lexus LX J30L as his 70th birthday gift — complete with massage seats, fridges, ottomans, and recliner seats. Cost: approximately $200,000 (Shs 750M). Boda boda riders clapped and cheered as he drove through Bwaise.',
      img:'https://images.unsplash.com/photo-1552519507-da3b142c4e3d?w=800&q=85',
    },

    /* ── EVENTS ── */
    {
      id:'n08', cat:'EVENTS', date:'July 2025',
      title:'Next Rides at NCBA Auto Show Kampala 2025 — Recap',
      summary:'The 4th edition of the NCBA Auto Show Kampala (July 12–13, Kololo Independence Grounds) was Uganda\'s biggest ever — 50+ exhibitors, thousands of visitors, drifting, gymkhana, and live demos. Next Rides exhibited our full premium fleet. NCBA Bank provided Shs 100M sponsorship and on-the-spot asset financing.',
      img:'https://images.unsplash.com/photo-1609520505218-7421df82fe2a?w=800&q=85',
    },
    {
      id:'n09', cat:'EVENTS', date:'August 2025',
      title:'Supercar Festival @ IUEA 2025: Lamborghinis, Ferraris & More on Show',
      summary:'The annual Supercar Festival at IUEA Grounds drew massive crowds with Lamborghinis, Ferraris, and Porsches on full display. Next Rides had a dedicated exhibition stand — our Lamborghini Urus and Porsche 911 were among the most photographed cars at the show.',
      img:'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=85',
    },

    /* ── TIPS & GUIDES ── */
    {
      id:'n10', cat:'TIPS & GUIDES', date:'February 2026',
      title:'Complete Guide: URA Vehicle Import Duties Uganda 2025/2026',
      summary:'Uganda\'s import structure: 25% import duty on CIF value, 18% VAT, 20–50% environmental levy based on vehicle age, plus registration fees (UGX 200K–500K) and JEVIC inspection. Vehicles older than 15 years are prohibited. Euro 4 emissions compliance is now required. Next Rides handles all of this for you.',
      img:'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=800&q=85',
    },
    {
      id:'n11', cat:'TIPS & GUIDES', date:'January 2026',
      title:'Japan vs UAE vs UK: Where to Source Your Imported Car in 2026',
      summary:'Japan offers the best quality control and documentation — ideal for Toyotas and Lexus. UAE is the go-to for German spec (GLE, BMW, Porsche). UK provides right-hand drive European luxury. Next Rides sources from all three markets and handles shipping, JEVIC certification, and URA clearance.',
      img:'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=85',
    },
    {
      id:'n12', cat:'TIPS & GUIDES', date:'December 2025',
      title:'New JEVIC Rules: PVoC Certificate Now Required for All Car Imports',
      summary:'As of April 2025, the Uganda National Bureau of Standards requires Pre-Export Verification of Conformity (PVoC) certificates on all imported vehicles. Three approved inspection companies operate in Japan. Non-compliant imports face delays and fines. Next Rides manages full compliance for every vehicle we import.',
      img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
    },

    /* ── RENTAL ── */
    {
      id:'n13', cat:'RENTAL', date:'January 2026',
      title:'Wedding & Events Fleet: Book the G63, S-Class or Lamborghini Urus',
      summary:'Our premium rental fleet is fully booked on most weekends. Reserve your wedding car early — the Mercedes-Benz G63 AMG, S500, and Lamborghini Urus S are the top picks for Kampala\'s biggest days. Call 0753 717 412.',
      img:'https://images.unsplash.com/photo-1605559424843-9073730702c3?w=800&q=85',
    },
    {
      id:'n14', cat:'RENTAL', date:'December 2025',
      title:'Safari & Upcountry Hire: Land Cruiser V8 & Lexus LX570 Ready',
      summary:'Planning a trip to Murchison Falls, Queen Elizabeth, or Bwindi? Our Land Cruiser V8 and Lexus LX570 are upcountry-ready with optional roof racks, fridges, and bush-spec tyres. 7 seats. Daily and weekly rates available.',
      img:'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=85',
    },
  ],

  /* ── Events ─────────────────────────────────────────── */
  events: [
    {
      id:'e01', status:'UPCOMING',
      name:'Next Rides Open Day — Monthly Showroom Event',
      date:'Every Last Saturday of the Month', location:'Naguru Road, Cadam Enterprises, Naguru',
      desc:'Come see our full premium showroom in person, meet founder Ismail Lubowa Kalyango and the team, and get exclusive same-day pricing on select vehicles. Live car demos, light refreshments, and Q&A. No appointment needed.',
      img:'https://images.unsplash.com/photo-1562519736-f0d95f7a5a44?w=800&q=85',
      link:'https://wa.me/256753717412',
    },
    {
      id:'e02', status:'UPCOMING',
      name:'Supercar Festival @ IUEA — 2026 Edition',
      date:'2026 — Date TBA', location:'IUEA Grounds, Kampala',
      desc:'The annual Supercar Festival returns to IUEA Kampala. Expect Lamborghinis, Ferraris, McLarens and Porsches on display alongside bikes, live music, and food. Next Rides will have exhibition cars and on-the-spot deals. Free entry, massive atmosphere.',
      img:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=85',
      link:'contact.html',
    },
    {
      id:'e03', status:'UPCOMING',
      name:'NCBA Auto Show Kampala 2026',
      date:'July 2026 — Date TBA', location:'Kololo Independence Grounds, Kampala',
      desc:'Uganda\'s largest automotive exhibition returns for its 5th edition. 50+ exhibitors, drifting & gymkhana stunt shows, test drives, asset financing on-site, and the best car culture in East Africa. Next Rides will exhibit our full premium fleet. Tickets expected at UGX 20,000.',
      img:'https://images.unsplash.com/photo-1609520505218-7421df82fe2a?w=800&q=85',
      link:'https://x.com/autoshowkampala',
    },
    /* ── PAST EVENTS ── */
    {
      id:'e04', status:'PAST',
      name:'NCBA Auto Show Kampala 2025 ✓',
      date:'July 12–13, 2025', location:'Kololo Independence Grounds, Kampala',
      desc:'The 4th edition was the biggest yet — 50+ companies, thousands of visitors, full stunt shows, drifting, gymkhana, and test drives. NCBA Bank contributed Shs 100M as platinum sponsor. Next Rides had the most-photographed stand of the show.',
      img:'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=85',
      link:'https://x.com/autoshowkampala',
    },
    {
      id:'e05', status:'PAST',
      name:'Supercar Festival @ IUEA 2025 ✓',
      date:'2025', location:'IUEA Grounds, Kampala',
      desc:'Next Rides exhibited the Lamborghini Urus and Porsche 911 Carrera at IUEA\'s annual Supercar Festival. The cars drew massive crowds and were among the most photographed vehicles at the event. On-the-spot enquiries converted to 3 confirmed sales.',
      img:'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=700&q=80',
      link:'#',
    },
    {
      id:'e06', status:'PAST',
      name:'NCBA Auto Show Kampala 2024 ✓',
      date:'July 13–14, 2024', location:'Kololo Independence Grounds, Kampala',
      desc:'Uganda\'s 3rd annual auto show drew 56,000+ views across social media coverage. NBS Sport served as official media partner. NCBA Bank provided a UGX 75M sponsorship cheque. Next Rides participated for the second consecutive year.',
      img:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=85',
      link:'#',
    },
  ],

  /* ── Testimonials ───────────────────────────────────── */
  testimonials: [
    { name:'Brian Kiwanuka',   loc:'Kololo, Kampala',   stars:5, text:'Bought my BMW X5 from Next Rides. The whole process was smooth, professional, and the car was exactly as described. Best dealership in Uganda — full stop.' },
    { name:'Amina Tumwesige',  loc:'Entebbe',           stars:5, text:'They helped me import my dream Porsche 911 from Germany. Handled all paperwork and URA duties and kept me updated throughout. Absolutely world class service.' },
    { name:'David Mugisha',    loc:'Naguru, Kampala',   stars:5, text:'Rented the G63 AMG for my wedding day. The car was immaculate, delivery was on time, and the team went above and beyond. Unforgettable.' },
    { name:'Sarah Nakato',     loc:'Bugolobi, Kampala', stars:5, text:'The Mercedes S-Class rental for our corporate event was absolutely flawless. Professional team, pristine vehicle, on time. Highly recommend.' },
    { name:'Robert Ssemwanga', loc:'Muyenga, Kampala',  stars:5, text:'Next Rides found me a Lamborghini Urus with exact specs — right colour, right trim. Import process took 8 weeks and was completely hassle-free.' },
    { name:'Patricia Ochen',   loc:'Ntinda, Kampala',   stars:5, text:'Every car I\'ve rented from Next Rides has been perfectly presented and mechanically flawless. They represent the pinnacle of automotive service in Uganda.' },
  ],

};

/* Neighborhood pin coordinates */
let pinCoords = {
  "Allston": [42.361467,  -71.129131],
  "Back Bay": [42.349809, -71.081955],
  "Bay Village": [42.348891, -71.069162],
  "Beacon Hill": [42.358536, -71.067123],
  "Brighton": [42.344574, -71.154160],
  "Charlestown": [42.376404, -71.058939],
  "Chinatown": [42.349680, -71.062172],
  "Dorchester": [42.298196, -71.059216],
  "Downtown": [42.358892, -71.057391],
  "East Boston": [42.373178, -71.021223],
  "Fenway": [42.342428, -71.097818],
  "Hyde Park": [42.254955, -71.123762],
  "Jamaica Plain": [42.312955, -71.113073],
  "Leather District": [42.351037, -71.057969],
  "Longwood": [42.343164, -71.109866],
  "Mattapan": [42.279452, -71.090034],
  "Mission Hill": [42.330838, -71.104064],
  "North End": [42.365072, -71.054029],
  "Roslindale": [42.285806, -71.125367],
  "Roxbury": [42.314846, -71.085598],
  "South Boston": [42.331939, -71.048553],
  "South End": [42.338364, -71.075239],
  "Waterfront": [42.356838, -71.050353],
  "West End": [42.364064, -71.066151],
  "West Roxbury": [42.281590, -71.161605]
};

let viewCoords = {
  "Allston": [42.3573433,-71.115378,12],
  "Back Bay": [42.3493055,-71.0905478,12],
  "Bay Village": [42.3498003,-71.0691917,12],
  "Beacon Hill": [42.3573336,-71.0702341,13.5],
  "Brighton": [42.3491099,-71.1427447,12],
  "Charlestown": [42.3720147,-71.0663173,12],
  "Chinatown": [42.3508449,-71.0628745,15.48],
  "Dorchester": [42.3067704,-71.0890839,12],
  "Downtown": [42.3572237,-71.0699231,14.58],
  "East Boston": [42.3648645,-71.0595724,13.62],
  "Fenway": [42.3424981,-71.0973112,13.3],
  "Hyde Park": [42.2663539,-71.1217779,13.1],
  "Jamaica Plain": [42.3293415,-71.0799575,12],
  "Leather District": [42.3510546,-71.0580252,16.31],
  "Longwood": [42.3425579,-71.110806,15.04],
  "Mattapan": [42.300259,-71.1107408,13.16],
  "Mission Hill": [42.3338358,-71.1080123,12],
  "North End": [42.3638109,-71.0573227,15.46],
  "Roslindale": [42.2979365,-71.1281171,13],
  "Roxbury": [42.3241464,-71.1017691,13.29],
  "South Boston": [42.3381886,-71.0547324,14],
  "South End": [42.3419025,-71.0751679,14.38],
  "Waterfront": [42.35731,-71.0554735,15.17],
  "West End": [42.3619161,-71.0655493,15.3],
  "West Roxbury": [42.2916903,-71.1631525,12]
};

/* HTML for info of neighborhoods to be displayed in popups */
let neighborhoodInfo = {
  "Allston": "Allston is a popular destination for students of nearby Northeastern University, Boston University or Harvard. In 2008, the term 'Allston Christmas' was added to Urban Dictionary. The phrase refers to a special date in the neighborhood, September 1, or 'moving day' when students leave their no longer needed furniture that couldn’t fit into their apartment or moving truck on the pavement for anyone to take. \
              Adjacent to Allston, many college students also find apartments in Brighton, but you’ll find a growing community of young professionals and young families here as well. Winding Commonwealth Avenue gets curvier and hillier as soon as you enter this neighborhood, which has a lively business scene along Washington Street. \
              This area is home to Boston College and Chestnut Hill Reservoir and is a perfect neighborhood if you are looking for accommodation with close proximity to a peaceful walk among nature.",
  "Back Bay": "Back Bay is one if not the wealthiest neighborhood in Boston. Here, you’ll find rows of Victorian style brick homes or apartment buildings. The life expectancy of its residence is up to 90.9. Living here, you are close to an upscale shopping neighborhood with the Prudential center and Newbury Street. If you are not too interested in shopping, head to the Charles river Esplanade for a walk along one side the water and the other side beautiful Victorian homes.",
  "Beacon Hill": "Beacon Hill is famous for its charming brick houses situated on top of the Hill. It is an expensive neighborhood with affluent residents and is safe compared to other neighborhoods of Boston. The Red Line, Orange Line and Green Line all cater to the neighborhood so you need not worry about transportation, what you should really worry about is the sky high rent and the walk uphill to your apartment. \
                  Beacon Hill is also home to the most Instagrammed street in Boston, Acorn street. It is basically the last cobblestone street in Boston. Residents of the neighborhood retained ownership and control over the private alley road to prevent it from being paved by the City of Boston in the 80s.",
  "Brighton": "Allston is a popular destination for students of nearby Northeastern University, Boston University or Harvard. In 2008, the term 'Allston Christmas' was added to Urban Dictionary. The phrase refers to a special date in the neighborhood, September 1, or 'moving day' when students leave their no longer needed furniture that couldn’t fit into their apartment or moving truck on the pavement for anyone to take. \
              Adjacent to Allston, many college students also find apartments in Brighton, but you’ll find a growing community of young professionals and young families here as well. Winding Commonwealth Avenue gets curvier and hillier as soon as you enter this neighborhood, which has a lively business scene along Washington Street. \
              This area is home to Boston College and Chestnut Hill Reservoir and is a perfect neighborhood if you are looking for accommodation with close proximity to a peaceful walk among nature.",
  "Charlestown": "Charlestown is a neighborhood rich with history. In the Revolutionary War, it was a major battleground as well as meeting place for historical figures. There is an abundant of landmarks and memorials scattered around the neighborhood, including Bunker Hill Monument, the USS Constitution and the Freedom Trail, a popular destination for tourists to Boston. \
                  There is a large population of Irish Americans here whose culture formed the neighborhood, hence why you can find plenty Irish pubs and restaurants here. \
                  In terms of beautiful red brick housing architectures and surroundings, Charlestown is comparable to Back Bay and Beacon Hill, yet according to reports we got from rentcafe, an internet listing service, rent price in Charlestown is relatively much cheaper than those two neighborhoods. \
                  However, there are less things to do in Charlestown in terms of entertainment. It is further away from downtown. Its relatively small number of shops and restaurants are concentrated along Main Street and in City Square. \
                  In terms of grocery, there is no student pocket friendly destination like Trader's Joe or Star Market, instead, Whole Foods is the only major grocery store here. \
                  That said, if you don't mind living in quite a picturesque area not far from downtown and will not cost you a fortune to stay, then Charlestown might be a good fit for you.",
  "Chinatown": "Chinatown is Boston’s icon for Chinese culture and commerce. As a student or newcomer who loves the hustle of the city, you will likely love living here. First of all, you will be within walking distance to an ample number of restaurants catering to different regions of China as well as popular boba tea shops such as Gong Cha, Royal Tea, Kungfu Tea and so on. Link to Mengjiao food video. \
                Chinatown is also the best spot to come to celebrate Lunar New Year, a festival in late January or early February depending on the lunar calendar, because the annual Chinese New Year Parade is held here. The parade includes spectacular dragon dance, cymbals, firecrackers, and food stalls. \
                Before considering Chinatown as the final destination to rent your apartment, there are a number of considerations useful to know. \
                As a very bustling center of Chinese culture, Chinatown is undergoing heavy gentrification as low-income residents are driven out by the staggering rent price caused mainly by housing development as well as short-term rental services. \
                Chinese-American households in Chinatown spend almost half their monthly income on rent each month while almost 80% of tenants surveyed here had no information about their tenant rights, according to a report co-produced by MIT’s Displacement Research Action Network and the Chinese Progressive Association.",
  "Dorchester": "Dorchester is the largest and most diverse neighborhood in Boston. It is home to Boston’s current Mayor, Marty Walsh. There is a big community of Vietnamese American here in the neighborhood so you will find no shortage of grocery stores, authentic Vietnamese restaurants and so on.",
  "Downtown": "This bustling epicenter is home to dozens of businesses in Boston, as well as being a longtime hub for the government since the 1700s. To name a few, it includes City Hall Plaza, a number of offices, and historical tourist attractions like the Freedom Trail. For reference, Downtown Crossing is a major intersection for both pedestrians and the T (underground transport).",
  "East Boston": "East Boston is where you will most likely encounter someone from a different country. About 80% Of the residents here are born abroad from Central America, South America and Southeast Asia. They have all come together and create a hustling area of East Boston. East Boston is adjacent to Boston’s Logan Airport and is served by the Blue Line, Ferries and part of the Silver Line. The area is an ideal place to see the city skyline.",
  "Fenway": "There’s always something to do in Fenway – Kenmore. A sport fan? Make a visit to Fenway Park – Boston’s baseball cathedral. After a game, the many surrounding bars and restaurants will fulfill your need for foods and drinks and fun. \
            You’re more like a museum person? Some of the best museums in New England are located here. Visit the Museum of Fine Arts, Elizabeth Gardner museum, Symphony Hall and so on. ",
  "Hyde Park": "Many Bostonians know Hyde Park as the lifelong home of the late Mayor Thomas M Menino. It’s often described as a more suburban environment, with the Neponset River running through the neighborhood’s center. It also houses a number of local shops and restaurants that you can find along the main streets.",
  "Jamaica Plain": "Jamaica Plain, or more commonly called 'JP', is a dynamic neighborhood filled with diversity, green spaces, and strong local businesses. The Emerald Necklace and Franklin Park surround the neighborhood and it’s also home to Jamaica Pond, which makes for a gorgeous stroll. It’s always refreshing to walk around JP and get a feel for the prominent sense of community. Come by for one of the many communal events here, including local outdoor music festivals and spring fairs.",
  "Leather District": "Chinatown is Boston’s icon for Chinese culture and commerce. As a student or newcomer who loves the hustle of the city, you will likely love living here. First of all, you will be within walking distance to an ample number of restaurants catering to different regions of China as well as popular boba tea shops such as Gong Cha, Royal Tea, Kungfu Tea and so on. Link to Mengjiao food video. \
                      Chinatown is also the best spot to come to celebrate Lunar New Year, a festival in late January or early February depending on the lunar calendar, because the annual Chinese New Year Parade is held here. The parade includes spectacular dragon dance, cymbals, firecrackers, and food stalls. \
                      Before considering Chinatown as the final destination to rent your apartment, there are a number of considerations useful to know. \
                      As a very bustling center of Chinese culture, Chinatown is undergoing heavy gentrification as low-income residents are driven out by the staggering rent price caused mainly by housing development as well as short-term rental services. \
                      Chinese-American households in Chinatown spend almost half their monthly income on rent each month while almost 80% of tenants surveyed here had no information about their tenant rights, according to a report co-produced by MIT’s Displacement Research Action Network and the Chinese Progressive Association.",
  "Longwood": "",
  "Mattapan": "In the early 1600s, Mattapan was home to Native Americans known as the Mattahunt Tribe. Today, it is home to a large African-American and Caribbean community and has become an incubator for green living projects.",
  "Mission Hill": "Mission Hill provides a convenient living for students and young families who work in the Longwood Medical Area. Mission Hill is the biggest destination for Northeastern students to look for apartments off campus. \
                  However, this also means locals are being driven out slowly due to rising rent and property price. Mission Hill is known for its view from the top of the hill and the Basilica of Our Lady of Perpetual Help, also known as ‘The Mission Church’. \
                  Located right next to the neighborhood is Olmsted Park in Brookline, a large area of green that is part of Boston's Emerald Necklace. The park will offer you a peaceful walk in the woods leading to beautiful hidden small lakes and water creeks that allows you to be temporarily away from the hustle and bustle of the busy city.",
  "North End": "Or Little Italy as some people might call it, this center for Italian-American culture is one of the most visited neighborhoods in Boston. \
                The area offers no shortage of Italian restaurants and bakery as well as tourist sites. \
                Harborwalk is a free public walkway along the waterfront with pretty cafes, seating areas, street performances and so on. \
                The New England Holocaust Memorial, located on Congress Street in Boston, is another fascinating destination to pay a visit. It is an outdoor, open to the public space consisting of six glass towers that represent the six major concentration camps from the Holocaust. \
                The Old North Church and Paul Revere House are other famous sites to visit. \
                Boston is famous for its seafood (lobster!) so you will most certainly find some of the best Italian style seafood restaurants here. Try Paulis’ lobster rolls or get a seafood platter at the Daily Catch, the waiting line might be long but the food will be worth it. North End is also home to some of the best pizzeria in Boston, the original Regina’s Pizza, one of the oldest pizza place in Boston, was established here.",
  "Roslindale": "The beloved Arnold Arboretum, a 265-acre park that is part of Boston’s Emerald Necklace, makes Roslindale a ‘garden suburb’ neighborhood. It’s always been a center of commerce and you can still see colonial homes that have been transformed into apartments. \
                Chances are that if you live in Roslindale, you love Roslindale. Possessing a combination of cultural diversity and pastoral beauty (the place was named for the literal hills and dales in the area) you won’t find in many other Boston neighborhoods, Roslindale was part of Roxbury until it was annexed to the city of Boston in 1873. Several decades ago, some spots in Roslindale Square fell into disrepair, exhibiting vacant storefronts and a lack of activity. But the neighborhood’s  downtown has since undergone a renaissance, with a reincarnation into Roslindale Village—though you’ll find plenty of locals don’t bother calling it that. Now, new businesses are popping up all the time in the Village—the highly-anticipated Distraction Brewing Co. is expected to open this year, while a classic mainstay like Romano’s Pizzeria and Taqueria is an ideal spot eat a slice or burrito on the couch in the back in front of the TV. \
                Perhaps the most unique aspect of Rozzie is that the area still manages to do what many other parts of Boston fail at: maintaining a true ‘neighborhood’ feel. Less trendy than Jamaica Plain but more lively than West Roxbury, Roslindale residents are a mixed bag of families with deep roots in the neighborhood, young professionals, older retirees, and hipsters (chances are you’ll spot a fedora or two). Naturally, real estate prices are increasing as Bostonians seek out affordable neighborhoods where it’s actually possible to buy a home and raise a family, and some fear that sense of community that gives Roslindale its spark may be fleeting due to rapid development. Some residents claim there’s a bit of distinction between living on the ‘good’ or ‘bad’ side of Washington Street, but the general consensus is a true love for a neighborhood that some Bostonians don’t even seem to know exists. Rozzie’s plentiful green spaces are truly beloved—particularly the south end of the pristinely maintained Arnold Arboretum, which dips into Roslindale from Jamaica Plain. \
                The negatives are slim to none. Residents say traffic can be quite bad, but the new dedicated bus lane between the Village to Forest Hills is greatly appreciated by locals who use the bus system. Oh, and the new Target isn’t so bad, either.",
  "Roxbury": "Roxbury is one of Boston's oldest and most ethnically diverse communities. Historically, the neighborhood has been the destination of settlement for the Irish, German, Jewish immigrants and immigrants. Today, the once predominantly white neighborhood has become predominantly African American and is also home to Hispanic, Caribbean and Asian communities. \
              The torn down of the elevated Orange Line in 1987 has eliminated easy access to the T for many Roxbury residents. Dudley Square in Roxbury is a major bus and silver line station, however, the MBTA buses are known to be less reliable than the its train system. \
              That’s thanks in part to the blow Roxbury suffered when the elevated Orange Line was torn down in 1987. It had a detrimental effect on the community, eliminating easy access to the T in the neighborhood’s poorest areas. If you live in Lower Roxbury or Fort Hill, access to public transportation is better, however those who live deeper into Roxbury are at the mercy of the MBTA bus system, which frequently runs late. \
              Roxbury is not known to be not safe area, high crime rate. Its residents live less long compared to residents of other neighborhoods. Gentrification is going on. However, what a lot of people don’t know about Roxbury is that it is a revitalized area, with a diverse neighborhood and history. Dudley Square is a major bus and silver line station, a crossroad of people and where there are lots of protests. Roxbury is also known for the Roxbury Community College and Mission Hill, a college town as it has become. \
              There was a time when Roxbury was actually a large farming community. Today, spots like Dudley Square are revitalizing the entire area. \
              But like all neighborhoods, things have changed in Roxbury, and not always for the better. Many residents feel as if the area is an afterthought for the rest of Boston. The city gives green lights to out-of-town developers to build mid- and high-rise condo buildings with price tags that are out of reach for longtime residents. Meanwhile, residents struggle to have simple requests fulfilled, like getting crosswalks painted, then watch white neighborhoods get changes enacted in mere weeks. Though it shares a border with Jamaica Plain and the South End, residents feel that Roxbury’s amenities pale in comparison, whether it’s food delivery or liquor licenses. And yes, there is crime in some areas. That’s thanks in part to the blow Roxbury suffered when the elevated Orange Line was torn down in 1987. It had a detrimental effect on the community, eliminating easy access to the T in the neighborhood’s poorest areas. If you live in Lower Roxbury or Fort Hill, access to public transportation is better, however those who live deeper into Roxbury are at the mercy of the MBTA bus system, which frequently runs late. \
              While there’s been significant spillover of college students from Mission Hill and the Fenway in recent years, Roxbury has become increasingly popular with young professionals and families who are attracted to the neighborhood’s diversity, exquisite array of architectural history, and price tags slightly less painful than in other areas of the city. Roxbury is filled with lush community gardens, bustling green spaces like Malcolm X Park, where summer basketball tournaments are veritable family reunions, and Highland Park, with its landmark Fort Hill Tower surrounded by weeping willow trees. While many fear that gentrification will eliminate the very charm and diversity that Roxbury is known for, newer residents say that, hands down, they’ve never lived anywhere friendlier. ",
  "South Boston": "Traditionally, South Boston was a working-class neighborhood. It houses multiple industries and businesses like Gillette, which still employs many locals today. The area is also transitioning to a trendy hotspot for restaurants, hotels, and bars, part of which is now referred to as the “Seaport District.” Residents enjoy the waterfront and the skyline views of downtown as well as the nearby beaches and parks. You’ll also find Dorchester Heights here, where George Washington’s army set up cannons to force the British out of Boston in 1776. \
                  South Boston is not the rough-and-tumble town that movies like The Departed have lead you to believe. Once dominated by a working-class Irish Catholic population, South Boston has seen an influx of young professionals and families over the years, and with it, new, high-priced housing stock. Plenty of the neighborhood’s turn-of-the-century Victorians have been divided into sparkling condos—with some fetching in the millions. \
                  Even so, Southie has managed to retain much of its character amidst a housing boom. Quaint rowhouses line the streets, and many of them are only a short walk from the waterfront. While new cafes and gourmet markets have nudged their way in, there are still time-honored local hangouts to be found. Plus, South Boston is home to one of the largest St. Patrick’s Day parades in the country; it’s been making its way down Broadway since 1901. \
                  If sea breezes, a rowdy annual parade, and abundant Irish pubs sound up your alley, then South Boston might be your next move. But whatever you do, don’t call it SoBo.",
  "South End": "The South End is known for being a center of the LGBTQ life, scattered around the area are plenty LGBTQ bars and restaurants, some even offer ‘drag brunch,’ inspired by the Emmy Award-winning show ‘RuPaul’s Drag Race.’ \
                The food and arts scene here is vibrant with many high-end exposed brick, white table cloth restaurants and trendy eateries that can satisfy many foodies. The architect of houses and streets here will remind you of neighboring Back Bay, which is also why rent in the area is on the surge. \
                Parts of the Orange Line (Ruggles, Mass Ave and Back Bay stops) run right on the edge of the neighborhood. So if you are someone who will be dependent on the T and you live in areas deeper into the neighborhood. You might have to walk quite a bit or rely on buses to reach the trains. ",
  "Waterfront": "",
  "West End": "The West End is an ethnically diverse and exciting neighborhood. It is close to Beacon Hill and home to Massachusetts General Hospital and TD Garden, where the Boston Bruins and the Boston Celtics play. \
              Living here, you will have an ease with public transportation because the Green, Orange and Red line all travel through the area. \
              The area is known for its abundant Irish pubs and sports bars but the food scene has recently diversified with additions of burger joints, Italian and Mexican cuisine. \
              With its convenient location, its rapid business development and a growing residential population, the West End is one of the up-and-coming neighborhoods in Boston.",
  "West Roxbury": "West Roxbury is an ideal place for families or single people who want more green space around their home. The neighborhood offers tree-lined streets; it's not too far from Boston and the housing price is not yet sky-high. \
                  In terms of recreational activities, there is no shortage of restaurants and bakery, casual or high-end. In addition, Brook Farm and Millennium Park provide large, open green space for walking, running, picnicking and more. Grocery stores available here fall into the more expensive side with Roche Bros., Marino’s Market and Deli and Star Market and it can be a tough to find a grocery store selling ethnic food close by. \
                  Unfortunately for students who don't have access to cars, West Roxbury is relatively hard to reach from downtown by public transportation, one commuter rail serving the area is the Needham line, and the only T stop that goes near here is Forest Hill on the Orange Line. \
                  However, neighborhood safety does make up for the travel as West Roxbury ranks among five Boston neighborhoods with lowest crime rates according to statistics from the Boston Police Department."
};

let neighborhoodRoutes = {
  "Allston": ["Boston College (B)"],
  "Back Bay": ["Boston College (B)", "Cleveland Circle (C)", "Riverside (D)", "Heath St. (E)", "Orange Line"],
  "Bay Village": ["Boston College (B)", "Cleveland Circle (C)", "Riverside (D)", "Heath St. (E)", "Orange Line"],
  "Beacon Hill": ["Boston College (B)", "Cleveland Circle (C)", "Riverside (D)", "Heath St. (E)", "Orange Line", "Blue Line", "Braintree", "Mattapan"],
  "Brighton": ["Boston College (B)"],
  "Charlestown": ["Orange Line"],
  "Chinatown": ["Boston College (B)", "Cleveland Circle (C)", "Riverside (D)", "Heath St. (E)", "Orange Line", "Braintree", "Mattapan", "Airport Terminals", "Boston Marine Industrial Park", "Washington St."],
  "Dorchester": ["Braintree", "Mattapan"],
  "Downtown": ["Boston College (B)", "Cleveland Circle (C)", "Riverside (D)", "Heath St. (E)", "Orange Line", "Blue Line", "Braintree", "Mattapan", "Airport Terminals", "Boston Marine Industrial Park"],
  "East Boston": ["Blue Line", "Airport Terminals"],
  "Fenway": ["Boston College (B)", "Cleveland Circle (C)", "Riverside (D)", "Heath St. (E)", "Orange Line"],
  "Hyde Park": [],
  "Jamaica Plain": ["Heath St. (E)", "Orange Line"],
  "Leather District": ["Orange Line", "Braintree", "Mattapan", "Airport Terminals", "Boston Marine Industrial Park", "Washington St."],
  "Longwood": ["Cleveland Circle (C)", "Riverside (D)"],
  "Mattapan": ["Mattapan"],
  "Mission Hill": ["Heath St. (E)", "Orange Line"],
  "North End": ["Boston College (B)", "Cleveland Circle (C)", "Riverside (D)", "Heath St. (E)", "Orange Line", "Blue Line"],
  "Roslindale": ["Orange Line"],
  "Roxbury": ["Orange Line"],
  "South Boston": ["Braintree", "Mattapan", "Airport Terminals", "Boston Marine Industrial Park"],
  "South End": ["Orange Line", "Washington St."],
  "Waterfront": ["Blue Line"],
  "West End": ["Boston College (B)", "Cleveland Circle (C)", "Riverside (D)", "Heath St. (E)", "Orange Line", "Braintree", "Mattapan"],
  "West Roxbury": ["Orange Line"]
}

let colorByRoute = {
  "Boston College (B)": "#1D7535",
  "Cleveland Circle (C)": "#1D7535",
  "Riverside (D)": "#1D7535",
  "Heath St. (E)": "#1D7535",
  "Orange Line": "#FFAA00",
  "Blue Line": "#092FED",
  "Braintree": "#E31010",
  "Mattapan": "#E31010",
  "Airport Terminals": "#969696",
  "Boston Marine Industrial Park": "#969696",
  "Washington St.": "#969696"
};

let logoByRoute = {
  "Boston College (B)": "photo/greenline.png",
  "Cleveland Circle (C)": "photo/greenline.png",
  "Riverside (D)": "photo/greenline.png",
  "Heath St. (E)": "photo/greenline.png",
  "Orange Line": "photo/orangeline.png",
  "Blue Line": "photo/mbta.png",
  "Braintree": "photo/redline.png",
  "Mattapan": "photo/redline.png",
  "Airport Terminals": "photo/mbta.png",
  "Boston Marine Industrial Park": "photo/mbta.png",
  "Washington St.": "photo/mbta.png"
}

/* Neighborhood ranks for each category */
let rankings = {
  "Allston":           { "Rent": 9, "Safety": 2, "Transportation": 10, "Schools": 3, "Population": 3, "Diversity": 5, "Food": 2 },
  "Back Bay":         { "Rent": 22, "Safety": 7, "Transportation": 6, "Schools": 9, "Population": 9, "Diversity": 16, "Food": 3 },
  "Bay Village":      { "Rent": 19, "Safety": 5, "Transportation": 6, "Schools": 10, "Population": 10, "Diversity": 16, "Food": 2 },
  "Beacon Hill":      { "Rent": 15, "Safety": 4, "Transportation": 3, "Schools": 7, "Population": 7, "Diversity": 22, "Food": 1 },
  "Brighton":          { "Rent": 8, "Safety": 2, "Transportation": 10, "Schools": 5, "Population": 5, "Diversity": 11, "Food": 1 },
  "Charlestown":      { "Rent": 11, "Safety": 4, "Transportation": 10, "Schools": 15, "Population": 15, "Diversity": 18, "Food": 4 },
  "Chinatown":        { "Rent": 20, "Safety": 8, "Transportation": 1, "Schools": 10, "Population": 10, "Diversity": 3, "Food": 2 },
  "Dorchester":        { "Rent": 6, "Safety": 3, "Transportation": 10, "Schools": 18, "Population": 18, "Diversity": 4, "Food": 4 },
  "Downtown":         { "Rent": 18, "Safety": 7, "Transportation": 2, "Schools": 10, "Population": 10, "Diversity": 3, "Food": 2 },
  "East Boston":       { "Rent": 7, "Safety": 1, "Transportation": 10, "Schools": 17, "Population": 17, "Diversity": 1, "Food": 5 },
  "Fenway":           { "Rent": 13, "Safety": 7, "Transportation": 6, "Schools": 2, "Population": 2, "Diversity": 9, "Food": 1 },
  "Hyde Park":         { "Rent": 1, "Safety": 8, "Transportation": 20, "Schools": 21, "Population": 21, "Diversity": 7, "Food": 8 },
  "Jamaica Plain":    { "Rent": 10, "Safety": 6, "Transportation": 8, "Schools": 13, "Population": 13, "Diversity": 13, "Food": 1 },
  "Leather District": { "Rent": 21, "Safety": 8, "Transportation": 4, "Schools": 10, "Population": 10, "Diversity": 3, "Food": 4 },
  "Longwood":         { "Rent": 12, "Safety": 10, "Transportation": 10, "Schools": 1, "Population": 1, "Diversity": 19, "Food": 1 },
  "Mattapan":          { "Rent": 2, "Safety": 12, "Transportation": 15, "Schools": 19, "Population": 19, "Diversity": 2, "Food": 8 },
  "Mission Hill":     { "Rent": 12, "Safety": 8, "Transportation": 8, "Schools": 6, "Population": 6, "Diversity": 6, "Food": 2 },
  "North End":        { "Rent": 18, "Safety": 6, "Transportation": 5, "Schools": 4, "Population": 4, "Diversity": 20, "Food": 4 },
  "Roslindale":        { "Rent": 5, "Safety": 4, "Transportation": 15, "Schools": 20, "Population": 20, "Diversity": 10, "Food": 8 },
  "Roxbury":           { "Rent": 4, "Safety": 10, "Transportation": 10, "Schools": 16, "Population": 16, "Diversity": 8, "Food": 7 },
  "South Boston":     { "Rent": 16, "Safety": 9, "Transportation": 7, "Schools": 11, "Population": 11, "Diversity": 21, "Food": 2 },
  "South End":        { "Rent": 14, "Safety": 7, "Transportation": 10, "Schools": 14, "Population": 14, "Diversity": 14, "Food": 3 },
  "Waterfront":       { "Rent": 16, "Safety": 3, "Transportation": 10, "Schools": 8, "Population": 8, "Diversity": 17, "Food": 6 },
  "West End":         { "Rent": 17, "Safety": 7, "Transportation": 4, "Schools": 12, "Population": 12, "Diversity": 12, "Food": 3 },
  "West Roxbury":      { "Rent": 3, "Safety": 5, "Transportation": 15, "Schools": 22, "Population": 22, "Diversity": 15, "Food": 9 }
}

/* Calculate the best fit neighborhood given three categories */
function calcTopNeighborhood(category1, category2, category3) {
  let list = [];

  for (neighborhood in rankings) {
    let score = rankings[neighborhood][category1] + rankings[neighborhood][category2] + rankings[neighborhood][category3];
    list.push({name: neighborhood, score: score});
  }

  list.sort((a,b) => a.score - b.score);

  return list[0].name;
}

// /* Get routes for public transportation passing through the given neighborhood */
// function getPolyLines(neighborhood) {
//   let routeNames = neighborhoodRoutes[neighborhood];
//   let lineCoords = [];
//
//   for (routeName of routeNames) {
//     let coords = [];
//
//     for (let i = 0; i < mbtaGeoJSON.length; ++i) {
//       if (mbtaGeoJSON[i]["properties"]["name"] === routeName) {
//         for (let j = 0; j < mbtaGeoJSON[i]["geometry"]["coordinates"].length; ++j) {
//           let point = mbtaGeoJSON[i]["geometry"]["coordinates"][j];
//           coords.push([point[1], point[0]]);
//         }
//         lineCoords.push(coords);
//         break;
//       }
//     }
//
//   }
//
//   return lineCoords;
// }

/* Get routes for public transportation passing through the given neighborhood */
function getPolyLines(neighborhood) {
  let routeNames = neighborhoodRoutes[neighborhood];
  let lineCoords = [];

  for (routeName of routeNames) {
    let coords = {};
    coords.routeName = routeName;
    coords.geometry = [];

    for (let i = 0; i < mbtaGeoJSON.length; ++i) {
      if (mbtaGeoJSON[i]["properties"]["name"] === routeName) {
        for (let j = 0; j < mbtaGeoJSON[i]["geometry"]["coordinates"].length; ++j) {
          let point = mbtaGeoJSON[i]["geometry"]["coordinates"][j];
          coords.geometry.push([point[1], point[0]]);
        }
        lineCoords.push(coords);
        break;
      }
    }

  }

  return lineCoords;
}

function getPolyLinesSwitched(neighborhood) {
  let routeNames = neighborhoodRoutes[neighborhood];
  let lineCoords = [];

  for (routeName of routeNames) {
    let coords = {};
    coords.routeName = routeName;
    coords.geometry = [];

    for (let i = 0; i < mbtaGeoJSON.length; ++i) {
      if (mbtaGeoJSON[i]["properties"]["name"] === routeName) {
        for (let j = 0; j < mbtaGeoJSON[i]["geometry"]["coordinates"].length; ++j) {
          let point = mbtaGeoJSON[i]["geometry"]["coordinates"][j];
          coords.geometry.push(point);
        }
        lineCoords.push(coords);
        break;
      }
    }

  }

  return lineCoords;
}
